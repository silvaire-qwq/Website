<template>
  <div class="friend-grid">
    <div
      v-for="friend in friends"
      :key="friend.title"
      class="friend-card"
      @mouseenter="handleMouseEnter"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <a :href="friend.link" target="_blank" class="friend-inner">
        <img :src="friend.img" alt="" class="friend-icon" />
        <div class="friend-info">
          <p class="friend-title">{{ friend.title }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { globalConfig } from "../../../config";

// 打乱数组的简单函数
function shuffle(array) {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

const friends = shuffle(
  globalConfig.friends.map((friend) => ({
    ...friend,
    img:
      friend.img ||
      "https://pic2.zhimg.com/50/v2-cc1a32fcb444fc9d5e23f2ee078dc6e1_720w.jpg?source=1940ef5c",
  }))
);

// 动画逻辑
const maxMove = 12;
const easing = 0.1;
const cardStates = new WeakMap();

const handleMouseMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
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
    state!.targetX = targetX;
    state!.targetY = targetY;
  }
};

const resetTransform = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state!.targetX = 0;
  state!.targetY = 0;
};

const handleMouseEnter = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
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
    cardStates.get(el)!.hovered = true;
  }
};

const handleMouseLeave = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement;
  if (!cardStates.has(el)) return;
  const state = cardStates.get(el);
  state!.hovered = false;
  resetTransform(e);
};

const animateCard = (el: HTMLElement) => {
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
.friend-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vp-gap);
}

.friend-card {
  perspective: 1000px;
  border-radius: var(--vp-border-radius-1);
  transition: all var(--vp-transition-time);
}

.friend-inner {
  display: flex;
  align-items: center;
  gap: var(--vp-gap);
  transition: all var(--vp-transition-time);
  padding: 16px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: inherit;
  box-shadow: var(--vp-shadow);
  text-decoration: none;
  color: inherit;
  will-change: transform;
}

.friend-card:hover .friend-inner {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-brand);
}

.friend-card:hover .friend-title {
  color: var(--vp-c-brand-2);
}

.friend-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.friend-info {
  display: flex;
  flex-direction: column;
}

.friend-title {
  font-weight: 600;
  transition: all var(--vp-transition-time);
  font-size: 16px;
  margin: 0;
}
</style>
