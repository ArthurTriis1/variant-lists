import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../app/components/ui/card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Classes CSS adicionais",
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
        <h3 className="text-xl font-londrina mb-2">Título do Card</h3>
        <p className="text-gray-700">
          Esse é um exemplo de conteúdo dentro do card. Você pode colocar qualquer componente aqui.
        </p>
      </div>
    ),
  },
};

export const WithCustomColor: Story = {
  args: {
    className: "bg-yellow-100",
    children: (
      <div className="p-6">
        <h3 className="text-xl font-londrina mb-2">Card Colorido</h3>
        <p className="text-gray-700">
          Este card tem uma cor de fundo personalizada aplicada através da prop className.
        </p>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-xl font-londrina">Card com Ações</h3>
        <p className="text-gray-700">
          Este card contém botões de ação no rodapé.
        </p>
        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-londrina">
            Cancelar
          </button>
          <button className="px-4 py-2 bg-black rounded-lg text-white font-londrina">
            Confirmar
          </button>
        </div>
      </div>
    ),
  },
};
