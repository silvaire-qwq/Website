<template>
  <a
    class="last-moment"
    href="/src/pages/moments"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div class="content">
      <span class="content">{{ lastMoment?.content }}</span>
      <span class="datetime">{{
        lastMoment?.date ? formatRelativeDate(lastMoment?.date) : ""
      }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { globalConfig } from "../../../config";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
const moments = globalConfig.moments;

interface Moment {
  date: string;
  time: string;
  content: string;
}

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

const lastMoment = ref<Moment | null>(null);
const loading = ref(true);
const error = ref("");

// 使用本地数据替代远程请求
function loadLastMoment() {
  loading.value = true;

  let data: Moment[] = moments; // 从本地数据中获取

  lastMoment.value = data[data.length - 1];
  loading.value = false;
}

onMounted(() => {
  loadLastMoment();
});
</script>

<style scoped>
.last-moment {
  margin-bottom: var(--vp-gap);
  font-size: 1rem;
  display: flex;
  gap: var(--vp-gap);
  border-radius: var(--vp-border-radius-1);
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  transition: all var(--vp-transition-time);
  will-change: transform;
  padding: 15px 20px;
  box-shadow: var(--vp-shadow);
  text-decoration: none;
  overflow: hidden;
  justify-content: center;
  &:hover {
    border-color: var(--vp-c-brand-1);
    box-shadow: var(--vp-shadow-brand);
    span.content {
      color: var(--vp-c-brand-2);
    }
  }
}

.datetime {
  color: var(--vp-c-text-3);
  margin-left: 10px;
  opacity: 0.8;
}

span.content {
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: all var(--vp-transition-time);
}
</style>
