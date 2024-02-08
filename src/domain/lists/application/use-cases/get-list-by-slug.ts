import { ListNotFoundError } from "@src/core/errors/list-not-found-error";
import { List } from "@src/domain/lists/enterprise/entities/list";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { NotAllowedError } from "@src/core/errors/not-allowed-error";

interface GetListBySlugRequest {
	slug: string;
	creatorId: string;
}

interface GetListBySlugResponse {
	list: List;
}

export class GetListBySlugUseCase {
	constructor(private listRepository: ListRepository) {}

	async execute({
		slug,
		creatorId,
	}: GetListBySlugRequest): Promise<GetListBySlugResponse> {
		const list = await this.listRepository.findBySlug(slug);

		if (!list) {
			throw new ListNotFoundError();
		}

		if (list.creatorId.toString() !== creatorId) {
			throw new NotAllowedError();
		}

		return { list };
	}
}
