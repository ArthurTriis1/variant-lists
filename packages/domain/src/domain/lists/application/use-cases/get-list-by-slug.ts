import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { List } from "@src/domain/lists/enterprise/entities/list";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import { UserRepository } from "../repositories";

interface GetListBySlugRequest {
	slug: string;
	userId: string;
	creatorUsername: string;
}

interface GetListBySlugResponse {
	list: List;
}

export class GetListBySlug {
	constructor(
		private listRepository: ListRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		slug,
		userId,
		creatorUsername,
	}: GetListBySlugRequest): Promise<GetListBySlugResponse> {
		const user = await this.userRepository.findById(userId);

		if (!user || creatorUsername !== user?.username) {
			throw new NotAllowedError();
		}

		const list = await this.listRepository.findBySlug({
			slug,
			creatorUsername,
		});

		if (!list) {
			throw new ListNotFoundError();
		}

		return { list };
	}
}
