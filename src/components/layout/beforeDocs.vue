<template>
  <div class="vp-doc layout beforeDocs" v-if="frontmatter.title">
    <div v-if="frontmatter.image">
      <img
        :src="image"
        @mouseenter="handleMouseEnter"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
      />
    </div>
    <div v-else style="height: 50px;"></div>
    <div class="textArea">
      <p class="time">
        <a
          class="category"
          :href="`/src/pages/archive?category=${frontmatter.category}`"
          >{{ frontmatter.category }}</a
        >{{ formatRelativeDate(frontmatter.published) }}
      </p>
      <h1 class="title">
        {{ frontmatter.title }}
      </h1>
      <p class="desc">{{ frontmatter.description }}</p>
      <div v-if="frontmatter.tags">
        <div class="tags" v-for="tag in frontmatter.tags">
          <a class="tag" :href="`/src/pages/tags?tag=${tag}`">
            <span class="anchor">#</span><span class="content">{{ tag }}</span>
          </a>
        </div>
      </div>
    </div>
    <blockquote v-if="frontmatter.origin">
      This article is a copied and re-edited version of
      <a :href="frontmatter.origin">the original</a>, and it may contain minor
      modifications. Please be mindful while reading.
    </blockquote>
  </div>
</template>

<script setup>
import { useData } from "vitepress";
import { formatRelativeDate } from "../../utils/formatRelativeDate";
import { globalConfig } from "../../../config";

const { page } = useData();
const frontmatter = page.value.frontmatter;

const image = frontmatter.image
  ? /^(https?:\/\/)/.test(frontmatter.image)
    ? frontmatter.image
    : `${globalConfig.imgBed}${frontmatter.image}`
  : "";

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

<style scoped>
div.vp-doc.layout.beforeDocs {

  /* 提高文字区域的空间 */
  .textArea {
    margin-top: 50px;
    margin-bottom: 100px;
  }

  img {
    border-radius: var(--vp-border-radius-1);
    transition: all var(--vp-transition-time);
    box-shadow: var(--vp-shadow);
  }

  /* Tag */
  .tags {
    margin-top: 10px;
    display: inline-block;
    .tag {
      color: var(--vp-c-text-3);
      opacity: 0.8;
      margin-right: 12px;
      .anchor {
        margin-right: 5px;
        opacity: 0.5;
      }
      &:hover {
        opacity: 1;
      }
    }
  }

  /* Time */
  p.time {
    color: var(--vp-c-text-3);
    opacity: 0.8;
    font-weight: 500;
    margin-bottom: 7px;
    margin-top: 0;
  }

  /* Category */
  a.category {
    margin-right: 8px;
    color: var(--vp-c-text-2);
    background-color: var(--vp-c-border);
    padding: 2px 8px;
    border-radius: var(--vp-border-radius-1);
    font-size: 13px;
    opacity: 0.8;
    &:hover {
      color: var(--vp-c-text-1);
      opacity: 1;
    }
  }

  /* Descriptions */
  p.desc {
    margin: 7px 0 0 0;
    color: var(--vp-c-text-3);
    font-weight: 500;
    line-height: 24px;
  }
}
</style>
