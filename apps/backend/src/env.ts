import z from "zod";
import "dotenv/config";

const envSchema = z.object({
	PORT: z.coerce.number(),
	HOST: z.string(),
	DATABASE_URL: z.string(),
	TEST: z.coerce.boolean().default(false),
});

const envServer = envSchema.safeParse({
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	DATABASE_URL: process.env.DATABASE_URL,
	TEST: process.env.TEST,
});

if (!envServer.success) {
	console.error(envServer.error.issues);
	throw new Error("There is an error with the server environment variables");
}

export const env = envServer.data;
