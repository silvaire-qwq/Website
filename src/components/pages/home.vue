<script setup>
import { default as config } from "../../configs/config.json";
import moments from "../../configs/moments.json";

// 筛选最近 3 天内的动态
const recentMoment = moments.find(moment => {
  const momentDate = new Date(moment.date);
  const currentDate = new Date();
  const diffTime = currentDate - momentDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
});
</script>

<template>
  <div class="container">
    <img :src="config.logo"/>
    <h1 v-text="config.title"></h1>
    <!-- 如果 recentMoment 存在，则显示最近动态，否则显示 desc -->
    <p v-text="recentMoment ? recentMoment.content : config.desc"></p>
  </div>
</template>

<style scoped>
div.container {
    max-width: 850px;
    margin: 0 auto;
    * {
      margin: 0 auto;
      text-align: center;
    }
    margin-bottom: 100px !important;
}
p {
  margin: 0px;
  color: var(--vp-c-text-3);
  opacity: .8;
}
h1 {
    margin: 0px;
    color: var(--vp-c-text-1);
    font-size: 30px;
    line-height: 35px;
    font-weight: 600;
    margin-bottom: 5px;
    margin-top: 10px !important;
}
img {
    aspect-ratio: 1;
    height: 200px;
    width: 200px;
    display: block;
}
</style>