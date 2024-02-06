import { Optional } from "@src/core/types/optional";
import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/uinique-entity-id";
import { Slug } from "./value-objects/slug";

export type ItemProps = {
	title: string;
	slug: Slug;
	description: string;
	listId: UniqueEntityID;
	creatorId: UniqueEntityID;
	imageUrl?: string;
	lastValidationDate: Date;
	isValid: boolean;
	data: Record<string, unknown>;
};

export class Item extends Entity<ItemProps> {
	static create(
		props: Optional<ItemProps, "slug" | "lastValidationDate" | "isValid">,
		id?: UniqueEntityID,
	) {
		const { slug, title, lastValidationDate, isValid } = props;

		const newProps: ItemProps = {
			...props,
			title,
			lastValidationDate: lastValidationDate ?? new Date(),
			isValid: isValid ?? true,
			slug: slug ?? Slug.createFromText(title),
		};
		return new Item(newProps, id);
	}

	get slug() {
		return this.props.slug;
	}

	get creatorId() {
		return this.props.creatorId;
	}
}
