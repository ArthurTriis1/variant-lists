import { PrismaSchemaMapper } from "@src/database/prisma/mappers/prisma-schema-mapper";
import { prisma } from "@src/prisma";
import { Schema, SchemaProps, makeSchema } from "@variant-lists/domain";

export const makePrismaSchema = async (
	data: Partial<SchemaProps> = {},
): Promise<Schema> => {
	const schema = makeSchema(data);

	await prisma.schema.create({
		data: PrismaSchemaMapper.toPrisma(schema),
	});

	return schema;
};
