<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { data } from "../../../.vitepress/posts.data.mjs";
import config from "../../../src/configs/config.json";
import moments from "../../../src/configs/moments.json";

const tagMap = ref(data.tagMap);
const categoryMap = ref(data.categoryMap);
const selectedTag = ref<string | null>(null);
const selectedCategory = ref<string | null>(null);

const currentPage = ref(1);
const postsPerPage = 10;

const selectTag = (tag: string | null) => {
  selectedTag.value = tag;
  selectedCategory.value = null; // 清除选中的分类
  currentPage.value = 1; // 重置页码
  const url = new URL(window.location.href);
  if (tag) {
    url.searchParams.set("tag", tag);
    url.searchParams.delete("category");
  } else {
    url.searchParams.delete("tag");
  }
  window.history.replaceState(null, "", url.toString());
};

const selectCategory = (category: string | null) => {
  selectedCategory.value = category;
  selectedTag.value = null; // 清除选中的标签
  currentPage.value = 1; // 重置页码
  const url = new URL(window.location.href);
  if (category) {
    url.searchParams.set("category", category);
    url.searchParams.delete("tag");
  } else {
    url.searchParams.delete("category");
  }
  window.history.replaceState(null, "", url.toString());
};

const { yearMap, postMap } = data;
const yearList = Object.keys(yearMap).sort((a, b) => parseInt(b) - parseInt(a));
const computedYearMap = computed(() => {
  let result: Record<string, any[]> = {};
  for (let key in yearMap) {
    result[key] = yearMap[key].map((url) => postMap[url]);
  }
  return result;
});

// 将所有文章扁平化成一个列表，按年份降序排列
const allPosts = computed(() => {
  let posts: any[] = [];
  yearList.forEach((year) => {
    posts = posts.concat(computedYearMap.value[year]);
  });
  return posts;
});

// 根据选择的分类、tag或全部文章进行过滤
const filteredPosts = computed(() => {
  if (selectedCategory.value) {
    return categoryMap.value[selectedCategory.value] || [];
  } else if (selectedTag.value) {
    return tagMap.value[selectedTag.value] || [];
  } else {
    return allPosts.value;
  }
});

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

const postCount = computed(() => {
  return `共撰写 ${filteredPosts.value.length} 篇文章`;
});

const startDate = new Date(config.card.uptime);
const elapsedTime = ref(Date.now() - startDate.getTime());
const updateElapsedTime = () => {
  elapsedTime.value = Date.now() - startDate.getTime();
};

const latestMoment = computed(() => {
  const now = new Date();
  const latestMoment = moments[0];
  const momentDate = new Date(latestMoment.date);
  const diffTime = now.getTime() - momentDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 2) {
    return `${latestMoment.content}`;
  } else {
    return config.card.desc;
  }
});

let interval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  updateElapsedTime();
  const urlParams = new URLSearchParams(window.location.search);
  const tagFromUrl = urlParams.get("tag");
  const categoryFromUrl = urlParams.get("category");
  if (tagFromUrl) {
    selectedTag.value = tagFromUrl;
  } else if (categoryFromUrl) {
    selectedCategory.value = categoryFromUrl;
  }
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const uptime = computed(() => {
  const diff = elapsedTime.value;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return `诞生于 ${days} 天前`;
});

// 分页操作方法
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const displayPages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = currentPage.value;

  // 如果总页数较少，直接显示所有页码
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    // 设置中间连续页码的起始与结束（当前页左右各一页）
    const startPage = Math.max(2, current - 1);
    const endPage = Math.min(total - 1, current + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // 如果当前页离最后一页还有至少 2 页距离，则显示省略号
    pages.push(total);
  }
  return pages;
});
</script>

