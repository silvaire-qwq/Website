<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

// 从 .vitepress/posts.data.mts 中导入数据
import { data } from "../../../.vitepress/posts.data.mjs";

// Configs
import { default as config } from "../../../src/configs/config.json";

// 从数据中提取 tagMap
const tagMap = ref(data.tagMap);

// 用于存储当前选中的标签
const selectedTag = ref<string | null>(null);

// 当点击某个标签分类时，设置 selectedTag
const selectTag = (tag: string | null) => {
  selectedTag.value = tag;
};

// 所有文章
const { yearMap, postMap } = data;
const yearList = Object.keys(yearMap).sort((a, b) => parseInt(b) - parseInt(a));
const computedYearMap = computed(() => {
  let result: Record<string, any[]> = {};
  for (let key in yearMap) {
    result[key] = yearMap[key].map((url) => postMap[url]);
  }
  return result;
});

// 正数计时
const startDate = new Date(config.card.uptime); // 读取 config.json 的 startDate

const elapsedTime = ref(Date.now() - startDate.getTime());

const updateElapsedTime = () => {
  elapsedTime.value = Date.now() - startDate.getTime();
};

// 让 TypeScript 正确推导 setInterval 的返回值类型
let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  updateElapsedTime(); // 组件挂载时先计算一次
  interval = setInterval(updateElapsedTime, 1000);
});

// 组件销毁时清除定时器
onUnmounted(() => {
  if (interval) clearInterval(interval);
});

// 计算时间差
const uptime = computed(() => {
  const diff = elapsedTime.value;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${years} 年 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;
});
</script>

<template>
  <div class="announcement">
    <Icon
      icon="fluent:megaphone-loud-20-filled"
      width="20"
      height="20"
      style="margin-right: 10px; "
    />
    <span v-text="config.announcement"></span>
  </div>
  <div class="container">
    <div class="sidebar">
      <aside class="infos">
        <img :src="config.card.avatar" />
        <h1 v-text="config.card.name"></h1>
        <p v-text="config.card.desc"></p>
      </aside>
      <aside class="tagList">
        <h1 class="title">
          <Icon icon="fluent:book-number-16-filled" width="25" height="25" style="position: relative; bottom: -1px;"/> Tags
        </h1>
        <ul class="sidebar">
          <li class="tags">
            <button
              @click="selectTag(null)"
              class="allPostsButton"
              :class="{ selected: selectedTag === null }"
            >
              <span>All Posts</span>
            </button>
          </li>
          <li class="tags" v-for="(posts, tag) in tagMap" :key="tag">
            <button
              @click="selectTag(tag)"
              :class="{ selected: selectedTag === tag }"
            >
              {{ tag }} <span class="number">{{ posts.length }}</span>
              <!-- 显示每个分类下的文章数 -->
            </button>
          </li>
        </ul>
      </aside>
      <aside class="uptime">
        <h1 class="title">
          <Icon icon="fluent:clock-24-filled" width="25" height="25" /> Uptime
        </h1>
        <img :src="config.logo" />
        <strong class="name" v-text="config.title"></strong>
        <span v-text="uptime" class="uptime"></span>
      </aside>
    </div>
    <div class="main-content">
      <!-- 显示所有标签分类 -->
      <div>
        <ul class="topBar">
          <li class="tags">
            <button
              @click="selectTag(null)"
              class="allPostsButton"
              :class="{ selected: selectedTag === null }"
            >
              <span>All Posts</span>
            </button>
          </li>
          <li class="tags" v-for="(posts, tag) in tagMap" :key="tag">
            <button
              @click="selectTag(tag)"
              :class="{ selected: selectedTag === tag }"
            >
              {{ tag }} <span class="number">{{ posts.length }}</span>
              <!-- 显示每个分类下的文章数 -->
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
              <a
                v-for="(article, index2) in computedYearMap[year]"
                :key="index2"
                class="post"
                :href="article.url"
              >
                <!-- 单个文章 -->
                <article class="onePost">
                  <div v-if="article.image" class="imageContainer">
                    <img
                      :src="article.image"
                      :alt="article.title"
                      class="image"
                    />
                  </div>
                  <div class="textContainer">
                    <p class="time" v-text="article.date.string"></p>
                    <h1 class="title" v-text="article.title"></h1>
                    <p class="descriptions" v-text="article.descriptions"></p>
                    <p class="tagList">
                      <span
                        class="oneTag"
                        v-for="tag in article.tags"
                        :key="tag"
                        ><Icon icon="fluent:number-symbol-24-filled" width="14" height="21" style="margin-right: 2px;"/>{{ tag }}</span
                      >
                    </p>
                  </div>
                </article>
              </a>
            </section>
          </div>
        </div>
      </div>

      <!-- 如果没有选择分类，展示提示 -->
      <div v-else></div>
    </div>
  </div>
</template>

<style scoped>
/* 公告 */
div.announcement {
  border: 1px solid var(--vp-c-gutter);
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px,
    var(--vp-c-bg-elv) 0px 7px 15px -7px;
  border-radius: 12px;
  margin-bottom: 10px;
  font-size: 18px;
  padding: 15px 20px;
  transition: all .4s;
  &:hover {
    box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
      var(--vp-c-brand-soft) 0px 3px 7px -7px;
    border: 1px solid var(--vp-c-brand-1);
  }
}

/* Sidebar */

div.container {
  display: flex;
}

div.main-content {
  flex: 1;
  overflow: hidden;
}

