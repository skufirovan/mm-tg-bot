import UserService from "@core/UserService";
import UserDto from "@domain/dtos/UserDto";

export default class UserController {
  static async register(accountId: bigint, username: string | null) {
    try {
      const user = await UserService.register(accountId, username);
      return new UserDto(user);
    } catch (error) {
      throw error;
    }
  }

  static async getByAccountId(accountId: bigint) {
    try {
      const user = await UserService.getByAccountId(accountId);
      return user ? new UserDto(user) : null;
    } catch (error) {
      throw error;
    }
  }
}
