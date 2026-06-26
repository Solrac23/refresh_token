import type { LoggerEnvType } from "./logger-env-type";

export const envToLogger: LoggerEnvType = {
  development: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "SYS:HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
    redact: ["req.headers.authorization"],
    serializers: {
      req(request) {
        return {
          host: request.ip,
          method: request.method,
          url: request.url,
        };
      },
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
    },
  },
  production: true,
  test: false,
};
