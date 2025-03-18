<script setup lang="ts">
interface CardProps {
  url: string;
  title: string;
  description: string;
  logo: string;
}

const props = withDefaults(defineProps<CardProps>(), {
  url: "",
  title: "",
  description: "",
  logo: "",
});
</script>

<template>
  <div class="card">
    <a :href="props.url" target="_blank" class="card-link" rel="nofollow">
      <div class="logo-container">
        <img alt="logo" width="70" height="70" :src="props.logo" />
      </div>
      <div class="title">{{ props.title }}</div>
      <div class="description">{{ props.description }}</div>
    </a>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--vp-c-bg);
  box-shadow: 0 8px 16px -4px var(--vp-c-bg-alt);
  text-decoration: none;
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 15px;
  transition: all 0.4s;
  height: 100%;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px -4px var(--vp-c-brand-soft);
}

.card .title {
  font-weight: 500;
  transition: color 0.4s;
  color: var(--vp-c-text-1);
  font-size: 20px;
  display: block;
  transition: all 0.4s;
  line-height: 24px;
  margin-bottom: 4px;
}

.card .description {
  color: var(--vp-c-text-3);
  font-size: 14px;
  line-height: 20px;
  opacity: 0.8;
}

.card:hover .title {
  color: var(--vp-c-brand-1);
}

.card .logo-container img {
  margin-bottom: 12px;
  display: block;
  max-width: 55px;
  max-height: 55px;
  border-radius: 100%;
}
</style>