import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { List, ListProps } from "@src/domain/lists/enterprise/entitites/list";

export function makeList(
	override: Partial<ListProps> = {},
	id?: UniqueEntityID,
) {
	const list = List.create(
		{
			creatorId: new UniqueEntityID(),
			schemaId: new UniqueEntityID(),
			title: faker.lorem.text(),
			description: faker.lorem.paragraph(),
			...override,
		},
		id,
	);

	return list;
}
