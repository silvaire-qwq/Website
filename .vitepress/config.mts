import { defineConfig } from 'vitepress'
import { default as webConfig } from "../config.json";

export default defineConfig({
  title: webConfig.title,
  description: webConfig.description,
  markdown: {
    image: {
      lazyLoading: true,
    },
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  },
  themeConfig: {
    logo: webConfig.logo,
    docFooter: {
      prev: '回忆',
      next: '继续探索'
    },
    footer: {
      message: '<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">本文采用 CC BY-NC-ND 4.0 进行许可</a>',
    },
    darkModeSwitchLabel: '时钟',
    lightModeSwitchTitle: '切换至白天',
    darkModeSwitchTitle: '切换至夜晚',
    sidebarMenuLabel: '地图',
    outlineTitle: '在此页上',
    returnToTopLabel: '回到重生点',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '朋友们', link: '/friends' },
    ],

    socialLinks: [
      { icon: 'github', link: webConfig.github }
    ],
  }
})
