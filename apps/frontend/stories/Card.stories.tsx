import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../app/components/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible container that can be used to group and present content. Supports different background colors and can contain any type of content such as text, buttons, and other components.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to be applied to the card",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="mb-2 font-londrina text-xl">Card Title</h3>
        <p className="text-muted-foreground">
          This is an example of content inside the card. You can place any component here.
        </p>
      </div>
    ),
  },
};

export const WithCustomColor: Story = {
  args: {
    className: "bg-accent",
    children: (
      <div className="p-6">
        <h3 className="mb-2 font-londrina text-xl">Colored Card</h3>
        <p className="text-muted-foreground">
          This card has a custom background color applied through the className prop.
        </p>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-londrina text-xl">Card with Actions</h3>
        <p className="text-muted-foreground">
          This card contains action buttons in the footer.
        </p>
        <div className="border-border mt-4 flex justify-end gap-2 border-t pt-4">
          <button className="bg-muted text-muted-foreground rounded-lg px-4 py-2 font-londrina">
            Cancel
          </button>
          <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-londrina">
            Confirm
          </button>
        </div>
      </div>
    ),
  },
};
