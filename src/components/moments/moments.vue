<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { globalConfig } from "../../../config"; // 引入 globalConfig
import { formatRelativeDate } from "../../utils/formatRelativeDate";

const props = defineProps({
  maxItems: {
    type: Number,
    default: 6,
  },
});

// 获取 moments 数据
const moments = ref(globalConfig.moments);

// 限制 moments 数量
watch(
  () => props.maxItems,
  () => {
    if (props.maxItems > 0) {
      moments.value = globalConfig.moments.slice(0, props.maxItems);
    } else {
      moments.value = globalConfig.moments;
    }
  }
);

// 按年份分组
const groupedMoments = computed(() => {
  const map: Record<string, typeof moments.value> = {};
  moments.value.forEach((moment) => {
    const year = new Date(moment.date).getFullYear(); // 取年份
    if (!map[year]) map[year] = [];
    map[year].push(moment);
  });

  return Object.keys(map)
    .sort((a, b) => parseInt(b) - parseInt(a)) // 按年份倒序
    .map((year) => ({
      year,
      moments: map[year].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ), // 每年内部再按日期倒序
    }));
});

const maxMove = 12;
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
    <!-- Moments Grouped by Year -->
    <div v-for="group in groupedMoments" :key="group.year">
      <h1 class="year">{{ group.year }}</h1>
      <!-- 显示年份 -->
      <div class="posts-grid">
        <div
          v-for="moment in group.moments"
          :key="moment.time"
          class="post-card"
          @mouseenter="handleMouseEnter"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave"
        >
          <div class="textPlace">
            <div class="content">{{ moment.content }}</div>
            <div class="meta">
              {{ formatRelativeDate(moment.date) }}
              <span class="at">at {{ moment.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--vp-gap);
  margin-bottom: 24px;
}

.post-card {
  display: flex;
  flex: 1;
  border-radius: var(--vp-border-radius-1);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  background-color: var(--vp-c-bg);
  will-change: transform;
  box-shadow: var(--vp-shadow);
  transition: all var(--vp-transition-time);
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-brand);
}

.textPlace {
  padding: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.meta {
  margin-top: auto;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-3);
  opacity: 0.8;
}

.content {
  color: var(--vp-c-text-1);
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 6px;
  transition: all var(--vp-transition-time);
}

.diary:hover .content {
  color: var(--vp-c-brand-1);
}

.year {
  margin-top: 30px;
  line-height: 110px;
  font-size: 100px;
  position: relative;
  top: 30px;
  font-weight: bold;
  color: var(--vp-c-gutter);
  opacity: 0.7;
  z-index: -1;
  mask-image: linear-gradient(var(--vp-c-gutter) 20%, transparent);
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.posts-grid {
  margin-bottom: 30px;
}

span.at {
  opacity: 0.5;
}
</style>