div.sidebar {
  width: 300px;
  margin-right: 10px;
  aside {
    h1.title {
      color: var(--vp-c-gutter);
      font-size: 24px;
      line-height: 24px;
      margin-top: 4px;
      margin-bottom: 12px;
    }
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-gutter);
    box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px,
      var(--vp-c-bg-elv) 0px 7px 15px -7px;
    border-radius: 12px;
    padding: 20px 25px;
    transition: all 0.4s;
    margin-bottom: 10px;
    &:hover {
      box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
        var(--vp-c-brand-soft) 0px 3px 7px -7px;
      border: 1px solid var(--vp-c-brand-1);
    }
  }
}

aside.infos {
  img {
    padding: 20px;
    border-radius: 100%;
    aspect-ratio: 1;
    height: 250px;
    width: 250px;
    margin-bottom: 30px;
    margin-bottom: 0px;
    transition: all 0.4s;
  }
  img:hover {
    transform: scale(96%);
  }
  h1 {
    font-size: 24px;
    line-height: 30px;
  }
  p {
    margin: 0px;
    font-size: 13px;
    line-height: 18px;
    color: var(--vp-c-text-3);
    opacity: 0.8;
  }
}

aside.tagList {
  ul.sidebar button:hover {
    background-color: var(--vp-c-divider);
    color: var(--vp-c-brand-1);
  }
  ul.sidebar button.selected {
    background-color: var(--vp-c-brand-1);
    box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
      var(--vp-c-brand-soft) 0px 3px 7px -7px;
    &,
    span,
    span.number {
      color: var(--vp-c-bg) !important;
    }
  }
  ul.sidebar button {
    font-size: 17.5px;
    margin-right: 5px;
    padding: 3px 9px 3px 9px;
    border-radius: 7px;
    /*border: 1px solid var(--vp-c-divider);*/
    transition: all 0.4s;
    span.number {
      opacity: 0.6;
      display: inline-block;
      position: relative;
      top: -5px;
      left: -2px;
      line-height: 18px;
      font-size: 13px;
      margin: 0px;
    }
  }

  ul.sidebar button.selected {
    background-color: var(--vp-c-brand-1);
    box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
      var(--vp-c-brand-soft) 0px 3px 7px -7px;
    &,
    span,
    span.number {
      color: var(--vp-c-bg) !important;
    }
  }

  ul.sidebar span.number {
    color: var(--vp-c-text-3);
    margin: 3px;
  }

  ul.sidebar {
    list-style-type: none;
    margin: 0px;
    transition: all 0.4s;
    padding: 0px;
  }

  ul.sidebar li.tags {
    display: inline-block;
    margin-top: 3px;
    margin-bottom: 3px;
  }
}

aside.uptime {
  span.uptime {
    display: block;
    text-align: center;
    color: var(--vp-c-text-3);
    opacity: 0.8;
    font-size: 14px;
    line-height: 18px;
    margin-top: 2px;
  }
  strong.name {
    font-size: 20px;
    line-height: 28px;
    display: block;
    text-align: center;
  }
  img {
    border-radius: 100%;
    aspect-ratio: 1;
    padding: 4px;
    border: 1px solid var(--vp-c-divider);
    height: 70px;
    width: 70px;
    margin: 0 auto;
    margin-bottom: 5px;
    transition: all 0.4s;
  }
}

@media screen and (max-width: 700px) {
  div.sidebar {
    display: none;
  }
  ul.topBar {
    display: block;
  }
}

@media screen and (min-width: 700px) {
  div.sidebar {
    display: block;
  }
  ul.topBar {
    display: none;
  }
}

/* Main Content */

* {
  user-select: none;
}

/* 样式: 按钮和文章列表 */
ul.topBar button {
  font-size: 17.5px;
  padding: 3px 9px 3px 9px;
  border-radius: 7px;
  /*border: 1px solid var(--vp-c-divider);*/
  transition: all 0.4s;
  span.number {
    opacity: 0.6;
    display: inline-block;
    position: relative;
    top: -5px;
    left: -2px;
    line-height: 18px;
    font-size: 13px;
    margin: 0px;
  }
}

ul.topBar button:hover {
  background-color: var(--vp-c-divider);
  color: var(--vp-c-brand-1);
}

ul.topBar button.selected {
  background-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
    var(--vp-c-brand-soft) 0px 3px 7px -7px;
  &,
  span,
  span.number {
    color: var(--vp-c-bg) !important;
  }
}

ul.topBar span.number {
  color: var(--vp-c-text-3);
  margin: 3px;
}

ul.topBar {
  list-style-type: none;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px,
    var(--vp-c-bg-elv) 0px 7px 15px -7px;
  border: 1px solid var(--vp-c-gutter);
  padding: 10px;
  max-width: 900px;
  border-radius: 12px;
  margin: 0px auto;
  margin-bottom: 10px;
  transition: all 0.4s;
  max-height: 52px;
  overflow-x: auto;
}

ul.topBar:hover {
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
    var(--vp-c-brand-soft) 0px 3px 7px -7px;
  border: 1px solid var(--vp-c-brand-1);
}

.column {
  column-gap: 10px;
  column-width: 300px;
  column-count: auto;
}

ul.topBar li.tags {
  display: inline;
  margin-right: 1px;
  margin-top: 0px;
  white-space: nowrap !important;
}

article.onePost {
  margin: 0 auto;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px,
    var(--vp-c-bg-elv) 0px 7px 15px -7px;
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

p.descriptions,
p.time {
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
    color: var(--vp-c-text-3);
    margin-right: 10px;
    padding: 0px;
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

/*div.selected {
  margin-top: 10px;
}*/

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
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
    var(--vp-c-brand-soft) 0px 3px 7px -7px;
  border: 1px solid var(--vp-c-brand-1);
  h1.title {
    color: var(--vp-c-brand-1);
  }
}

article.onePost {
  h1.title {
    color: var(--vp-c-text-1);
    transition: all 0.4s;
  }
}
</style>
