import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

export type SchemaProps = {
	title: string;
	creatorId: UniqueEntityID;
	data: Record<string, unknown>;
};

export class Schema extends Entity<SchemaProps> {
	static create(props: SchemaProps, id?: UniqueEntityID) {
		return new Schema(props, id);
	}

	get data() {
		return this.props.data;
	}
}
