// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import { Icon } from '@iconify/vue'
import "@catppuccin/vitepress/theme/mocha/pink.css";
import FriendCard from "./vue/friend.vue"
import Comment from "./vue/giscus.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('Icon', Icon)
    app.component('FriendCard', FriendCard)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment),
    });
  },
} satisfies Theme
