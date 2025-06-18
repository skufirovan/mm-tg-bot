import { User } from "@infrastructure/db/generated/client";

export default class UserDto {
  readonly username: string;
  readonly hasPass: boolean;
  readonly registeredAt: Date;

  constructor(user: User) {
    this.username = user.username;
    this.hasPass = user.hasPass;
    this.registeredAt = user.registeredAt;
  }
}
