import type { StorybookConfig } from "@storybook/react-vite";
import { join, dirname } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-docs"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  // Point to our custom Vite config that avoids React Router
  core: {
    builder: {
      name: getAbsolutePath("@storybook/builder-vite"),
      options: {
        viteConfigPath: join(
          dirname(__dirname),
          ".storybook",
          "vite.config.ts",
        ),
      },
    },
  },
};

export default config;
