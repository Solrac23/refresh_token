import type { User } from "@/database/generated/prisma/client";

export interface CreateUserAcessControlListDTO {
  userId: string;
  roles: string[];
  permissions: string[];
}

export interface CreateUserAcessControlListResponseDTO extends Omit<
  User,
  "password"
> {}
