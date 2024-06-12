import { UniqueEntityID } from "@src/core/entities/uinique-entity-id";
import { List } from "@src/domain/lists/enterprise/entities/list";
import { ListRepository } from "@src/domain/lists/application/repositories/list-repository";
import { SchemaNotFoundError, SlugAlreadyExistsError } from "@src/core/errors";
import { SchemaRepository } from "../repositories/schema-repository";
import { UserRepository } from "../repositories/user-repository";
import { CreatorNotFoundError } from "@src/core/errors/creator-not-found-error";

interface CreateListRequest {
	title: string;
	description: string;
	creatorId: string;
	schemaId: string;
}

interface CreateListResponse {
	list: List;
}

export class CreateList {
	constructor(
		private listRepository: ListRepository,
		private schemaRepository: SchemaRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		title,
		description,
		creatorId,
		schemaId,
	}: CreateListRequest): Promise<CreateListResponse> {
		const user = await this.userRepository.findById(creatorId);

		if (!user) {
			throw new CreatorNotFoundError();
		}

		const schema = await this.schemaRepository.findById(schemaId);

		if (!schema) {
			throw new SchemaNotFoundError();
		}

		const list = List.create({
			title,
			description,
			creatorUsername: user.username,
			schemaId: new UniqueEntityID(schemaId),
		});

		const existList = await this.listRepository.findBySlug({
			creatorUsername: user.username,
			slug: list.slug.value,
		});

		if (existList) {
			throw new SlugAlreadyExistsError();
		}

		await this.listRepository.create(list);

		return {
			list,
		};
	}
}
