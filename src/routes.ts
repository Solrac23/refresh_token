import { authenticateUser } from "@/use-cases/authenticate-user";
import { createUserController } from "@/use-cases/create-user";
import * as z from "zod/mini";
import type { FastifyTypedInstance } from "./fastify-typed-instance";
import { authenticate } from "./meddlewares/authenticate";
import { refreshTokenController } from "./use-cases/refresh-token-user";

export async function routes(app: FastifyTypedInstance) {
  const authController = authenticateUser(app);
  const refreshTokenUserController = refreshTokenController(app);

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create a new user",
        body: z.object({
          name: z.string(),
          username: z.string(),
          email: z.email(),
          password: z.string().check(z.minLength(6)),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              username: z.string(),
              email: z.string(),
            }),
          }),
          400: z.object({
            error: z.string().check(z.describe("User not found")),
          }),
        },
      },
    },
    async (request, reply) => {
      return await createUserController.handle(request, reply);
    },
  );

  app.post(
    "/login",
    {
      schema: {
        tags: ["login"],
        description: "Login",
        body: z.object({
          email: z.email(),
          username: z.optional(z.string()),
          password: z.string().check(z.minLength(6)),
        }),
        response: {
          201: z.object({
            token: z.jwt({ alg: "HS384" }),
            refreshToken: z.optional(
              z.object({
                id: z.string(),
                expiresIn: z.number().check(z.gte(12)),
                userId: z.string(),
              }),
            ),
          }),
          401: z.object({
            error: z.string().check(z.describe("User or password incorrect")),
          }),
        },
      },
    },
    async (request, reply) => {
      return await authController.handle(request, reply);
    },
  );

  app.post(
    "/refresh-token",
    {
      schema: {
        tags: ["refresh-token"],
        description: "Refresh token",
        body: z.object({
          refresh_token: z.string().check(z.minLength(1)),
        }),
        response: {
          200: z.object({
            token: z.jwt({ alg: "HS384" }),
            refreshToken: z.optional(
              z.object({
                id: z.string(),
                expiresIn: z.number().check(z.gte(12)),
                userId: z.string(),
              }),
            ),
          }),
          400: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      return await refreshTokenUserController.handle(request, reply);
    },
  );

  app.get(
    "/courses",
    {
      onRequest: authenticate,
      schema: {
        tags: ["courses"],
        description: "Get all courses",
        response: {
          200: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
            }),
          ),
          401: z.object({
            error: z.string().check(z.describe("Invalid refresh token")),
          }),
        },
      },
    },
    async (request, reply) => {
      return reply.send([
        { id: 1, name: "Course 1" },
        { id: 2, name: "Course 2" },
        { id: 3, name: "Course 3" },
      ]);
    },
  );
}
