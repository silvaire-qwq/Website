<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from "vue";
import { data as posts } from "../../utils/posts.data.mts";

const props = defineProps({
  maxItems: {
    type: Number,
    default: 0,
  },
});

// 获取 URL 中的 category 参数
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = ref(urlParams.get("category"));

// 创建一个响应式变量来存储过滤后的文章
const articles = ref(posts);

// 限制文章数量
watch(
  () => props.maxItems,
  () => {
    if (props.maxItems > 0) {
      articles.value = posts.slice(0, props.maxItems);
    } else {
      articles.value = posts;
    }
  }
);

// 监听 selectedCategory 的变化，重新过滤文章
watch(selectedCategory, (newCategory) => {
  nextTick(() => {
    if (newCategory) {
      articles.value = posts.filter((post) => post.category === newCategory);
    } else {
      articles.value = posts;
    }
  });
});

// 按年份分组
const groupedArticles = computed(() => {
  const map: Record<string, typeof articles.value> = {};
  articles.value.forEach((post) => {
    const year = new Date(post.originDate).getFullYear();
    if (!map[year]) map[year] = [];
    map[year].push(post);
  });

  return Object.keys(map)
    .sort((a, b) => parseInt(b) - parseInt(a)) // 按年份倒序
    .map((year) => ({
      year,
      posts: map[year].sort(
        (a, b) =>
          new Date(b.originDate).getTime() - new Date(a.originDate).getTime()
      ), // 每年内部再按时间倒序
    }));
});

// 提取所有唯一的类别
const categories = computed(() => {
  const allCategories: Set<string> = new Set();
  posts.forEach((post) => {
    post.category
      .split(",")
      .forEach((category) => allCategories.add(category.trim()));
  });
  return Array.from(allCategories);
});

// 获取每个类别的文章数量
const categoryCounts = computed(() => {
  const counts: Record<string, number> = {};
  posts.forEach((post) => {
    post.category.split(",").forEach((category) => {
      category = category.trim();
      counts[category] = (counts[category] || 0) + 1;
    });
  });
  return counts;
});

// 点击某个类别时更新 URL 中的 category 参数
const handleCategoryClick = (category: string) => {
  selectedCategory.value = category;
  const url = new URL(window.location.href);
  url.searchParams.set("category", category); // 更新 URL
  window.history.pushState({}, "", url); // 更改 URL 并保留浏览历史
};

// 在页面加载时触发选定的分类，确保首次加载就能应用 URL 参数
onMounted(() => {
  if (selectedCategory.value) {
    nextTick(() => {
      articles.value = posts.filter(
        (post) => post.category === selectedCategory.value
      );
    });
  }
});

const maxMove = 6;
const easing = 0.1;

const cardStates = new WeakMap();

const handleMouseMove = (e) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const targetX = ((x - centerX) / centerX) * maxMove;
  const targetY = ((y - centerY) / centerY) * maxMove;

  if (!cardStates.has(el)) {
    cardStates.set(el, {
      currentX: 0,
      currentY: 0,
      targetX,
      targetY,
      hovered: false,
    });
    animateCard(el);
  } else {
    const state = cardStates.get(el);
    state.targetX = targetX;
    state.targetY = targetY;
  }
};

const resetTransform = (e) => {
  const el = e.currentTarget;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state.targetX = 0;
  state.targetY = 0;
};

// hover 状态标记
const handleMouseEnter = (e) => {
  const el = e.currentTarget;
  if (!cardStates.has(el)) {
    cardStates.set(el, {
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      hovered: true,
    });
    animateCard(el);
  } else {
    cardStates.get(el).hovered = true;
  }
};
const handleMouseLeave = (e) => {
  const el = e.currentTarget;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state.hovered = false;
  resetTransform(e);
};

const animateCard = (el) => {
  const state = cardStates.get(el);
  if (!state) return;

  const { currentX, currentY, targetX, targetY, hovered } = state;

  const nextX = currentX + (targetX - currentX) * easing;
  const nextY = currentY + (targetY - currentY) * easing;

  state.currentX = nextX;
  state.currentY = nextY;

  const scale = hovered ? 1.03 : 1;
  el.style.transform = `translate(${nextX}px, ${nextY}px) scale(${scale})`;

  requestAnimationFrame(() => animateCard(el));
};
</script>

<template>
  <div>
    <h1 class="year">Categories</h1>

    <!-- Categories Section -->
    <div class="tags">
      <a
        class="tag"
        href="/src/pages/tags"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      >
        <Icon icon="fluent:tag-16-regular" style="opacity: 0.4" />
        <span class="name"> Tags</span>
      </a>
      <span
        class="tag"
        @click="handleCategoryClick('')"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        :class="{ active: !selectedCategory }"
      >
        <span class="name">All Posts</span>
      </span>
      <span
        v-for="category in categories"
        :key="category"
        class="tag"
        @click="handleCategoryClick(category)"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
        :class="{ active: selectedCategory === category }"
      >
        <span class="name"><span class="anchor">#</span>{{ category }}</span>
        <span class="count">{{ categoryCounts[category] }}</span>
      </span>
    </div>

    <!-- Articles Grouped by Year -->
    <div v-for="group in groupedArticles" :key="group.year">
      <h1 class="year">{{ group.year }}</h1>
      <div class="posts-grid">
        <div v-for="post in group.posts" :key="post.url" class="post-card">
          <PostCard
            :image="post.image"
            :url="post.url"
            :title="post.title"
            :description="post.description"
            :category="post.category"
            :date="post.date"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import url('./style.css');
</style>
