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
      message: '由 <a href="https://github.com/silvaire-qwq/Website">Silvaire\'s Blog</a> 强力驱动<br><a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">采用 CC BY-NC-ND 4.0 进行许可</a>',
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
      {
        text: '阅读',
        items: [
          { text: '文章', link: '/pages/reads/post' },
          { text: '时光', link: '/pages/reads/list' },
          { text: '动态', link: '/pages/reads/light' },
        ]
      },
      { text: '其他', 
        items: [
          { text: '歌单', link: '/pages/others/music' },
          { text: '朋友们', link: '/pages/others/friends' },
          { text: '留言板', link: '/pages/others/msg' },
          { text: '关于我', link: '/pages/others/about' },
        ] 
      }
    ],

    socialLinks: [
      { icon: 'github', link: webConfig.github }
    ],
  }
})
