import { Item } from "@variant-lists/domain";

export type ItemPresented = {
	title: string;
	slug: string;
	description: string;
	listId: string;
	creatorId: string;
	imageUrl?: string;
	lastValidationDate: string;
	isValid: boolean;
	data: Record<string, unknown>;
};

export class ItemPresenter {
	static toHTTP(item: Item): ItemPresented {
		return {
			title: item.title,
			slug: item.slug.value,
			description: item.description,
			listId: item.listId.toString(),
			creatorId: item.creatorId.toString(),
			imageUrl: item.imageUrl,
			lastValidationDate: item.lastValidationDate.toISOString(),
			isValid: item.isValid,
			data: item.data,
		};
	}
}
