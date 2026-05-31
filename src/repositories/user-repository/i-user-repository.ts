import type { User } from "@/database/generated/prisma/client";

export interface IUserRepository {
  findUserById(userId: string): Promise<Omit<User, "password"> | null>;
}
