import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";
import { List } from "../../enterprise/entitites/list";
import { ListRepository } from "../repositories/list-repository";
import { NotAllowedError } from "@src/core/errors/errors/not-allowed-error";

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
