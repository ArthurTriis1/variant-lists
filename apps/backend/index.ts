import { env } from "@src/env";
import { app } from "app";

const { HOST, PORT } = env;

app.listen({ port: PORT, host: HOST }).then((value) => {
	console.log(`🚀 Server started on: ${value}`);
	console.log(
		`📄 The documentation can be accessed on: ${value}/documentation`,
	);
});
