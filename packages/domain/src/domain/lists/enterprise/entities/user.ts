import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

export type UserProps = {
	name: string;
};

export class User extends Entity<UserProps> {
	static create(props: UserProps, id?: UniqueEntityID) {
		return new User(props, id);
	}

	static log() {
		console.log("Hello");
	}
}
