<template>
  <div class="vp-doc layout beforeDocs">
    <div v-if="frontmatter.image" class="image-container">
      <img :src="frontmatter.image" alt="文章顶部图片" class="image" />
    </div>
    <div class="textArea">
      <p class="time">创建于{{ formatDate(frontmatter.date) }}<br>最后修改于{{ formatDate(frontmatter.modify, true) }}</p>
      <h1 class="title">{{ frontmatter.title }}</h1>
      <p class="desc">{{ frontmatter.descriptions }}</p>
      <!-- 新增标签显示区域 -->
      <div class="tags" v-if="frontmatter.tags">
        <span class="category tag" v-if="frontmatter.category">
          <a :href="`/?category=${frontmatter.category}`">
            <Icon icon="fluent:folder-24-filled" width="14" height="21" />
            {{ frontmatter.category }}
          </a>
        </span>

        <span v-for="(tag, index) in frontmatter.tags" :key="index" class="tag">
          <a :href="`/?tag=${tag}`">
            <Icon
              icon="fluent:number-symbol-24-filled"
              width="14"
              height="21"
              style="margin-right: -2px"
            />
            {{ tag }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
const { page } = useData();
const frontmatter = page.value.frontmatter;

function formatDate(raw, isModified = false) {
  const date = new Date(raw);

  // 获取星期、日期、月份和年份
  const day = date.toLocaleString("zh-CN", { day: "numeric" });
  const month = date.toLocaleString("zh-CN", { month: "short" });
  const year = `${date.getFullYear()}`;

  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let displayDate;
  if (diffDays === 0) {
    displayDate = isModified ? "今天" : "今天";
  } else if (diffDays === 1) {
    displayDate = isModified ? "昨天" : "昨天";
  } else if (diffDays === 2) {
    displayDate = isModified ? "前天" : "前天";
  } else if (date.getFullYear() === now.getFullYear()) {
    displayDate = isModified ? `修改于${month}${day}` : `${month}${day}`;
  } else {
    displayDate = isModified ? `修改于${year}年${month}${day}` : `${year}年${month}${day}`;
  }

  return displayDate;
}
</script>

<style scoped>
div.vp-doc.layout.beforeDocs {
  /* 提高文字区域的空间 */
  .textArea {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  /* image */
  img.image {
    border: 1px solid var(--vp-c-gutter);
    height: 350px;
    width: 100%;
    object-fit: cover;
    border-radius: 0.65rem;
  }

  /* Time */
  p.time {
    color: var(--vp-c-gutter);
    font-weight: 500;
    margin-bottom: 7px;
  }

  /* Descriptions */
  p.desc {
    margin: 7px 0 0 0;
    color: var(--vp-c-text-3);
    font-weight: 500;
  }

  /* Tags */
  .tags {
    margin-top: 13px;
  }
  .tag a {
    margin-right: 12px;
    padding: 0px;
    border-radius: 6px;
  }
  .tag a:hover {
    color: var(--vp-c-brand-3) !important;
  }
  .tag a:not(:hover) {
    color: var(--vp-c-text-3) !important;
    opacity: 0.8;
  }
}
</style>