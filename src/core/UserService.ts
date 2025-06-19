import UserRepository from "@infrastructure/repositories/UserRepository";
import serviceLogger from "@infrastructure/logger/serviceLogger";

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

    try {
      return await UserRepository.findByAccountId(accountId);
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
