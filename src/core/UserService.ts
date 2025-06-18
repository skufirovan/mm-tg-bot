import UserRepository from "@infrastructure/repositories/UserRepository";

export default class UserService {
  static async register(accountId: number, username: string) {
    const existingUser = await UserRepository.findByAccountId(accountId);

    if (existingUser) {
      if (existingUser.username !== username) {
        await UserRepository.updateField(accountId, "username", username);
        return { ...existingUser, username };
      }

      return existingUser;
    }

    return await UserRepository.create(accountId, username);
  }

  static async getByAccountId(accountId: number) {
    return await UserRepository.findByAccountId(accountId);
  }
}
