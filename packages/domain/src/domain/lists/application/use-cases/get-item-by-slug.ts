import { NotAllowedError } from "@src/core/errors/not-allowed-error";
import { Item } from "@src/domain/lists/enterprise/entities/item";
import { ItemRepository } from "@src/domain/lists/application/repositories/item-repository";
import { ItemNotFoundError } from "@src/core/errors/item-not-found-error";
import { UserRepository } from "../repositories";

interface GetItemBySlugRequest {
	slug: string;
	userId: string;
	creatorUsername: string;
	listSlug: string;
}

interface GetItemBySlugResponse {
	item: Item;
}

export class GetItemBySlug {
	constructor(
		private itemRepository: ItemRepository,
		private userRepository: UserRepository,
	) {}

	async execute({
		slug,
		userId,
		listSlug,
		creatorUsername,
	}: GetItemBySlugRequest): Promise<GetItemBySlugResponse> {
		const item = await this.itemRepository.findBySlug({
			slug,
			listSlug,
			creatorUsername,
		});

		if (!item) {
			throw new ItemNotFoundError();
		}

		const user = await this.userRepository.findById(userId);

		if (item.creatorUsername !== user?.username) {
			throw new NotAllowedError();
		}

		return { item };
	}
}
