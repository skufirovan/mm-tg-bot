import UserRepository from "@infrastructure/repositories/UserRepository";
import serviceLogger from "@infrastructure/logger/serviceLogger";

const cache = new Map<
  number,
  {
    user: Awaited<ReturnType<typeof UserRepository.findByAccountId>>;
    timestamp: number;
  }
>();
const TTL = 15 * 1000 * 60;

export default class UserService {
  static async register(accountId: number, username: string | null) {
    const meta = {
      userId: accountId,
      username: username ?? undefined,
    };

    try {
      const existingUser = await UserRepository.findByAccountId(accountId);

      if (existingUser) {
        if (existingUser.username !== username) {
          await UserRepository.updateField(accountId, "username", username);

          let message = "";
          const was = existingUser.username;
          const now = username;

          if (!was && now) {
            message = `Установлен username: @${now}`;
          } else if (was && !now) {
            message = `Удалён username: был @${was}`;
          } else {
            message = `Сменил username: был @${was}, стал @${now}`;
          }

          serviceLogger("info", "UserService.register", message, meta);

          return { ...existingUser, username };
        }

        serviceLogger(
          "info",
          "UserService.register",
          "Пользователь уже зарегистрирован",
          meta
        );

        return existingUser;
      }

      const newUser = await UserRepository.create(accountId, username);

      serviceLogger(
        "info",
        "UserService.register",
        "Новый пользователь зарегистрирован",
        meta
      );

      return newUser;
    } catch (error) {
      serviceLogger(
        "error",
        "UserService.register",
        `Ошибка регистрации: ${(error as Error).message}`,
        meta
      );
      throw new Error("Ошибка при регистрации пользователя");
    }
  }

  static async getByAccountId(accountId: number) {
    const meta = { userId: accountId };
    const now = Date.now();

    try {
      const cached = cache.get(accountId);

      if (cached && now - cached.timestamp < TTL) {
        serviceLogger(
          "info",
          "UserService.getByAccountId",
          "Пользователь получен из кэша",
          meta
        );
        return cached.user;
      }

      const user = await UserRepository.findByAccountId(accountId);

      if (user) {
        cache.set(accountId, { user, timestamp: now });
        serviceLogger(
          "info",
          "UserService.getByAccountId",
          "Пользователь получен из БД и закэширован",
          meta
        );
      }

      return user;
    } catch (error) {
      serviceLogger(
        "error",
        "UserService.getByAccountId",
        `Ошибка получения пользователя: ${(error as Error).message}`,
        meta
      );
      throw new Error("Ошибка при получении пользователя");
    }
  }
}
