import { errorHandler } from "@src/plugins/error-handler.plugin";
import { routes } from "@src/plugins/routes.plugin";
import Fastify from "fastify";

const app = Fastify();

app.register(routes);
app.setErrorHandler(errorHandler);

export { app };
