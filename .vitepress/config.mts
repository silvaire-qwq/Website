import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config

export default defineConfig({
  title: "Silvaire's Blog",
  description: "明年此日青云去，却笑人间举子忙。",
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
    logo: 'https://imgbed.lunars.site/file/1732958150105_IMG_20241130_171502.jpg',
    docFooter: {
      prev: '回忆',
      next: '继续探索'
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
      { text: '手记', link: '/archives' },
      { text: '朋友们', link: '/friends' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/silvaire-qwq' }
    ],
  }
})
