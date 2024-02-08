import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import {
	Schema,
	SchemaProps,
} from "@src/domain/lists/enterprise/entities/schema";

export function makeSchema(
	override: Partial<SchemaProps> = {},
	id?: UniqueEntityID,
) {
	const schema = Schema.create(
		{
			creatorId: new UniqueEntityID(),
			title: faker.lorem.text(),
			description: faker.lorem.paragraph(),
			data: {
				type: "object",
				properties: {
					name: {
						type: "string",
					},
				},
				required: ["name"],
			},
			...override,
		},
		id,
	);

	return schema;
}
