---
title: Categories
icon: fluent:folder-24-filled
desc: 文章分类
footer: false
layout: home
---


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// 从 .vitepress/posts.data.mts 中导入数据
import { data } from '/.vitepress/posts.data.mts';

// 从数据中提取 categoryMap
const categoryMap = ref(data.categoryMap);

// 用于存储当前选中的 category
const selectedCategory = ref<string | null>(null);

// 页面加载时从 URL 获取当前选中的 category
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");
  if (categoryFromUrl) {
    selectedCategory.value = categoryFromUrl;
  }
});

// 当点击某个 category 分类时，跳转到对应的 URL
const selectCategory = (category: string | null) => {
  selectedCategory.value = category;
  const url = new URL(window.location.href);
  if (category) {
    url.searchParams.set("category", category);
  } else {
    url.searchParams.delete("category");
  }
  window.history.replaceState(null, "", url.toString());
};
</script>

<div>
  <!-- 显示所有 category 分类 -->
  <spacer height="40px" />
  <div>
    <pt />
    <ul>
      <li class="categorys" v-for="(posts, category) in categoryMap" :key="category">
        <button 
          @click="selectCategory(category)"
          :class="{'selected': selectedCategory === category}">
          {{ category }} <span class="number">{{ posts.length }}</span> <!-- 显示每个分类下的文章数 -->
        </button>
      </li>
    </ul>
  </div>

  <!-- 如果选择了某个 category 分类，显示该分类下的文章 -->
  <div v-if="selectedCategory" class="selected">
    <div class="grid">
      <div class="list" v-for="post in categoryMap[selectedCategory]" :key="post.url">
        <a :href="post.url" style="color: var(--vp-c-text)" class="flex">
          <article class="onePost">
            <p class="time" v-text="post.date.string"></p>
            <h1 class="title" v-text="post.title"></h1>
            <p class="descriptions" v-text="post.descriptions"></p>
            <p class="tagList">
              <span
                v-if="post.category"
                class="oneCategory oneTag"
                @mousedown.prevent.stop="selectTag(post.category)"
                @click.prevent.stop="selectTag(post.category)"
              >
                <a :href="`/src/pages/categories?category=${post.category}`">
                    <Icon icon="fluent:folder-24-filled" width="14" height="21" />
                    {{ post.category }}
                </a>
              </span>
              <span
                class="oneTag"
                v-if="post.tags"
                v-for="tag in post.tags"
                :key="tag"
                @mousedown.prevent.stop="selectTag(tag)"
                @click.prevent.stop="selectTag(tag)"
              >
                <a :href="`/src/pages/tags?tag=${tag}`">
                    <Icon
                    icon="fluent:number-symbol-24-filled"
                    width="14"
                    height="21"
                    style="margin-right: -2px"
                    />
                    {{ tag }}
                </a>
              </span>
            </p>
          </article>
        </a>
      </div>
    </div>
  </div>
</div>

<style scoped>
* {
  user-select: none;
}

/* 样式: 按钮和文章列表 */
button {
  font-size: 20px;
  padding: 9px 15px;
  border-radius: 9px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.4s;
}

button.selected {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px -4px var(--vp-c-brand-soft);
  span, span.number {
    color: var(--vp-c-brand-1);
  }
}

button:hover {
  border-color: var(--vp-c-brand-1);
}

span.number {
  color: var(--vp-c-text-3);
  margin: 3px;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  gap: 0px 9px;
}

div.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 居中对齐 */
  gap: 10px;
}

li.categorys {
  display: inline-block;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
}

div.list {
  flex: 1 1 300px; /* 确保卡片在小屏幕上也能正常显示 */
}

article.onePost {
  max-width: 1200px;
  width: 100%;
  box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
  border: 1px solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);
  border-radius: 15px;
  padding: 24px;
  height: 100%;
  &, h1, & .categoryList {
    transition: all .4s;
  }
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

article.onePost:hover {
  box-shadow: 0 4px 16px -4px var(--vp-c-brand-soft); 
  border: 1px solid var(--vp-c-brand-1);
  h1.title {
    color: var(--vp-c-brand-1);
  }  
}

div.selected {
  margin-top: 30px;
}

p.tagList {
    margin: 0px;
    margin-top: 5px;
    span.oneTag a {
      color: var(--vp-c-text-3);
      margin-right: 8px;
      padding: 0px;
      transition: all 0.4s;
      opacity: 0.8;
    }
    span.oneTag a:hover {
      color: var(--vp-c-brand-3);
    }
}
</style>
