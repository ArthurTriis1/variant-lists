import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../app/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    disabled: {
      control: "boolean",
      description: "Define se o input está desabilitado",
    },
    error: {
      control: "text",
      description: "Mensagem de erro",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
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
    placeholder: "Digite alguma coisa...",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <Input {...args}>
      <label className="font-londrina text-lg text-black">Email</label>
    </Input>
  ),
  args: {
    placeholder: "Digite seu email...",
    type: "email",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Pesquisar...",
    icon: <MagnifyingGlassIcon size={24} />,
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Digite seu email...",
    error: "Email inválido!",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Input desabilitado",
    disabled: true,
  },
};
