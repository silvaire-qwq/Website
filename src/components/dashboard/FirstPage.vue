<script setup lang="ts">
import { globalConfig } from "../../../config";
</script>

<template>
  <div class="first-page">
    <img :src="globalConfig.homePage.avatar" class="avatar" />
    <div class="self">
      <h1 class="author">{{ globalConfig.homePage.author }}</h1>
      <div class="btns">
        <div class="location btn"><Icon icon="fluent:location-16-regular" /> {{ globalConfig.homePage.city }}</div>
        <a :href="`https://github.com/${globalConfig.github}`" class="github btn"><Icon icon="lucide:github" /> GitHub</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 125px 0px;
}
.avatar {
  height: 112px;
  width: 112px;
  aspect-ratio: 1;
  border-radius: 100%;
  border: 1px solid var(--vp-c-divider);
  padding: 4px;
}

div.self {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
}

div.btns {
    display: flex;
    gap: 28px;
}

.iconify {
    margin-right: 3px;
}

.btn {
    color: var(--vp-c-text-1);
    font-weight: 500;
}
</style>
