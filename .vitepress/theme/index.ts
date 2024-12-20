// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'
import './style.css'
import "@catppuccin/vitepress/theme/mocha/lavender.css";
import FriendCard from "./vue/pages/friend.vue"
import Comment from "./vue/vp/giscus.vue"
import Title from "./vue/vp/before-doc.vue"
import Archives from "./vue/pages/archives.vue"
import HomePage from "./vue/pages/index.vue"

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('Icon', Icon)
    app.component('FriendCard', FriendCard)
    app.component('Archives', Archives)
    app.component('HomePage', HomePage)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment),
      'doc-before': () => h(Title),
    });
  },
} satisfies Theme
