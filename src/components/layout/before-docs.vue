<template>
  <div class="vp-doc layout beforeDocs">
    <div v-if="frontmatter.image" class="image-container">
      <img :src="frontmatter.image" alt="文章顶部图片" class="image" />
    </div>
    <div class="textArea">
      <p class="time">创建于 {{ $frontmatter.date }}</p>
      <h1 class="title">{{ $frontmatter.title }}</h1>
      <p class="desc">{{ $frontmatter.descriptions }}</p>
      <!-- 新增标签显示区域 -->
      <div class="tags" v-if="frontmatter.tags">
        <span v-for="(tag, index) in frontmatter.tags" :key="index" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress';
const { page } = useData();
const frontmatter = page.value.frontmatter;
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
  .tag {
    color: var(--vp-c-text-2);
    margin-right: 4px;
    border: 1px solid var(--vp-c-gutter);
    background: var(--vp-c-divider);
    padding: 2px 7px;
    border-radius: 6px;
  }
}
</style>
