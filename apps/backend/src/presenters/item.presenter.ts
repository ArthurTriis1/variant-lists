import { Item } from "@variant-lists/domain";

export type ItemPresented = {
	title: string;
	slug: string;
	description: string;
	listSlug: string;
	creatorUsername: string;
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
			listSlug: item.listSlug,
			creatorUsername: item.creatorUsername,
			imageUrl: item.imageUrl,
			lastValidationDate: item.lastValidationDate.toISOString(),
			isValid: item.isValid,
			data: item.data,
		};
	}
}
