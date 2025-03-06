<script setup lang="ts">
import { ref } from 'vue'
import { computed } from 'vue'

// 从 .vitepress/posts.data.mts 中导入数据
import { data } from '../../../.vitepress/posts.data.mjs'

// 从数据中提取 tagMap
const tagMap = ref(data.tagMap)

// 用于存储当前选中的标签
const selectedTag = ref<string | null>(null)

// 当点击某个标签分类时，设置 selectedTag
const selectTag = (tag: string | null) => {
  selectedTag.value = tag
}

// 所有文章
const { yearMap, postMap } = data
const yearList = Object.keys(yearMap).sort((a, b) => parseInt(b) - parseInt(a));
const computedYearMap = computed(() => {
  let result: Record<string, any[]> = {}
  for (let key in yearMap) {
    result[key] = yearMap[key].map(url => postMap[url])
  }
  return result
})
</script>

<template>
    <div>
    <!-- 显示所有标签分类 -->
    <div class="tagSpacer"></div>
    <div>
        <ul>
        <li class="tags">
            <button 
            @click="selectTag(null)"
            class="allPostsButton"
            :class="{'selected': selectedTag === null}">
            <span>所有文章</span>
            </button>
        </li>
        <li class="tags" v-for="(posts, tag) in tagMap" :key="tag">
            <button 
            @click="selectTag(tag)"
            :class="{'selected': selectedTag === tag}">
            {{ tag }} <span class="number">{{ posts.length }}</span> <!-- 显示每个分类下的文章数 -->
            </button>
        </li>
        </ul>
    </div>

    <!-- 如果选择了某个标签分类，显示该分类下的文章 -->
    <div v-if="selectedTag" class="selected">
        <div class="list" v-for="post in tagMap[selectedTag]" :key="post.url">
            <a :href="post.url" style="color: var(--vp-c-text)">
            <article class="onePost">
                <div v-if="post.image" class="imageContainer">
                    <img :src="post.image" :alt="post.title" class="image" />
                </div>
                <div class="textContainer">
                <p class="time" v-text="post.date.string"></p>
                <h1 class="title" v-text="post.title"></h1>
                <p class="descriptions" v-text="post.descriptions"></p>
                </div>
            </article>
            </a>
        </div>
    </div>

    <!-- 如果选择了 "所有文章"，显示所有文章 -->
    <div v-if="selectedTag === null" class="selected">
        <div class="postArchives">
        <div v-for="year in yearList" class="numberAndYear" :key="year">
            <div v-text="year" class="yearNumber"></div>
            <!-- 一年的文章 -->
            <section class="oneYear">
            <a v-for="(article, index2) in computedYearMap[year]" :key="index2" class="post" :href="article.url">
                <!-- 单个文章 -->
                <article class="onePost">
                <div v-if="article.image" class="imageContainer">
                    <img :src="article.image" :alt="article.title" class="image" />
                </div>
                <div class="textContainer">
                    <p class="time" v-text="article.date.string"></p>
                    <h1 class="title" v-text="article.title"></h1>
                    <p class="descriptions" v-text="article.descriptions"></p>
                    <p class="tagList">
                    <span class="oneTag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
                    </p>
                </div>
                </article>
            </a>
            </section>
        </div>
        </div>
    </div>

    <!-- 如果没有选择分类，展示提示 -->
    <div v-else>
    </div>
    </div>
</template>

<style scoped>
* {
  user-select: none;
}

div.tagSpacer {
  margin-top: 30px;
}

/* 样式: 按钮和文章列表 */
button {
  font-size: 17.5px;
  padding: 3px 9px 3px 9px;
  border-radius: 7px;
  /*border: 1px solid var(--vp-c-divider);*/
  transition: all .4s;
  span.number {
    opacity: .6;
    display: inline-block;
    position: relative;
    top: -5px;
    left: -2px;
    line-height: 18px;
    font-size: 13px;
    margin: 0px;
  }
}

button:hover {
  border-color: var(--vp-c-brand-1);
}

button.selected {
  background-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px, var(--vp-c-brand-soft) 0px 3px 7px -7px; 
  &, span, span.number {
    color: var(--vp-c-bg) !important;
  }
}

span.number {
  color: var(--vp-c-text-3);
  margin: 3px;
}

ul {
  list-style-type: none;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
  border: 1px solid var(--vp-c-gutter);
  padding: 10px;
  max-width: 900px;
  border-radius: 12px;
  margin: 0px auto;
  transition: all .4s;
}

ul:hover {
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px, var(--vp-c-brand-soft) 0px 3px 7px -7px; 
  border: 1px solid var(--vp-c-brand-1);
}

.column {
  column-gap: 10px;
  column-width: 300px;
  column-count: auto;
}

li.tags {
  display: inline-block;
  margin-right: 1px;
  margin-top: 0px;
}

article.onePost {
  margin: 0 auto;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
  border: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  border-radius: 12px;
  height: 100%;
  max-width: 900px;
  break-inside: avoid !important;
  margin-bottom: 10px;
  transition: all 0.4s;
}

h1.title {
  font-size: 20px;
  line-height: 24px;
}

p.descriptions, p.time {
  margin: 0;
  padding-top: 6px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

p.time {
  padding-top: 0;
  padding-bottom: 5px;
  color: var(--vp-c-text-3);
  opacity: 0.7;
}

p.tagList {
  margin: 8px 0px 0px 0px;
  span.oneTag {
    color: var(--vp-c-text-2);
    margin-right: 4px;
    border: 1px solid var(--vp-c-gutter);
    background: var(--vp-c-divider);
    padding: 2px 7px;
    border-radius: 6px;
  }
}

div.imageContainer {
  img.image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid var(--vp-c-gutter);
  }
}

div.textContainer {
  padding: 24px;
}

div.selected {
  margin-top: 10px;
}

div.yearNumber {
  text-align: center;
  font-size: 80px;
  line-height: 84px;
  font-weight: 700;
  color: transparent;
  -webkit-text-stroke: 1px var(--vp-c-gutter);
  margin-bottom: -25px;
  z-index: -1;
  position: relative;
  /* Disable it */
  display: none;
}

div.postArchives {
  * {
    text-decoration: none;
  }
  div.numberAndYear {
    margin-bottom: 60px;
  }
}

section.oneYear {
  display: column;
  /*column-template-columns: repeat(auto-fill, minmax(300px, 1fr));*/
  column-gap: 10px;
}

article.onePost .icon {
  border-radius: 5px;
  font-size: 40px;
  line-height: 44px;
  margin-bottom: 25px;
}

article.onePost:hover {
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px, var(--vp-c-brand-soft) 0px 3px 7px -7px; 
  border: 1px solid var(--vp-c-brand-1);
  h1.title {
    color: var(--vp-c-brand-1);
  }
}

article.onePost {
  h1.title {
    color: var(--vp-c-text-1);
    transition: all .4s;
  }
}

</style>
