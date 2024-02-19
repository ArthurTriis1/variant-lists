import "@fastify/jwt";
import { UserPresented } from "@src/presenters/user.presenter";

declare module "@fastify/jwt" {
	interface FastifyJWT {
		payload: { id: number }; // payload type is used for signing and verifying
		user: UserPresented; // user type is return type of `request.user` object
	}
}
