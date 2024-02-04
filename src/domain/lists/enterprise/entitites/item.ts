import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/uinique-entity-id";

export type ItemProps = {
	title: string;
	description: string;
	listId: UniqueEntityID;
	creatorId: UniqueEntityID;
	imageUrl?: string;
	lastValidationDate: Date;
	isValid: boolean;
	data: Record<string, unknown>;
};

export class Item extends Entity<ItemProps> {
	static create(props: ItemProps, id?: UniqueEntityID) {
		return new Item(props, id);
	}
}
