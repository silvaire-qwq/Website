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
  div.doclist {
    @media only screen and (max-width: 600px) {
      .tags {
        display: none !important;
      }
    }
    .tags {
      display: inline;
      opacity: 1;
      transition: all .4s;
      color: var(--vp-c-text-3);
      margin-right: 7px;
      border-radius: .6em;
      float: right;
      opacity: 0.5;
      transition: all .4s;
      font-weight: 500;
    }
    .tags::before {
      content: '#';
      margin-right: 3px;
    }
    div.date {
        color: var(--vp-c-text-3);
        opacity: .5;
        transition: all .4s;
        font-weight: 500;
        letter-spacing: .4px;
        float: left;
        font-family: var(--vp-font-family-mono);
        margin-right: 10px;
    }
    .year {
      font-size: 50px;
      line-height: 70px;
      font-weight: 900;
      display: inline-block;
    }
    .one-post {
      display: block;
      border-radius: 1rem;
      height: 100%;
      transition: .4s;
    }
    .title {
      display: inline;
      font-weight: 600;
      transition: .4s;
      color: var(--vp-c-text-2) !important;
    }
    .farYear {
      margin-bottom: 30px;
    }
    .one-post:hover {
      .title {
        color: var(--vp-c-brand-1) !important;
        max-width: 100%;
      }
    }
    .one-post:hover .date {
        color: var(--vp-c-text-2);
        opacity: .8;
    }
    .stringdata {
      padding: 6px 15px;
    }
    .one-year {
      border-left: 1px solid var(--vp-c-gutter);
      margin-left: 10px;
    }
  }
</style>

<template>
    <div class="doclist">
    <div v-for="year in yearList" class="farYear" :key="year" style="">
        <div class="fullYear">
            <div v-text="year" class="year"></div>
        </div>
        <section class="one-year">
        <a v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post" :href="article.url">
            <div class="one-post">
            <div class="stringdata">
            <div v-text="article.date.string" class="date">
            </div>
            <div v-text="article.title" class="title">
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
