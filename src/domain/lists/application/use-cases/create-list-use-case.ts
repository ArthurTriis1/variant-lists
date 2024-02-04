import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { List } from "../../enterprise/entitites/list";
import { ListRepository } from "../repositories/list-repository";

interface CreateListRequest {
	title: string;
	description: string;
	creatorId: string;
	schemaId: string;
}

interface CreateListResponse {
	list: List;
}

export class CreateListUseCase {
	constructor(private listRepository: ListRepository) {}

	async execute({
		title,
		description,
		creatorId,
		schemaId,
	}: CreateListRequest): Promise<CreateListResponse | null> {
		const list = List.create({
			title,
			description,
			creatorId: new UniqueEntityID(creatorId),
			schemaId: new UniqueEntityID(schemaId),
		});

		await this.listRepository.create(list);

		return {
			list,
		};
	}
}
