import UserService from "@core/UserService";
import UserDto from "@domain/dtos/UserDto";

export default class UserController {
  static async register(accountId: number, username: string) {
    const user = await UserService.register(accountId, username);
    return new UserDto(user);
  }

  static async getByAccountId(accountId: number) {
    const user = await UserService.getByAccountId(accountId);
    return user ? new UserDto(user) : null;
  }
}
