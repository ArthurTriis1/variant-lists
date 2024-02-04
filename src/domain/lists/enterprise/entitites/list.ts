import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityID } from "../../../../core/entities/uinique-entity-id";

export type ListProps = {
	title: string;
	description: string;
	schemaId: UniqueEntityID;
	creatorId: UniqueEntityID;
};

export class List extends Entity<ListProps> {
	static create(props: ListProps, id?: UniqueEntityID) {
		return new List(props, id);
	}

	get schemaId() {
		return this.props.schemaId;
	}

	set schemaId(value: UniqueEntityID) {
		this.props.schemaId = value;
	}
}
