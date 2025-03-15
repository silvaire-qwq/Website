<script setup lang="ts">
interface MusicProps {
  name: string;
  singer: string;
  album: string;
  img: string;
}

const props = withDefaults(defineProps<MusicProps>(), {
  name: "",
  singer: "",
  album: "",
  img: "",
});
</script>

<template>
  <div class="card">
    <div class="logo-container">
      <img alt="album cover" width="70" height="70" :src="props.img" />
    </div>
    <div class="title">{{ props.name }}</div>
    <!--<div class="description">{{ props.singer }}</div>-->
    <div class="album">{{ props.album }}</div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--vp-c-bg) !important;
  box-shadow: 0 8px 16px -4px var(--vp-c-bg-alt);
  text-decoration: none;
  padding: 20px 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.8em;
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

.card .album {
  color: var(--vp-c-text-2);
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
  border-radius: 7px;
}
</style>