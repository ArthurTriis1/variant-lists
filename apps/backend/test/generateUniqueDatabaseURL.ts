import { env } from "@src/env";
import "dotenv/config";
import { randomUUID } from "node:crypto";

const { DATABASE_URL } = env;

export function generateUniqueDatabaseURL() {
	const schemaId = randomUUID();
	if (!DATABASE_URL) {
		throw new Error("Please provider a DATABASE_URL environment variable");
	}

	const url = new URL(DATABASE_URL);

	url.searchParams.set("schema", schemaId);

	const databaseURL = url.toString();

	process.env.DATABASE_URL = databaseURL;
}
