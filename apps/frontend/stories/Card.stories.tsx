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
          "Um container flexível que pode ser usado para agrupar e apresentar conteúdo. Suporta diferentes cores de fundo e pode conter qualquer tipo de conteúdo como textos, botões e outros componentes.",
      },
    },
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
        <h3 className="mb-2 font-londrina text-xl">Título do Card</h3>
        <p className="text-muted-foreground">
          Esse é um exemplo de conteúdo dentro do card. Você pode colocar
          qualquer componente aqui.
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
        <h3 className="mb-2 font-londrina text-xl">Card Colorido</h3>
        <p className="text-muted-foreground">
          Este card tem uma cor de fundo personalizada aplicada através da prop
          className.
        </p>
      </div>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-londrina text-xl">Card com Ações</h3>
        <p className="text-muted-foreground">
          Este card contém botões de ação no rodapé.
        </p>
        <div className="border-border mt-4 flex justify-end gap-2 border-t pt-4">
          <button className="bg-muted text-muted-foreground rounded-lg px-4 py-2 font-londrina">
            Cancelar
          </button>
          <button className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-londrina">
            Confirmar
          </button>
        </div>
      </div>
    ),
  },
};
