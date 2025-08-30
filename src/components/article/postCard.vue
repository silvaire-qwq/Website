<script setup lang="ts">
interface CardProps {
  title: string;
  url: string;
  description: string;
  category: string;
  date: string;
  image?: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  title: "",
  url: "",
  description: "",
  category: "",
  date: "",
  image: "",
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
  <a
    :href="props.url"
    class="diary"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="props.image" class="img-container">
      <img :src="props.image" />
    </div>
    <div class="textPlace">
      <p class="title">{{ props.title }}</p>
      <p class="details">{{ props.description }}</p>
      <div class="meta">
        <!-- 修改此处，使得点击分类时跳转到相应的分类页面 -->
        <a
          class="category"
          :href="`/src/pages/archive?category=${props.category}`"
          >{{ props.category }}</a
        >{{ props.date }}
      </div>
    </div>
  </a>
</template>

<style scoped>

.img-container img {
  border-radius: var(--vp-border-radius-1) var(--vp-border-radius-1) 0 0;
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.diary {
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

.diary:hover {
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
  color: var(--vp-c-text-3);
  opacity: 0.8;
}

.title {
  color: var(--vp-c-text-1);
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  margin: 0;
  transition: all var(--vp-transition-time);
}

.diary:hover .title {
  color: var(--vp-c-brand-2);
}

.details {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 20px;
  margin: 8px 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category {
  margin-right: 8px;
  color: var(--vp-c-text-2);
  opacity: 0.8;
  background-color: var(--vp-c-border);
  padding: 2px 8px;
  border-radius: var(--vp-border-radius-1);
  font-size: 13px;
  &:hover {
    color: var(--vp-c-text-1);
    opacity: 1;
  }
}
</style>
