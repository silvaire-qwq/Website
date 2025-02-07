import { defineConfig } from "vitepress";
import { default as config } from "../src/configs/config.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: config.title,
  description: config.desc,
  markdown: {
    theme: {
      light: "catppuccin-latte",
      dark: "catppuccin-mocha",
    },
  },
  themeConfig: {
    // 单独在 index.md 中修改主页图像
    logo: config.avatar,
    nav: [
      { text: "Posts", link: "/src/pages/posts" },
      { text: "Friends", link: "/src/pages/friends" },
    ],
    docFooter: {
      prev: "回忆",
      next: "继续探索",
    },
    aside: true,
    darkModeSwitchLabel: "时钟",
    lightModeSwitchTitle: "切换至白天",
    darkModeSwitchTitle: "切换至夜晚",
    sidebarMenuLabel: "地图",
    outlineTitle: "在此页上",
    returnToTopLabel: "回到重生点",
    socialLinks: [{ icon: "github", link: config.github }],
  },
});
