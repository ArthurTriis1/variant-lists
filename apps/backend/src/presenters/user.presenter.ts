import { User } from "@variant-lists/domain";

export class UserPresenter {
	static toHTTP(user: User) {
		return {
			id: user.id.toString(),
			name: user.name,
			password: user.password,
		};
	}
}
