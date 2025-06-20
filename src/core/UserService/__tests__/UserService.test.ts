import { expect, it, describe, afterEach, jest } from "@jest/globals";
import UserService from "@core/UserService";
import UserRepository from "@infrastructure/repositories/UserRepository";
import serviceLogger from "@infrastructure/logger/serviceLogger";

jest.mock("@infrastructure/repositories/UserRepository");
jest.mock("@infrastructure/logger/serviceLogger", () => jest.fn());

const mockedRepo = jest.mocked(UserRepository);
const mockedLogger = jest.mocked(serviceLogger);

describe("UserService.register", () => {
  const user = {
    id: BigInt(1),
    accountId: BigInt(123),
    username: "testuser",
    hasPass: false,
    passExpiresAt: null,
    registeredAt: new Date(),
  };

  const userWithoutUsername = { ...user, username: null };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user if not found", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(null);
    mockedRepo.create.mockResolvedValue(user);

    const result = await UserService.register(user.accountId, user.username);

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(mockedRepo.create).toHaveBeenCalledWith(
      user.accountId,
      user.username
    );
    expect(result).toEqual(user);

    expect(mockedLogger).toHaveBeenCalledWith(
      "info",
      "UserService.register",
      "Новый пользователь зарегистрирован",
      {
        userId: user.accountId,
        username: user.username,
      }
    );
  });

  it("should return the already registered user", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(user);
    mockedRepo.create.mockResolvedValue(user);

    const result = await UserService.register(user.accountId, user.username);

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(mockedRepo.create).not.toHaveBeenCalled();
    expect(result).toEqual(user);
    expect(mockedLogger).toHaveBeenCalledWith(
      "info",
      "UserService.register",
      "Пользователь уже зарегистрирован",
      {
        userId: user.accountId,
        username: user.username,
      }
    );
  });

  it("should throw an error when UserRepository.create fails", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(null);
    mockedRepo.create.mockRejectedValue(new Error("DB failure"));

    await expect(
      UserService.register(user.accountId, user.username)
    ).rejects.toThrow("Ошибка при регистрации пользователя");
  });
});

describe("UserService.getByAccountId", () => {
  const user = {
    id: BigInt(1),
    accountId: BigInt(123),
    username: "testuser",
    hasPass: false,
    passExpiresAt: null,
    registeredAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find user", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(user);

    const result = await UserService.getByAccountId(user.accountId);

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(result).toEqual(user);
  });

  it("should not find user", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(null);

    const result = await UserService.getByAccountId(user.accountId);

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(result).toEqual(null);
  });

  it("should throw an error when UserRepository.getByAccountId fails", async () => {
    mockedRepo.findByAccountId.mockRejectedValue(new Error("DB failure"));

    await expect(UserService.getByAccountId(user.accountId)).rejects.toThrow(
      "Ошибка при получении пользователя"
    );
  });
});

describe("UserService.SyncUsername", () => {
  const user = {
    id: BigInt(1),
    accountId: BigInt(123),
    username: "testuser",
    hasPass: false,
    passExpiresAt: null,
    registeredAt: new Date(),
  };

  const userWithoutUsername = { ...user, username: null };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set username", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(userWithoutUsername);
    mockedRepo.updateField.mockResolvedValue(user);

    const result = await UserService.SyncUsername(
      user.accountId,
      user.username
    );

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(mockedRepo.updateField).toHaveBeenCalledWith(
      user.accountId,
      "username",
      user.username
    );
    expect(result).toEqual(user);
    expect(mockedLogger).toHaveBeenCalledWith(
      "info",
      "UserService.SyncUsername",
      `Установлен username: @${user.username}`,
      {
        userId: user.accountId,
        username: user.username,
      }
    );
  });

  it("should delete username", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(user);
    mockedRepo.updateField.mockResolvedValue(userWithoutUsername);

    const result = await UserService.SyncUsername(user.accountId, null);

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(mockedRepo.updateField).toHaveBeenCalledWith(
      user.accountId,
      "username",
      null
    );
    expect(result).toEqual(userWithoutUsername);
    expect(mockedLogger).toHaveBeenCalledWith(
      "info",
      "UserService.SyncUsername",
      `Удалён username: был @${user.username}`,
      {
        userId: user.accountId,
        username: null,
      }
    );
  });

  it("should update username", async () => {
    mockedRepo.findByAccountId.mockResolvedValue(user);
    mockedRepo.updateField.mockResolvedValue({
      ...user,
      username: "new-username",
    });

    const result = await UserService.SyncUsername(
      user.accountId,
      "new-username"
    );

    expect(mockedRepo.findByAccountId).toHaveBeenCalledWith(user.accountId);
    expect(mockedRepo.updateField).toHaveBeenCalledWith(
      user.accountId,
      "username",
      "new-username"
    );
    expect(result).toEqual({ ...user, username: "new-username" });
    expect(mockedLogger).toHaveBeenCalledWith(
      "info",
      "UserService.SyncUsername",
      `Сменил username: был @${user.username}, стал @new-username`,
      {
        userId: user.accountId,
        username: "new-username",
      }
    );
  });
});
