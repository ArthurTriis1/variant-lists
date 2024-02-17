import { prisma } from "@src/prisma";
import { Schema, SchemaRepository } from "@variant-lists/domain";
import { PrismaSchemaMapper } from "../mappers/prisma-schema.mapper";

class PrismaSchemaRepository implements SchemaRepository {
	async create(schema: Schema): Promise<void> {
		const data = PrismaSchemaMapper.toPrisma(schema);
		await prisma.schema.create({ data });
	}

	async save(schema: Schema): Promise<void> {
		const data = PrismaSchemaMapper.toPrisma(schema);

		await prisma.schema.update({
			where: {
				id: data.id,
			},
			data,
		});
	}

	async findById(id: string): Promise<Schema | null> {
		const schema = await prisma.schema.findUnique({
			where: {
				id,
			},
		});

		return schema ? PrismaSchemaMapper.toDomain(schema) : null;
	}
	async findBySlug(slug: string): Promise<Schema | null> {
		const schema = await prisma.schema.findUnique({
			where: {
				slug,
			},
		});

		return schema ? PrismaSchemaMapper.toDomain(schema) : null;
	}

	async findManyByCreatorId(creatorId: string): Promise<Schema[]> {
		const schemas = await prisma.schema.findMany({
			where: {
				creatorId,
			},
		});

		return schemas?.length ? schemas.map(PrismaSchemaMapper.toDomain) : [];
	}
}

export default PrismaSchemaRepository;
