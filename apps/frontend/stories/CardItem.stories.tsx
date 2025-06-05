import { TreeStructureIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardItem } from "~/components/ui/card-item";

const meta = {
	title: "UI/CardItem",
	component: CardItem,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "Favorite Movies",
		subtitle: "Favorite Movies",
		subtitleIcon: <TreeStructureIcon />,
		description:
			"Debitis laboriosam exercitationem illum deserunt. Alias beatae soluta enim autem temporibus quia. Atque sequi voluptatum quam qui cumque. Debitis laboriosam exercitationem illum deserunt. Alias beatae soluta enim autem temporibus quia. Atque sequi voluptatum quam qui cumque.",
		author: "@Barton",
		warning: "Out of date with schema",
	},
};

export const NoWarning: Story = {
	args: {
		title: "Favorite Movies",
		subtitle: "Favorite Movies",
		description:
			"Debitis laboriosam exercitationem illum deserunt. Alias beatae soluta enim autem temporibus quia. Atque sequi voluptatum quam qui cumque.",
		author: "@Barton",
	},
};

export const TitleOnly: Story = {
	args: {
		title: "Movie",
	},
};
