import { List } from "../../enterprise/entitites/list";
import { ListRepository } from "../repositories/list-repository";

interface FetchListsByUserRequest {
	creatorId: string;
}

interface FetchListsByUserResponse {
	lists: List[];
}

export class FetchListsByUserUseCase {
	constructor(private listRepository: ListRepository) {}

	async execute({
		creatorId,
	}: FetchListsByUserRequest): Promise<FetchListsByUserResponse> {
		const lists = await this.listRepository.findManyByCreatorId(creatorId);

		return {
			lists,
		};
	}
}
