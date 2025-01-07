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
    aside: true,
    footer: {
      message: '<span id="busuanzi_value_site_uv"></span> 个请求者<br>由 <a href="https://vitepress.dev/"> VitePress</a> 与 <a href="https://github.com/silvaire-qwq/Website">Silvaire\'s Blog</a> 强力驱动<br><a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">采用 CC BY-NC-ND 4.0 进行许可</a>',
    },
    darkModeSwitchLabel: '时钟',
    lightModeSwitchTitle: '切换至白天',
    darkModeSwitchTitle: '切换至夜晚',
    sidebarMenuLabel: '地图',
    outlineTitle: '在此页上',
    returnToTopLabel: '回到重生点',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Posts', link: '/pages/reads/post' },
        { text: 'Friends', link: '/pages/others/friends' },
        { text: 'Board', link: '/pages/others/msg' },
    ],

    socialLinks: [
      { icon: 'github', link: webConfig.github }
    ],
  }
})
