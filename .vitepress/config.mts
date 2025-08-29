import { defineConfig } from "vitepress";
import { globalConfig } from "../config";
import { RssPlugin } from "vitepress-plugin-rss";
import type { RSSOptions } from "vitepress-plugin-rss";

// RSS feed configuration
const RSS: RSSOptions = {
  title: globalConfig.title,
  baseUrl: globalConfig.url,
  copyright: "采用 CC BY-NC-ND 4.0 授权",
  description: globalConfig.description,
  filename: "feed.rss",
  log: true,
  ignoreHome: true,
  ignorePublish: false,
  renderExpect: (fileContent) => {
    const excerpt = fileContent;
    return excerpt;
  },
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: globalConfig.title,
  description: globalConfig.description,
  vite: {
    plugins: [RssPlugin(RSS)],
  },
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  },
  head: [["link", { rel: "icon", href: globalConfig.favicon }]],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: globalConfig.nav,
    // it seems bad TwT
    logo: globalConfig.favicon,

    footer: {
      message: "Released under the CC BY-SA 4.0 license.",
      copyright: `© 2025 ${globalConfig.github}. All Rights Reserved.`,
    },

    socialLinks: [
      { icon: "github", link: `https://github.com/${globalConfig.github}` },
    ],

    search: {
      provider: "local",
    },
  },
});
