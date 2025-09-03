<script lang="ts">
  import Icon from "@iconify/svelte";
  import { postData as posts } from "../config/posts.ts";

  let keyword = ""; // 搜索关键词
  let result: any[] = []; // 搜索结果
  let panelOpen = false; // 面板显示状态

  // 切换面板状态
  const togglePanel = () => {
    console.log("Toggling panel. Current state:", panelOpen);
    panelOpen = !panelOpen;
  };

  // 核心搜索逻辑
  const search = (kw: string) => {
    console.log("Search triggered with keyword:", kw);

    const k = kw.trim().toLowerCase();
    if (!k) {
      console.log("No keyword, clearing results");
      result = [];
      return;
    }

    const regex = new RegExp(`(${k})`, "gi");
    result = posts
      .map((item) => {
        const titleHighlighted = item.title.replace(regex, "‎" + "<mark>$1</mark>" + "‎");
        const fullText = (item.description + " " + item.content).replace(/\n/g, " ");
        const idx = fullText.toLowerCase().indexOf(k);
        if (idx === -1) return null;
        const start = Math.max(0, idx - 50);
        const end = Math.min(fullText.length, idx + k.length + 50);
        const excerpt = fullText.slice(start, end).replace(regex, "<mark>$1</mark>");
        return { ...item, titleHighlighted, excerpt };
      })
      .filter(Boolean);

    console.log("Search results:", result);
  };

  // 每次输入时触发搜索
  $: {
    if (keyword) {
      search(keyword);
      if (keyword.trim()) panelOpen = true;
    } else {
      result = [];
      panelOpen = false;
    }
  }

  // 失去焦点时检查是否有内容
const handleBlur = () => {
  if (!keyword.trim()) {
    panelOpen = false; // 没有内容时关闭面板
  }
};

// 聚焦时，若有内容，确保面板打开
const handleFocus = () => {
  if (keyword.trim() && !panelOpen) {
    panelOpen = true; // 确保有内容时面板打开
  }
};

</script>

<!-- 搜索按钮：点击打开面板 -->
<button
  on:click={togglePanel}
  aria-label="Search Panel"
  id="search-switch"
  class="btn-plain scale-animation rounded-lg w-11 h-11 active:scale-90"
>
  <Icon icon="material-symbols:search" class="text-[1.25rem]" />
</button>

<!-- 搜索面板 -->
{#if panelOpen}
  <div
    id="search-panel"
    class="search-panel absolute md:w-[30rem] top-20 left-4 md:left-[unset] right-4 shadow-2xl rounded-2xl p-2"
  >
    <!-- 搜索框 -->
    <div
      id="search-bar-inside"
      class="flex relative transition-all items-center h-11 rounded-xl
        bg-black/[0.04] hover:bg-black/[0.06] focus-within:bg-black/[0.06]
        dark:bg-white/5 dark:hover:bg-white/10 dark:focus-within:bg-white/10"
    >
      <Icon
        icon="material-symbols:search"
        class="absolute text-[1.25rem] pointer-events-none ml-3 my-auto text-black/30 dark:text-white/30"
      />
      <input
        placeholder="Search"
        bind:value={keyword}
        class="pl-10 absolute inset-0 text-sm bg-transparent outline-0 focus:w-60 text-black/50 dark:text-white/50"
        on:blur={handleBlur}
        on:focus={handleFocus}
      />
    </div>

    <!-- 搜索结果 -->
    {#if panelOpen && result.length > 0}
      {#each result as item}
        <a
          href={item.url}
          class="transition first-of-type:mt-2 group block
           rounded-xl text-lg px-3 py-2 hover:bg-[var(--btn-plain-bg-hover)] active:bg-[var(--btn-plain-bg-active)]"
        >
          <div class="transition text-90 inline-flex font-bold group-hover:text-[var(--primary)]">
            {@html item.titleHighlighted}
            <Icon
              icon="fa6-solid:chevron-right"
              class="transition text-[0.75rem] translate-x-1 my-auto text-[var(--primary)]"
            />
          </div>
          <div class="transition text-sm text-50">{@html item.excerpt}</div>
        </a>
      {/each}
      {/if}
  </div>
{/if}

<style>
.search-panel {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  background-color: var(--float-panel-bg);
}
</style>
