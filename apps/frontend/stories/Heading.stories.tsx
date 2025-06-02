import type { Meta, StoryObj } from "@storybook/react-vite";

import { DatabaseIcon } from "@phosphor-icons/react";
import { Heading } from "~/components/ui/heading";

const meta = {
  title: "UI/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Schemas",
    icon: <DatabaseIcon size={24} />,
  },
};

export const Small: Story = {
  args: {
    children: "Schemas",
    icon: <DatabaseIcon size={20} />,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Schemas",
    icon: <DatabaseIcon size={24} />,
    size: "lg",
  },
};

export const AsH1: Story = {
  args: {
    children: "Schemas",
    icon: <DatabaseIcon size={24} />,
    level: 1,
  },
};
