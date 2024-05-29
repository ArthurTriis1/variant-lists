import { Entity } from "@src/core/entities/entity";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";

export type UserProps = {
	name: string;
	username: string;
	email: string;
	password: string;
};

export class User extends Entity<UserProps> {
	static create(props: UserProps, id?: UniqueEntityID) {
		return new User(props, id);
	}

	get name() {
		return this.props.name;
	}

	get password() {
		return this.props.password;
	}

	get email() {
		return this.props.email;
	}

	get username() {
		return this.props.username;
	}
}
