import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

export type SchemaProps = {
	title: string;
	description: string;
	creatorId: UniqueEntityID;
	data: Record<string, unknown>;
	lastUpdateSchemaDate: Date;
};

export class Schema extends Entity<SchemaProps> {
	static create(
		props: Omit<SchemaProps, "lastUpdateSchemaDate">,
		id?: UniqueEntityID,
	) {
		const newProps: SchemaProps = {
			...props,
			lastUpdateSchemaDate: new Date(),
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

	get creatorId() {
		return this.props.creatorId;
	}

	set creatorId(value: UniqueEntityID) {
		this.props.creatorId = value;
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
}
