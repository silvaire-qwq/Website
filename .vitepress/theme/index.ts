// https://vitepress.dev/guide/custom-theme
import { h, onMounted, ref, watch } from "vue";
import type { Theme } from "vitepress";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { Converter } from "opencc-js";
import "../../src/styles/default.css";
import "../../src/styles/append.css";
import "@catppuccin/vitepress/theme/mocha/pink.css";

// Components
import beforeDocs from "../../src/components/layout/before-docs.vue";
import FriendCard from "../../src/components/components/FriendCard.vue";
import PostList from "../../src/components/components/postList.vue"

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(beforeDocs),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("FriendCard", FriendCard);
    app.component("PostList", PostList)
  },
} satisfies Theme;
