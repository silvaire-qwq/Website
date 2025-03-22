<script setup>
import { computed } from "vue";
import { data } from "../../../.vitepress/posts.data";

const { yearMap, postMap } = data;
const yearList = Object.keys(yearMap).sort((a, b) => parseInt(b) - parseInt(a)); // 按年份降序排序
const computedYearMap = computed(() => {
  let result = {};
  for (let key in yearMap) {
    result[key] = yearMap[key].map((url) => postMap[url]);
  }
  return result;
});
</script>

<template>
  <spacer height="50px" />
  <div class="archives">
    <div v-for="year in yearList" :key="year" class="year-section">
      <div class="year-title">
        <span class="year-number" v-text="year"></span>
      </div>
      <div class="posts-grid">
        <a
          v-for="(article, index) in computedYearMap[year]"
          :key="index"
          class="post-card"
          :href="article.url"
        >
          <div class="post-content">
            <img
              :src="article.image"
              alt="Article Image"
              class="post-image"
              v-if="article.image"
            />
            <div class="post-details">
              <div class="post-date" v-text="article.date.string"></div>
              <div class="post-title" v-text="article.title"></div>
              <div class="post-description" v-text="article.descriptions"></div>
              <p class="tagList">
                <span
                  v-if="article.category"
                  class="oneCategory oneTag"
                  @mousedown.prevent.stop="selectCategory(article.category)"
                  @click.prevent.stop="selectCategory(article.category)"
                >
                  <Icon icon="fluent:folder-24-filled" width="14" height="21" />
                  {{ article.category }}
                </span>
                <span
                  class="oneTag"
                  v-if="article.tags"
                  v-for="tag in article.tags"
                  :key="tag"
                  @mousedown.prevent.stop="selectTag(tag)"
                  @click.prevent.stop="selectTag(tag)"
                >
                  <Icon
                    icon="fluent:number-symbol-24-filled"
                    width="14"
                    height="21"
                    style="margin-right: -2px"
                  />
                  {{ tag }}
                </span>
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives {
  .year-section {
    margin-bottom: 100px;
  }

  .year-title {
    display: flex;
    align-items: baseline;
    margin-bottom: 15px;
  }

  .year-number {
    color: transparent;
    -webkit-text-stroke: 1px var(--vp-c-gutter);
    font-size: 80px;
    line-height: 80px;
    font-weight: 700;
    z-index: -1;
    margin: 0 auto;
    margin-bottom: -35px;
  }

  .posts-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* 居中对齐 */
    gap: 10px;
  }

  .post-card {
    flex: 1 1 300px; /* 确保卡片在小屏幕上也能正常显示 */
    break-inside: avoid; /* 防止卡片被拆分 */
    text-decoration: none;
    border-radius: 1rem;
    border: 1px solid var(--vp-c-divider);
    transition: 0.4s;
    overflow: hidden;
    background-color: var(--vp-c-bg);
    box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
  }

  .post-card:hover {
    box-shadow: 0 4px 16px -4px var(--vp-c-brand-soft);
    border-color: var(--vp-c-brand-1);
  }

  .post-card:hover .post-title {
    color: var(--vp-c-brand-1) !important;
  }

  .post-image {
    object-fit: cover;
    height: 200px;
    width: 100%;
    border-bottom: 1px solid var(--vp-c-divider);
    transition: all 0.4s;
  }

  .post-details {
    padding: 24px;
  }

  .post-date {
    color: var(--vp-c-text-3);
    font-weight: 500;
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 24px;
    transition: color 0.4s;
  }

  .post-title {
    font-size: 20px;
    line-height: 24px;
    font-weight: 600;
    margin: 5px 0;
    color: var(--vp-c-text-1);
    transition: color 0.4s;
  }

  .post-title:hover {
    color: var(--vp-c-brand-1);
  }

  .post-description {
    color: var(--vp-c-text-3);
    margin-bottom: 5px;
    font-size: 14px;
    line-height: 24px;
  }

  p.tagList {
    margin: 0px;
    span.oneTag {
      color: var(--vp-c-text-3);
      margin-right: 8px;
      padding: 0px;
      transition: all 0.4s;
      opacity: 0.8;
    }
    span.oneTag:hover {
      color: var(--vp-c-brand-3);
    }
  }
}
</style>
