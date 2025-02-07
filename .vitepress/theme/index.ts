// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import "../../src/styles/default.css";
import '../../src/styles/append.css';
import "@catppuccin/vitepress/theme/mocha/lavender.css";


// Components
import beforeDocs from "../../src/components/layout/before-docs.vue";
import FriendCard from "../../src/components/components/FriendCard.vue"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(beforeDocs),
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component("FriendCard", FriendCard);
  }
} satisfies Theme
