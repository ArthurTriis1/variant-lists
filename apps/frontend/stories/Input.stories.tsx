import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../app/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

// Test comment to verify husky pre-commit hooks
const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
    // Configuração específica para documentação
    docs: {
      description: {
        component:
          "A customizable text input field with support for icons, labels, and error messages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    type: {
      options: ["text", "password", "email", "number"],
      control: { type: "select" },
      description: "Tipo do input",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type something...",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <Input {...args}>
      <label className="font-londrina text-lg text-black">Email</label>
    </Input>
  ),
  args: {
    placeholder: "Enter your email...",
    type: "email",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Search...",
    icon: <MagnifyingGlassIcon size={24} />,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter your email...",
    error: "Invalid email!",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input disabled",
    disabled: true,
  },
};
