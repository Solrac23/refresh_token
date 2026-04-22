import fastifyCors from "@fastify/cors";
import "dotenv/config";
import fastify from "fastify";
import { jwtPlugin } from "./plugins/jwt.plugins";
import { routes } from "./routes";

async function bootstrap() {
	const app = fastify({ logger: true });
	process.env.NODE_ENV === "development"
		? "development"
		: process.env.NODE_ENV === "production"
			? "production"
			: "test";

	app.register(fastifyCors, {
		origin: true,
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
		optionsSuccessStatus: 204,
	});

	app.register(jwtPlugin);

	app.register(routes);

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
			console.log(`Server is running on ${address}`);
			app.log.info(`Server is running on ${address}`);
		}
	);
}

bootstrap().catch(error => {
	console.error(error);
	process.exit(1);
});
