import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Item, ItemProps } from "@src/domain/lists/enterprise/entitites/item";

export function makeItem(
	override: Partial<ItemProps> = {},
	id?: UniqueEntityID,
) {
	const item = Item.create(
		{
			creatorId: new UniqueEntityID(),
			title: faker.lorem.text(),
			description: faker.lorem.paragraph(),
			listId: new UniqueEntityID(),
			imageUrl: faker.image.url(),
			data: {},
			...override,
		},
		id,
	);

	return item;
}
