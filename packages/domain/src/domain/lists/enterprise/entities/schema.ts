import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { Slug } from "@src/domain/lists/enterprise/entities/value-objects/slug";
import { Optional } from "@src/core/types/optional";

export type SchemaProps = {
	title: string;
	slug: Slug;
	description: string;
	creatorUsername: string;
	data: Record<string, unknown>;
	lastUpdateSchemaDate: Date;
};

export class Schema extends Entity<SchemaProps> {
	static create(
		props: Optional<SchemaProps, "lastUpdateSchemaDate" | "slug">,
		id?: UniqueEntityID,
	) {
		const { lastUpdateSchemaDate, slug, title } = props;

		const newProps: SchemaProps = {
			...props,
			title,
			slug: slug ?? Slug.createFromText(title),
			lastUpdateSchemaDate: lastUpdateSchemaDate ?? new Date(),
		};

		return new Schema(newProps, id);
	}

	get data() {
		return this.props.data;
	}

	set data(value: Record<string, unknown>) {
		this.props.lastUpdateSchemaDate = new Date();
		this.props.data = value;
	}

	get title() {
		return this.props.title;
	}

	set title(value: string) {
		this.props.title = value;
	}

	get creatorUsername() {
		return this.props.creatorUsername;
	}

	set creatorUsername(value: string) {
		this.props.creatorUsername = value;
	}

	get description() {
		return this.props.description;
	}

	set description(value: string) {
		this.props.description = value;
	}

	get lastUpdateSchemaDate() {
		return this.props.lastUpdateSchemaDate;
	}

	get slug() {
		return this.props.slug;
	}
}
