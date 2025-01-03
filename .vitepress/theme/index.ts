// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'


// Theme
import './custom.css'
import './index.css'
import "@catppuccin/vitepress/theme/mocha/lavender.css";

// TypeScript
import './ts/busuanzi.ts'

// Comps
import FriendCard from "./vue/pages/friend.vue"
import Comment from "./vue/vp/giscus.vue"
import Title from "./vue/vp/before-doc.vue"
import Archives from "./vue/pages/archives.vue"
import VPBtn from "./vue/pages/btn.vue"
import light from './vue/pages/light.vue'
import msg from './vue/pages/msg.vue'
import musicCard from './vue/pages/music-card.vue'

export default {
  enhanceApp({ app, router, siteData }) {
    app.component('Icon', Icon)
    app.component('FriendCard', FriendCard)
    app.component('Archives', Archives)
    app.component('VPBtn', VPBtn)
    app.component('MusicCard', musicCard)
    app.component('Light', light)
    app.component('MsgBoard', msg)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Comment),
      'doc-before': () => h(Title),
    });
  },
} satisfies Theme
