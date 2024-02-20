import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { env } from "@src/env";

const { DATABASE_URL } = env;

const prisma = new PrismaClient();

beforeAll(async () => {
	execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
	if (!DATABASE_URL) {
		throw new Error("Please provider a DATABASE_URL environment variable");
	}
	const url = new URL(DATABASE_URL);

	const schemaId = url.searchParams.get("schema");

	await prisma.$executeRawUnsafe(
		`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
	);
	await prisma.$disconnect();
});
