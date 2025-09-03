<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { onMount } from "svelte";
import { postData as posts } from "../config/posts.ts";

let keywordDesktop = "";
let keywordMobile = "";
let result: any[] = [];
let isSearching = false;
let initialized = false;

const togglePanel = () => {
  const panel = document.getElementById("search-panel");
  panel?.classList.toggle("float-panel-closed");
};

const setPanelVisibility = (show: boolean, isDesktop: boolean): void => {
  const panel = document.getElementById("search-panel");
  if (!panel || !isDesktop) return;
  show ? panel.classList.remove("float-panel-closed") : panel.classList.add("float-panel-closed");
};

// 搜索函数：匹配 title、description 和 content，并显示上下文
const search = (keyword: string, isDesktop: boolean): void => {
  const k = keyword.trim().toLowerCase();
  if (!k) {
    result = [];
    setPanelVisibility(false, isDesktop);
    return;
  }

  isSearching = true;
  const regex = new RegExp(`(${k})`, "gi");

  result = posts
    .map(item => {
      // 高亮 title
      const titleHighlighted = item.title.replace(regex, "<mark>$1</mark>");

      // 在 description + content 中搜索关键字
      const fullText = (item.description + " " + item.content).replace(/\n/g, " ");

      const match = fullText.match(regex);
      let excerpt = "";
      if (match) {
        // 获取第一个匹配位置
        const idx = fullText.toLowerCase().indexOf(k);
        // 截取前后 50 个字符作为上下文
        const start = Math.max(0, idx - 50);
        const end = Math.min(fullText.length, idx + k.length + 50);
        excerpt = fullText.slice(start, end).replace(regex, "<mark>$1</mark>");
        if (start > 0) excerpt = excerpt;
        if (end < fullText.length) excerpt = excerpt;
      }

      return {
        ...item,
        titleHighlighted,
        excerpt,
      };
    })
    .filter(item => item.excerpt); // 只保留有匹配的文章

  setPanelVisibility(result.length > 0, isDesktop);
  isSearching = false;
};


onMount(() => {
  initialized = true;
  if (keywordDesktop) search(keywordDesktop, true);
  if (keywordMobile) search(keywordMobile, false);
});

// 实时搜索
$: if (initialized && keywordDesktop) search(keywordDesktop, true);
$: if (initialized && keywordMobile) search(keywordMobile, false);
</script>

<!-- UI 保持不变 -->
<div id="search-bar" class="hidden lg:flex transition-all items-center h-11 mr-2 rounded-lg
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">
  <Icon icon="material-symbols:search" class="absolute text-[1.25rem] pointer-events-none ml-3 my-auto text-black/30 dark:text-white/30" />
  <input placeholder="{i18n(I18nKey.search)}" bind:value={keywordDesktop}
         class="transition-all pl-10 text-sm bg-transparent outline-0
         h-full w-40 active:w-60 focus:w-60 text-black/50 dark:text-white/50" />
</div>

<button on:click={togglePanel} aria-label="Search Panel" id="search-switch"
        class="btn-plain scale-animation lg:!hidden rounded-lg w-11 h-11 active:scale-90">
  <Icon icon="material-symbols:search" class="text-[1.25rem]" />
</button>

<div id="search-panel" class="float-panel float-panel-closed search-panel absolute md:w-[30rem]
top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2">
  <div id="search-bar-inside" class="flex relative lg:hidden transition-all items-center h-11 rounded-xl
      bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
      dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10">
    <Icon icon="material-symbols:search" class="absolute text-[1.25rem] pointer-events-none ml-3 my-auto text-black/30 dark:text-white/30" />
    <input placeholder="Search" bind:value={keywordMobile} class="pl-10 absolute inset-0 text-sm bg-transparent outline-0
           focus:w-60 text-black/50 dark:text-white/50" />
  </div>

  {#each result as item}
    <a href={item.url}
       class="transition first-of-type:mt-2 lg:first-of-type:mt-0 group block
       rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]">
      <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
        {@html item.titleHighlighted}<Icon icon="fa6-solid:chevron-right" class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]" />
      </div>
      <div class="transition text-sm text-50">{@html item.excerpt}</div>
    </a>
  {/each}
</div>

<style>
.search-panel {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
</style>
