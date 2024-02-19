import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { List, ListProps } from "@src/domain/lists/enterprise/entities/list";

export function makeList(
	override: Partial<ListProps> = {},
	id?: UniqueEntityID,
) {
	const list = List.create(
		{
			creatorId: new UniqueEntityID(),
			schemaId: new UniqueEntityID(),
			title: faker.word.words(2),
			description: faker.lorem.paragraph(),
			...override,
		},
		id,
	);

	return list;
}
