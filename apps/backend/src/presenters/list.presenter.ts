import { List } from "@variant-lists/domain";

export type ListPresented = {
	title: string;
	slug: string;
	description: string;
	schemaId: string;
	creatorId: string;
};

export class ListPresenter {
	static toHTTP(list: List): ListPresented {
		return {
			title: list.title,
			slug: list.slug.value,
			description: list.description,
			schemaId: list.schemaId.toString(),
			creatorId: list.schemaId.toString(),
		};
	}
}
