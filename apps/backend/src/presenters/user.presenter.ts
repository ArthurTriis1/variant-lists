import { User } from "@variant-lists/domain";

export type UserPresented = {
	id: string;
	name: string;
	username: string;
};

export class UserPresenter {
	static toHTTP(user: User): UserPresented {
		return {
			id: user.id.toString(),
			name: user.name,
			username: user.username,
		};
	}
}
