<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useData } from "vitepress";
const { page } = useData();
const frontmatter = page.value.frontmatter;
</script>

<template>
  <h1>
    <Icon :icon="frontmatter.icon" class="innerIcon"/><br>
    <span class="content">{{ frontmatter.title }}</span>
    <p class="desc">{{ frontmatter.desc }}</p>
  </h1>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: var(--vp-font-size-4);
  gap: var(--vp-space-2);
  font-size: 45px;
  font-weight: 700;
  margin-bottom: 40px;
  .innerIcon {
    border: 1px solid var(--vp-c-divider);
    border-radius: .7rem;
    padding: 10px;
    background-color: var(--vp-c-bg-soft);
  }
  span.content {
    font-size: 35px;
  }
  p.desc {
    margin: 0px;
    font-size: 18px;
    color: var(--vp-c-text-3);
    font-weight: 500;
    opacity: .8;
    line-height: 24px;
  }
}
</style>