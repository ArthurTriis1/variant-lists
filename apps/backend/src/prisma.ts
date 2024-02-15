import { PrismaClient } from "@prisma/client";
import { generateUniqueDatabaseURL } from "@test/generateUniqueDatabaseURL";

if (process.env.TEST) {
	generateUniqueDatabaseURL();
}

export const prisma = new PrismaClient({
	log: ["warn", "error"],
});
