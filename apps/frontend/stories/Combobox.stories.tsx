import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "~/components/ui/combobox";

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable dropdown component that combines a button with a command menu, allowing users to filter and select from a list of options.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const Default: Story = {
  args: {
    items: frameworks,
    label: "Select Framework",
    placeholder: "Search framework...",
  },
};

const schemaTypes = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
  { value: "date", label: "Date" },
  { value: "object", label: "Object" },
  { value: "array", label: "Array" },
];

export const SchemaTypeSelector: Story = {
  args: {
    items: schemaTypes,
    label: "Select Type",
    placeholder: "Search types...",
  },
};

const longList = Array.from({ length: 20 }, (_, i) => ({
  value: `item-${i + 1}`,
  label: `Item ${i + 1}`,
}));

export const WithScrollableList: Story = {
  args: {
    items: longList,
    label: "Select Item",
    placeholder: "Search items...",
  },
};
