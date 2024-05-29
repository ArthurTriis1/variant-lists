import { faker } from "@faker-js/faker";
import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { User, UserProps } from "@src/domain/lists/enterprise/entities/user";

export function makeUser(
	override: Partial<UserProps> = {},
	id?: UniqueEntityID,
) {
	const firstName = faker.person.firstName();

	const user = User.create(
		{
			name: firstName,
			email: faker.internet.email(),
			username: faker.internet.userName({ firstName }),
			password: faker.internet.password(),
			...override,
		},
		id,
	);

	return user;
}
