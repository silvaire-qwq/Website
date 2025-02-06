---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "孤银之窝"
  text: "Silvaire's Blog"
  tagline: 君埋泉下泥销骨，我寄人间雪满头。
  image: https://imgbed.lunars.site/file/1738488542780_184231508.jpeg
  actions:
    - theme: brand
      text: GitHub Account
      link: 'https://github.com/silvaire-qwq'
---



<script setup>
import { computed } from 'vue'
import { data } from '.vitepress/posts.data'

const { yearMap,postMap } = data
const yearList = Object.keys(yearMap).sort((a, b) => b - a);
const computedYearMap = computed(()=> {
  let result = {}
  for(let key in yearMap) {
    result[key] = yearMap[key].map(url => postMap[url])
  }
  return result
})
</script>

<style>
  div.postArchives {
    * {
      text-decoration: none;
      color: var(--vp-c-text-1);
    }
    div.numberAndYear {
      margin-top: 0px;
      margin-bottom: 60px;
    }
    div.year {
      display: none; /* Remove This Line to Enable Year(Num) and Divider */
      font-size: 60px;
      line-height: 64px;
      font-weight: 700;
      border-top: 1px solid var(--vp-c-divider);
      padding-top: 50px;
      margin-bottom: 25px;
    }
    section.oneYear {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-template-rows: repeat(auto-fill, 1fr);
      grid-gap: 10px;
    }
    article.onePost {
      box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
      border: 1px solid var(--vp-c-gutter);
      border-radius: 0.7rem;
      padding: 24px;
      height: 100%;
      &, * {
        transition: all 0.4s;
      }
      h1.icon {
        border-radius: 0.5rem;
        font-size: 40px;
        line-height: 44px;
        margin-bottom: 25px;
      }
      h1.title {
        font-size: 20px;
        line-height: 24px;
      }
      p.descriptions, p.time {
        margin: 0px;
        padding-top: 6px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 500;
        color: var(--vp-c-text-2);
      }
      p.time {
        padding-top: 0px;
        padding-bottom: 5px;
        color: var(--vp-c-text-3);
        opacity: 0.7;
      }
    }
    article.onePost:hover {
      box-shadow: var(--vp-c-brand-soft) 0px 12px 25px -5px, var(--vp-c-brand-soft) 0px 7px 7px -7px; 
      border: 1px solid var(--vp-c-brand-1);
      h1.title {
        color: var(--vp-c-brand-1);
      }  
    }
  }
</style>


<div class="postArchives">
  <div v-for="year in yearList" class="numberAndYear" :key="year" style="">
      <!-- 年（数字） -->
      <div v-text="year" class="year"></div>
      <!-- 一年的文章 -->
      <section class="oneYear">
        <a v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post" :href="article.url">
          <!-- 单个文章 -->
          <article class="onePost">
            <h1 class="icon" v-text="article.emoji"></h1>
            <p class="time" v-text="article.date.string"></p>
            <h1 class="title" v-text="article.title"></h1>
            <p class="descriptions" v-text="article.descriptions"></p>
          </article>
        </a>
    </section>
  </div>
</div>