<template>
  <div class="holder" style="height: 30px"></div>
  <div class="container">
    <div class="oneRow">
      <div class="topBar">
        <ul class="topBar">
          <li class="categories">
            <button
              @click="
                () => {
                  selectCategory(null);
                  selectTag(null);
                }
              "
              class="allPostsButton"
              :class="{
                selected: selectedCategory === null && selectedTag === null,
              }"
            >
              <span>All Posts</span>
            </button>
          </li>
          <li
            class="categories"
            v-for="(posts, category) in categoryMap"
            :key="category"
          >
            <button
              @click="selectCategory(category)"
              :class="{ selected: selectedCategory === category }"
            >
              {{ category }} <span class="number">{{ posts.length }}</span>
            </button>
          </li>
        </ul>
      </div>
      <div class="main-content">
        <!-- 使用统一的 paginatedPosts 渲染文章列表 -->
        <div class="selected">
          <div class="list" v-for="post in paginatedPosts" :key="post.url">
            <a :href="post.url" style="color: var(--vp-c-text)">
              <article class="onePost">
                <div v-if="post.image" class="imageContainer">
                  <img :src="post.image" :alt="post.title" class="image" />
                </div>
                <div class="textContainer">
                  <p class="time">
                    <Icon
                      v-if="post.pin"
                      icon="fluent:pin-28-filled"
                      width="18"
                      height="18"
                      style="margin-right: 3px; color: var(--vp-c-brand-2)"
                    />
                    {{ post.date.string }}
                  </p>
                  <h1 class="title" v-text="post.title"></h1>
                  <p class="descriptions" v-text="post.descriptions"></p>
                  <p class="tagList">
                    <span
                      v-if="post.category"
                      class="oneCategory oneTag"
                      @mousedown.prevent.stop="selectCategory(post.category)"
                      @click.prevent.stop="selectCategory(post.category)"
                    >
                      <Icon
                        icon="fluent:folder-24-filled"
                        width="14"
                        height="21"
                      />
                      {{ post.category }}
                    </span>
                    <span
                      class="oneTag"
                      v-if="post.tags"
                      v-for="tag in post.tags"
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
              </article>
            </a>
          </div>
        </div>
        <!-- 分页按钮，所有视图（全部、分类、tag）共用相同的 class -->
        <div class="pagination" v-if="totalPages > 1">
          <!-- 仅在小屏幕下显示当前页数 -->
          <button class="current-page">{{ currentPage }}</button>
          <button
            class="pagination-button prev"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <Icon icon="fluent:chevron-left-16-filled" width="16" height="16" />
          </button>
          <!-- 这些页码按钮在小屏幕下会被隐藏 -->
          <button
            v-for="(page, index) in displayPages"
            :key="index"
            class="pagination-button"
            :class="{ selected: page === currentPage }"
            @click="typeof page === 'number' && goToPage(page)"
          >
            {{ page }}
          </button>
          <button
            class="pagination-button next"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            <Icon
              icon="fluent:chevron-right-16-filled"
              width="16"
              height="16"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <aside class="infos">
        <img :src="config.card.avatar" />
        <h1>{{ config.card.name }}</h1>
        <p v-text="latestMoment"></p>
      </aside>
      <aside class="tagList">
        <h1 class="title">
          <Icon
            icon="fluent:book-number-16-filled"
            width="25"
            height="25"
            style="position: relative; bottom: -1px"
          />
          Tags
        </h1>
        <ul class="sidebar">
          <li class="tags" v-for="(posts, tag) in tagMap" :key="tag">
            <button
              @click="selectTag(tag)"
              :class="{ selected: selectedTag === tag }"
            >
              {{ tag }} <span class="number">{{ posts.length }}</span>
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
        <span class="uptime">
          <Icon icon="fluent:food-cake-12-filled" width="16" height="16" />
          {{ uptime }}
        </span>
        <span class="postCount uptime">
          <Icon
            icon="fluent:calligraphy-pen-20-filled"
            width="16"
            height="16"
          />
          {{ postCount }}
        </span>
      </aside>
    </div>
  </div>
</template>

<style scoped>
/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.pagination-button,
.current-page {
  margin-right: 7px;
  padding: 5px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 9px;
  color: var(--vp-c-text);
  cursor: pointer;
  transition: all 0.4s;
  height: 38px;
  width: 38px;
  line-height: 16px;
  font-size: 16px;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px,
    var(--vp-c-bg-elv) 0px 7px 15px -7px;
}

.pagination-button:hover,
.current-page:hover {
  color: var(--vp-c-brand-1);
  transform: scale(105%);
  border-color: var(--vp-c-brand-1);
}

.pagination-button.prev,
.pagination-button.next {
  width: 58px;
}

.pagination-button.selected {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px,
    var(--vp-c-brand-soft) 0px 3px 7px -7px;
  border: 1px solid var(--vp-c-brand-1);
}

.pagination-button:disabled {
  display: none;
}

@media screen and (min-width: 800px) {
  button.current-page {
    display: none;
  }
}

@media screen and (max-width: 800px) {
  .pagination-button:not(.prev):not(.next) {
    display: none;
  }
  .prev,
  .next {
    /* 让每个按钮占用一半 */
    width: 50% !important;
    &:hover {
      transform: none;
    }
  }
  .current-page:hover {
    transform: none;
  }
}

/* Sidebar */

div.container {
  display: flex;
}

div.oneRow {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  transition: all 0.4s;
  flex: 1;
  column-gap: 10px;
  column-width: 300px;
  column-count: auto;
}

div.main-content {
  flex: 1;
  overflow: hidden;
}

div.sidebar {
  width: 300px;
  margin-left: 10px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: calc(var(--vp-nav-height) + 25px);
  height: fit-content;
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

@media screen and (max-width: 800px) {
  div.sidebar {
    display: none;
  }
  ul.topBar {
    display: block;
  }
}

@media screen and (max-width: 960px) {
  div.sidebar {
    top: 25px;
  }
}

@media screen and (min-width: 800px) {
  div.sidebar {
    display: block;
  }
  ul.topBar {
    display: block;
  }
}

/* Main Content */

* {
  user-select: none;
}

/* 样式: 按钮和文章列表 */

/*div.topBar {
  position: -webkit-sticky;
  position: sticky !important;
  top: 80px;
  background-color: var(--vp-c-bg);
  z-index: 10;
}*/

ul.topBar button {
  font-size: 17.5px;
  padding: 3px 9px 3px 9px;
  border-radius: 7px;
  margin-right: 3px;
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

ul.topBar li.categories {
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
    transition: all 0.4s;
    opacity: 0.8;
  }
  span.oneTag:hover {
    color: var(--vp-c-brand-3);
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
  /*div.numberAndYear {
    margin-bottom: 60px;
  }*/
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
