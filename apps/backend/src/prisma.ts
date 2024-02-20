import { PrismaClient } from "@prisma/client";
import { generateUniqueDatabaseURL } from "@test/generateUniqueDatabaseURL";
import { env } from "./env";

const { TEST } = env;

if (TEST) {
	generateUniqueDatabaseURL();
}

export const prisma = new PrismaClient({
	log: ["warn", "error"],
});
