import z from "zod";
import "dotenv/config";

const envSchema = z.object({
	PORT: z.coerce.number(),
	HOST: z.string(),
	DATABASE_URL: z.string(),
	TEST: z.coerce.boolean().default(false),
	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string().default("10m"),
	JWT_REFRESH_EXPIRES_IN: z.string().default("1d"),
});

const envServer = envSchema.safeParse({
	PORT: process.env.PORT,
	HOST: process.env.HOST,
	DATABASE_URL: process.env.DATABASE_URL,
	TEST: process.env.TEST,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
	JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
});

if (!envServer.success) {
	console.error(envServer.error.issues);
	throw new Error("There is an error with the server environment variables");
}

export const env = envServer.data;
