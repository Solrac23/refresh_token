import type { FastifyLoggerOptions, RawServerDefault } from "fastify";
import type { PinoLoggerOptions } from "fastify/types/logger";

export type LoggerEnvType = {
	development: FastifyLoggerOptions<RawServerDefault> &
		PinoLoggerOptions<never, boolean>;
	production: boolean;
	test: boolean;
};
