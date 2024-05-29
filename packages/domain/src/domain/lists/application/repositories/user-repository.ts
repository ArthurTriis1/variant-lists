import { User } from "@src/domain/lists/enterprise/entities/user";

export type FindByEmailOrUsernameProps =
	| {
			email?: string;
			username: string;
	  }
	| {
			email: string;
			username?: string;
	  };

export interface UserRepository {
	create(user: User): Promise<void>;
	findById(id: string): Promise<User | null>;
	findByEmailOrUsername({
		email,
		username,
	}: FindByEmailOrUsernameProps): Promise<User | null>;
}
