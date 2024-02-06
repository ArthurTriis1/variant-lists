import { ListNotFoundError } from "@src/core/errors/errors/list-not-found-error";
import { List } from "../../enterprise/entitites/list";
import { ListRepository } from "../repositories/list-repository";

interface GetListBySlugRequest {
	slug: string;
}

interface GetListBySlugResponse {
	list: List;
}

export class GetListBySlugUseCase {
	constructor(private listRepository: ListRepository) {}

	async execute({
		slug,
	}: GetListBySlugRequest): Promise<GetListBySlugResponse> {
		const list = await this.listRepository.findBySlug(slug);

		if (!list) {
			throw new ListNotFoundError();
		}

		return { list };
	}
}
