import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../app/components/ui/button";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A customizable button component with different variants and sizes.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			options: ["default", "outline", "ghost"],
			control: { type: "select" },
			description: "The visual style variant of the button",
		},
		size: {
			options: ["default", "sm", "lg"],
			control: { type: "select" },
			description: "The size of the button",
		},
		children: {
			control: "text",
			description: "The content to be rendered inside the button",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Default Button",
		variant: "default",
		size: "default",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline Button",
		variant: "outline",
		size: "default",
	},
};

export const Ghost: Story = {
	args: {
		children: "Ghost Button",
		variant: "ghost",
		size: "default",
	},
};

export const Small: Story = {
	args: {
		children: "Small Button",
		variant: "default",
		size: "sm",
	},
};

export const Large: Story = {
	args: {
		children: "Large Button",
		variant: "default",
		size: "lg",
	},
};
