---
layout: home
title: 手记
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
    margin-top: 70px;
    .year {
      font-size: 100px;
      color: transparent; 
      font-weight: bolder;
      -webkit-text-stroke: 1px var(--vp-c-divider); 
    }
    .one-post {
      display: block;
      margin-bottom: 13px;
      align-items: center;
      justify-content: space-between;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .post {
      margin-left: 30px;
    }
    .title {
      transition: .4s;
      color: var(--vp-c-text-1) !important;
    }
    .title:hover {
      color: var(--vp-c-brand-1) !important;
      max-width: 100%;
    }
    .one-post:hover {
      .date {
        color: var(--vp-c-text-1);
        opacity: 1;
      }
    }
    .date {
      display: inline;
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
  <div v-for="year in yearList" :key="year" style="margin-top: 30px;">
    <div v-text="year" class="year"></div>
    <div v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post">
        <div class="one-post">
          <div v-text="article.date.string" class="date">
          </div>
          <a v-text="article.title" :href="article.url" class="title">
          </a>
        </div>
    </div>
  </div>
</div>