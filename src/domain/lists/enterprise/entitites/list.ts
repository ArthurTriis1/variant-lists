import { Optional } from "@src/core/types/optional";
import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Slug } from "@src/domain/lists/enterprise/entitites/value-objects/slug";

export type ListProps = {
	title: string;
	slug: Slug;
	description: string;
	schemaId: UniqueEntityID;
	creatorId: UniqueEntityID;
};

export class List extends Entity<ListProps> {
	static create(props: Optional<ListProps, "slug">, id?: UniqueEntityID) {
		const { slug, title } = props;

		const newProps: ListProps = {
			...props,
			title,
			slug: slug ?? Slug.createFromText(title),
		};

		return new List(newProps, id);
	}

	get schemaId() {
		return this.props.schemaId;
	}

	set schemaId(value: UniqueEntityID) {
		this.props.schemaId = value;
	}

	get slug() {
		return this.props.slug;
	}

	get creatorId() {
		return this.props.creatorId;
	}
}
