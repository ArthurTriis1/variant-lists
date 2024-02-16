import { UserRepository } from "@src/domain/lists/application/repositories/user-repository";
import { User } from "@src/domain/lists/enterprise/entities/user";

export class InMemoryUserRepository implements UserRepository {
	public users: User[] = [];

	async create(user: User) {
		this.users.push(user);
	}

	async findById(id: string): Promise<User | null> {
		return this.users.find((user) => user.id.toString() === id) ?? null;
	}

	async findByEmail(email: string): Promise<User | null> {
		return (
			this.users.find((user) => user.email.toString() === email) ?? null
		);
	}
}
