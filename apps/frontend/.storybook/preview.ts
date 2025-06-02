import type { Preview } from "@storybook/react-vite";
import "../app/app.css"; // Importa os estilos do Tailwind CSS
import "./preview.css"; // Import Storybook-specific styles

// Add Londrina Solid font from Google Fonts
const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300;400;900&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#1f2937",
        },
      ],
    },
    layout: "centered",
    docs: {
      theme: {
        fontFamily: '"Londrina Solid", sans-serif',
      },
    },
  },
};

export default preview;
