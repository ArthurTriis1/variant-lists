import "dotenv/config";
import { randomUUID } from "node:crypto";

export function generateUniqueDatabaseURL() {
	const schemaId = randomUUID();
	if (!process.env.DATABASE_URL) {
		throw new Error("Please provider a DATABASE_URL environment variable");
	}

	const url = new URL(process.env.DATABASE_URL);

	url.searchParams.set("schema", schemaId);

	const databaseURL = url.toString();

	process.env.DATABASE_URL = databaseURL;
}
