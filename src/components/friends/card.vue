<script setup lang="ts">
interface CardProps {
  title: string;
  link: string;
  desc: string;
  img: string;
  blog: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  title: "",
  link: "",
  desc: "",
  img: "",
  blog: "",
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

function formatUrl(url: string): string {
  // 移除 http:// 或 https:// 和末尾的 /
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
</script>

<template>
  <div
    class="card"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <a :href="props.link" target="_blank" class="card-link" rel="nofollow">
      <div class="cardInfo">
        <div class="img-container" v-if="props.img">
          <img class="img" :src="props.img" />
        </div>
        <div class="textInfo">
          <div class="title">{{ props.title }}</div>
          <div class="details">{{ props.desc }}</div>
          <div class="link">
            <span class="blog">{{ props.blog }}</span>
            {{ formatUrl(props.link) }}
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<style scoped>
.card {
  border-radius: var(--vp-border-radius-1);
  border: 1px solid var(--vp-c-divider);
  height: 100%;
  background-color: var(--vp-c-bg);
  will-change: transform;
  box-shadow: var(--vp-shadow);
  transition: all var(--vp-transition-time);
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-brand);
}

.cardInfo {
  height: 100%;
  padding: 25px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.title {
  color: var(--vp-c-text-1);
  font-size: 20px;
  line-height: 26px;
  font-weight: 600;
  margin: 0;
  transition: all var(--vp-transition-time);
}

.card:hover .title {
  color: var(--vp-c-brand-2);
}

.details {
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 6px;
}

.img-container {
  aspect-ratio: 1;
  width: 48px;
  height: 48px;
}

.img {
  border-radius: 100%;
}

.textInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
  height: 100%;
}

.link {
  color: var(--vp-c-text-3);
  opacity: .8;
  font-size: 13px;
  margin-top: auto;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.blog {
  margin-right: 5px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-border);
  padding: 2px 8px;
  border-radius: var(--vp-border-radius-1);
}
</style>
