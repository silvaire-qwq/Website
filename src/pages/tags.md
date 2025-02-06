---
title: Tags
layout: home
---

<script setup lang="ts">
import { ref } from 'vue'

// 从 .vitepress/posts.data.mts 中导入数据
import { data } from '/.vitepress/posts.data.mts'

// 从数据中提取 emojiMap
const emojiMap = ref(data.emojiMap)

// 用于存储当前选中的 emoji
const selectedEmoji = ref<string | null>(null)

// 当点击某个 emoji 分类时，设置 selectedEmoji
const selectEmoji = (emoji: string) => {
  selectedEmoji.value = emoji
}
</script>

<div>
  <!-- 显示所有 emoji 分类 -->
  <div class="tagSpacer"></div>

  <div>
    <ul>
      <li class="emojis" v-for="(posts, emoji) in emojiMap" :key="emoji">
        <button 
          @click="selectEmoji(emoji)"
          :class="{'selected': selectedEmoji === emoji}">
          {{ emoji }} <span class="number">{{ posts.length }}</span> <!-- 显示每个分类下的文章数 -->
        </button>
      </li>
    </ul>
  </div>

  <!-- 如果选择了某个 emoji 分类，显示该分类下的文章 -->
  <div v-if="selectedEmoji" class="selected">
    <div class="grid">
      <div class="list" v-for="post in emojiMap[selectedEmoji]" :key="post.url">
        <a :href="post.url" style="color: var(--vp-c-text)">
          <article class="onePost">
            <p class="time" v-text="post.date.string"></p>
            <h1 class="title" v-text="post.title"></h1>
            <p class="descriptions" v-text="post.descriptions"></p>
          </article>
        </a>
      </div>
    </div>
  </div>

  <!-- 如果没有选择分类，展示提示 -->
  <div v-else>
  </div>
</div>

<style scoped>
div.tagSpacer {
  margin-top: +30px;
}

/* 样式: 按钮和文章列表 */
button {
  font-size: 20px;
  padding: 9px 15px;
  border-radius: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  &, * {
    transition: all .4s;
  }
}

button.selected {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-c-brand-soft) 0px 12px 25px -5px, var(--vp-c-brand-soft) 0px 7px 7px -7px; 
  span.number {
    color: var(--vp-c-brand-1);
  }
}

span.number {
  color: var(--vp-c-text-3);
  margin: +3px;
}

ul {
  list-style-type: none;
  padding: 0;
}

div.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 10px;
}

li.emojis {
  display: inline-block;
  margin-right: 10px;
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


div.selected {
  margin-top: 30px;
}

</style>
