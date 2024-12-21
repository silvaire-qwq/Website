<script setup>
import { computed } from 'vue'
import { data } from '../../posts.data'

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
  div.archives {
    .one-year {
      column-gap: 12px;
      column-width: 300px;
      column-count: auto;
    }
    .year {
      font-size: 50px;
      line-height: 70px;
      font-weight: 900;
      margin-bottom: 15px;
      display: inline-block;
    }
    .yearChinese {
      display: inline-block;
      font-size: 25px;
      line-height: 70px;
      font-weight: 900;
      margin-bottom: 15px;
      margin-left: 5px;
    }
    .one-post {
      margin-bottom: 12px;
      break-inside: avoid !important;
      border-radius: 1rem;
      border: 1px solid var(--vp-c-divider);
      height: 100%;
      transition: .4s;
    }
    .description {
      color: var(--vp-c-text-3);
      margin-bottom: 20px;
    }
    .title {
      font-size: 28px;
      display: block;
      font-weight: 600;
      margin: 7px 0px 9px 0px;
      line-height: 32px;
      transition: .4s;
      color: var(--vp-c-text-1) !important;
    }
    .farYear {
      margin-bottom: 100px;
    }
    .one-post:hover {
      .title {
        color: var(--vp-c-brand-1) !important;
        max-width: 100%;
      }
      box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
      border: 1px solid var(--vp-c-brand-1);
      transform: scale(99%);
    }
    .date {
      transition: .4s;
      color: var(--vp-c-text-3);
      font-weight: 500;
      display: inline;
      margin-right: 8px;
    }
    .tags {
      display: inline;
      opacity: 1;
      transition: all .4s;
      color: var(--vp-c-text-3);
      margin-right: 7px;
      border-radius: .6em;
      font-weight: 500;
      opacity: .7;
    }
    .tags::before {
      content: '#';
      margin-right: 3px;
    }
    .stringdata {
      padding: 25px;
    }
    .icon {
      display: inline; 
      margin-right: 5px;
      color: var(--vp-c-text-3);
      opacity: .7;
      font-weight: 500;
    }
    p.readMore {
      color: var(--vp-c-brand-1);
      margin-bottom: 0px;
      transition: all .4s;
    }
    img {
      object-fit: cover;
      height: 200px;
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      width: 100%;
      transition: all .4s;
      border-bottom: 1px solid var(--vp-c-divider);
    }
  }
</style>

<template>
    <div class="archives">
    <div v-for="year in yearList" class="farYear" :key="year" style="">
        <div v-text="year" class="year"></div>
        <div class="yearChinese">年</div>
        <section class="one-year">
        <a v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post" :href="article.url">
            <div class="one-post">
            <img :src="article.img">
            <div class="stringdata">
            <div v-text="article.date.string" class="date">
            </div>
            <div v-text="article.title" class="title">
            </div>
            <div v-text="article.description" class="description">
            </div>
            <div v-for="(tag,i) in article.tags" v-text="tag" class="tags">
            </div>
            <!--<p class="readMore">开始阅读 -></p>-->
            </div>
          </div>
        </a>
      </section>
    </div>
    </div>
</template>
