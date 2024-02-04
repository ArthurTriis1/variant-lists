import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

export type SchemaProps = {
	title: string;
	creatorId: UniqueEntityID;
	data: Record<string, unknown>;
	lastUpdateDate?: Date;
};

export class Schema extends Entity<SchemaProps> {
	static create(
		props: Omit<SchemaProps, "lastUpdateDate">,
		id?: UniqueEntityID,
	) {
		const newProps: SchemaProps = {
			...props,
			lastUpdateDate: new Date(),
		};

		return new Schema(newProps, id);
	}

	get data() {
		return this.props.data;
	}

	get title() {
		return this.props.title;
	}

	get creatorId() {
		return this.props.creatorId;
	}
}
