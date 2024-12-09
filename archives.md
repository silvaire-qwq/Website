---
layout: home
title: 手记
footer: false
---

<script setup>
import { computed } from 'vue'
import { data } from './.vitepress/theme/posts.data'

const { yearMap,postMap } = data
const yearList = Object.keys(yearMap).sort((a, b) => b - a); // 按年份降序排序
const computedYearMap = computed(()=> {
  let result = {}
  for(let key in yearMap) {
    result[key] = yearMap[key].map(url => postMap[url])
  }
  return result
})
</script>

<style>
  .archives {
    .year {
      display: none;
    }
    .one-post {
      display: block;
      padding: 25px 27px;
      border-radius: 1.3rem;
      border: 1px solid var(--vp-c-divider);
      margin: 16px 0px 0px 0px;
      transition: .4s;
    }
    .post {
    }
    .description {
      color: var(--vp-c-text-3);
      margin-bottom: 12px;
    }
    .title {
      font-size: 28px;
      display: block;
      margin: 7px 0px 15px 0px;
      line-height: 32px;
      transition: .4s;
      color: var(--vp-c-text-1) !important;
    }
    .title:hover {
      color: var(--vp-c-brand-1) !important;
      max-width: 100%;
    }
    .one-post:hover {
      .title {
        color: var(--vp-c-brand-1) !important;
        max-width: 100%;
      }
      box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
      border: 1px solid var(--vp-c-brand-1);
    }
    .date {
      display: block;
      transition: .4s;
      color: var(--vp-c-text-3);
      opacity: .7;
      font-family: var(--vp-font-family-mono);
      font-weight: 500;
      margin-right: 8px;
    }
  }
</style>

<div class="archives">
  <div v-for="year in yearList" class="one-year" :key="year" style="">
    <div v-text="year" class="year"></div>
    <a v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post" :href="article.url">
        <div class="one-post">
          <div v-text="article.title" class="title">
          </div>
          <div v-text="article.description" class="description">
          </div>
          <div v-text="article.date.string" class="date">
          </div>
        </div>
    </a>
  </div>
</div>