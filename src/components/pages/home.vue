<template>
  <div id="CustomHome" :class="{ hidden: isTagPresent }">
    <div class="alignCenter">
      <div class="titles">
        <h1>你好</h1>
        <h1>欢迎光临 <highlight v-text="config.title"></highlight></h1>
      </div>
      <p class="desc">
        <span v-for="(char, index) in displayedText" :key="index">{{ char }}</span>
      </p>
    </div>
  </div>  
  <PostList />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { default as config } from "/src/configs/config.json";
import hitokotoData from "/src/data/hitokoto.json";

const displayedText = ref("");
const hitokoto = ref("");
const isTagPresent = ref(false);

const getRandomHitokoto = () => {
  const randomIndex = Math.floor(Math.random() * hitokotoData.length);
  return hitokotoData[randomIndex].hitokoto;
};

const typeWriterEffect = (text) => {
  let index = 0;
  const interval = setInterval(() => {
  if (index < text.length) {
    displayedText.value += text[index];
    index++;
  } else {
    clearInterval(interval);
  }
  }, 150);
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  isTagPresent.value = urlParams.has('tag') || urlParams.has('category');
  
  if (!isTagPresent.value) {
  hitokoto.value = getRandomHitokoto();
  typeWriterEffect(hitokoto.value);
  }
});
</script>

<style scoped>
div#CustomHome {
  height: calc(40vh - var(--vp-nav-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
}

div#CustomHome.hidden {
  display: none;
}

div.alignCenter {
  text-align: center;
  p.desc {
    color: var(--vp-c-text-3);
    opacity: .8;
    margin-top: 5px;
  }
  .titles {
    h1 {
      font-size: 35px;
    }
  }
}
</style>
