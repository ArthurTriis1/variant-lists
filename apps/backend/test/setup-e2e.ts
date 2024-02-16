import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

beforeAll(async () => {
	execSync("pnpm prisma migrate deploy");
});

afterAll(async () => {
	if (!process.env.DATABASE_URL) {
		throw new Error("Please provider a DATABASE_URL environment variable");
	}
	const url = new URL(process.env.DATABASE_URL);

	const schemaId = url.searchParams.get("schema");

	await prisma.$executeRawUnsafe(
		`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`,
	);
	await prisma.$disconnect();
});
