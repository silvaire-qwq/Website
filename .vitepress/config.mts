import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Silvaire_qwq's Blog",
  description: "明年此日青云去，却笑人间举子忙。",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  },
  themeConfig: {
    docFooter: {
      prev: '回忆',
      next: '继续探索'
    },
    darkModeSwitchLabel: '时钟',
    lightModeSwitchTitle: '切换至白天',
    darkModeSwitchTitle: '切换至夜晚',
    sidebarMenuLabel: '地图',
    returnToTopLabel: '回到重生点',
    search: {
      provider: 'local',
            options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '笔记本', link: '/notes' },
      { text: '朋友们', link: '/friends' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/silvaire-qwq' }
    ]
  }
})
