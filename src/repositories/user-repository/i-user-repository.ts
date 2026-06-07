import type { User } from "@/database/generated/prisma/client";

export interface IUserRepository {
  findUserById(userId: string): Promise<Omit<User, "password"> | null>;
  findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
  create(
    data: Pick<User, "name" | "username" | "email" | "password">,
  ): Promise<Pick<User, "id" | "name" | "username" | "email">>;
  findByIdWithoutRelations(id: string): Promise<Omit<User, "password"> | null>;
}
