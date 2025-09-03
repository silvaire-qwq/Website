<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
    <LinkCard
      v-for="link in sortedLinks"
      :key="link.link"
      :title="link.title"
      :desc="link.desc"
      :link="link.link"
      :img="link.img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkCard from "./LinkCard.vue";
import { links } from "../../config/friend";

// 判断类型：英文 / 中文 / 其他
function getCategory(title: string): number {
  if (/^[A-Za-z]/.test(title)) return 0; // 英文
  if (/^[\u4e00-\u9fff]/.test(title)) return 1; // 中文
  return 2; // 其他
}

const sortedLinks = computed(() => {
  const copy = [...links];

  // 特殊的 "添加友情链接"
  const special = copy.find((l) => l.title === "添加友情链接");
  const normal = copy.filter((l) => l.title !== "添加友情链接");

  // 按照分类 + locale 排序
  normal.sort((a, b) => {
    const ca = getCategory(a.title);
    const cb = getCategory(b.title);
    if (ca !== cb) return ca - cb;

    // 分类内排序
    if (ca === 0) {
      // 英文 A-Z
      return a.title.localeCompare(b.title, "en", { sensitivity: "base" });
    } else if (ca === 1) {
      // 中文 按拼音
      return a.title.localeCompare(b.title, "zh");
    } else {
      // fallback：直接按 Unicode 排
      return a.title.localeCompare(b.title);
    }
  });

  return special ? [...normal, special] : normal;
});
</script>
