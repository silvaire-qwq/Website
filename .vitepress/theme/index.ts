// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { Icon } from "@iconify/vue";
import "../../src/styles/default.css";
import "../../src/styles/append.css";
import "@catppuccin/vitepress/theme/mocha/lavender.css";

// Components
import beforeDocs from "../../src/components/layout/before-docs.vue";
import FriendCard from "../../src/components/components/FriendCard.vue";
import PostList from "../../src/components/components/postList.vue"
import MusicCard from "../../src/components/components/MusicCard.vue"
import spacer from "../../src/components/components/spacer.vue";
import pt from "../../src/components/components/pt.vue";
import HomeLayout from "../../src/components/pages/home.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(beforeDocs),
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("Icon", Icon);
    app.component("FriendCard", FriendCard);
    app.component("PostList", PostList);
    app.component("MusicCard", MusicCard);
    app.component("spacer", spacer);
    app.component("pt", pt);
    app.component("HomeLayout", HomeLayout);
  },
} satisfies Theme;
