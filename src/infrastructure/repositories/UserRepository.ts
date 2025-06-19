import { prisma } from "@infrastructure/db/client";
import { User } from "@domain/entities/User";

export default class UserRepository {
  static async findByAccountId(accountId: number) {
    return prisma.user.findUnique({ where: { accountId } });
  }

  static async create(accountId: number, username: string | null) {
    return prisma.user.create({
      data: {
        accountId,
        username,
      },
    });
  }

  static async updateField<
    T extends keyof Omit<User, "id" | "accountId" | "registeredAt">
  >(accountId: number, field: T, value: User[T]) {
    return prisma.user.update({
      where: { accountId },
      data: { [field]: value },
    });
  }
}
