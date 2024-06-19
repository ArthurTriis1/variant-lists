import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Item, ItemProps } from "@src/domain/lists/enterprise/entities/item";

export function makeItem(
	override: Partial<ItemProps> = {},
	id?: UniqueEntityID,
) {
	const item = Item.create(
		{
			creatorUsername: faker.internet.displayName(),
			title: faker.word.words(2),
			description: faker.lorem.paragraph(),
			listSlug: faker.lorem.slug(),
			imageUrl: faker.image.url(),
			data: {},
			...override,
		},
		id,
	);

	return item;
}
