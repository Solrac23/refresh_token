import type { User } from "@/database/generated/prisma/client";
import { prisma } from "@/database/lib/prisma";
import type { IUserRepository } from "./i-user-repository";

export class UserRepository implements IUserRepository {
  public async findUserById(
    userId: string,
  ): Promise<Omit<User, "password"> | null> {
    return await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        password: false,
        usersPermissions: {
          select: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
        usersRoles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                description: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
  }

  public async findByUsernameOrEmail(
    username: string,
    email: string,
  ): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  }

  public async create(
    data: Pick<User, "name" | "username" | "email" | "password">,
  ): Promise<Pick<User, "id" | "name" | "username" | "email">> {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
      },
    });
  }

  public async findByIdWithoutRelations(
    id: string,
  ): Promise<Pick<
    User,
    "id" | "name" | "username" | "email" | "createdAt" | "updatedAt"
  > | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
