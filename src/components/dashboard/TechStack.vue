<template>
  <div class="tech-grid">
    <div
      v-for="stack in stacks"
      :key="stack.name"
      class="tech-card"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="tech-inner">
        <img :src="stack.icon" alt="" class="tech-icon" />
        <span class="tech-name">{{ stack.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { globalConfig } from "../../../config";

const stacks = ref(globalConfig.homePage.stacks);

// 动态生成完整 URL
stacks.value = stacks.value.map((stack) => ({
  ...stack,
  icon: `https://cdn.jsdmirror.com/gh/devicons/devicon/icons/${stack.icon}/${stack.icon}-original.svg`,
}));

// 自动按首字母排序
stacks.value.sort((a, b) => a.name.localeCompare(b.name));

const maxMove = 6;
const easing = 0.1;
const cardStates = new WeakMap();

// 以下动画代码不变
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

<style scoped>
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vp-gap);
  align-items: flex-start;
}

.tech-card {
  perspective: 1000px;
  transition: all var(--vp-transition-time);
  border-radius: var(--vp-border-radius-1);
}

.tech-inner {
  display: flex;
  transition: all var(--vp-transition-time);
  align-items: center;
  gap: var(--vp-gap);
  padding: 16px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: inherit;
  box-shadow: var(--vp-shadow);
  will-change: transform;
  white-space: nowrap; /* 防止文本换行 */
}

.tech-card:hover .tech-inner {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-brand);
  transform: scale(1.03);
}

.tech-icon {
  width: 24px;
  height: 24px;
}

.tech-name {
  font-weight: 600;
}
</style>
