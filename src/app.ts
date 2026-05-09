import fastifyCors from "@fastify/cors";
import helmet from "@fastify/helmet";
import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import "dotenv/config";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { envToLogger } from "./logger/env-to-logger";
import type { LoggerEnvType } from "./logger/logger-env-dto";
import { jwtPlugin } from "./plugins/jwt.plugins";
import { routes } from "./routes/index";

const app = fastify({
  logger: envToLogger[process.env.NODE_ENV as keyof LoggerEnvType] ?? true,
  requestIdHeader: false,
  requestIdLogLabel: "request-id",
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

if (process.env.NODE_ENV === "production") app.register(helmet);

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Auth API",
      description: "API de autenticação e refresh token",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Authorization",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(scalarApiReference, {
  routePrefix: "/docs",
});

app.register(jwtPlugin);
app.setErrorHandler((error, request, reply) => {
  request.log.error(error);
  reply.code(500).send({ error: "Internal server error" });
});

app.register(routes, {
  prefix: "/api/v1",
});

async function bootstrap() {
  app.listen(
    {
      port: Number(process.env.PORT) || 3333,
      host: "0.0.0.0",
    },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      app.log.info(`Server is running on ${address}`);
      app.log.info(`Docs is running on ${address}/docs`);
    },
  );
}

bootstrap();
