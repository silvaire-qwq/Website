<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
    <LinkCard
      v-for="link in randomLinks"
      :key="link.link"
      :title="link.title"
      :desc="link.desc"
      :link="link.link"
      :img="link.img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkCard from "./LinkCard.vue";

const links: { title: string; link: string; desc: string; img: string }[] = [
  {
    title: "Ariasaka",
    link: "https://blog.yaria.top/",
    desc: "人有悲欢离合，月有阴晴圆缺。",
    img: "https://wsrv.nl/?url=avatars.githubusercontent.com/u/66897357?v=4",
  },
  {
    title: "LeonXie",
    link: "https://leonxie.cn/",
    desc: "保持热爱，奔赴山海！",
    img: "https://www.leonxie.cn/upload/avatar.jpg",
  },
  {
    title: "Genshin Impact",
    link: "https://genshinimpact.net/",
    desc: "这里是一张起始页",
    img: "https://genshinimpact.net/img/yuanshen_logo.jpg",
  },
  {
    title: "YuanRetro",
    link: "https://www.yuanshen.dev/",
    desc: "这是一个成分复杂的小站哦~",
    img: "https://www.yuanshen.dev/img/nahida.png"
  },
  {
    title: "CE-RAMOS",
    link: "https://ce-ramos.cn/",
    desc: "一款致力于模仿原版系统界面且功能强大的PE。",
    img: "https://p1.ce-ramos.cn/logo.png",
  },
  {
    title: "青稚",
    link: "https://blog.linux-qitong.top/",
    desc: "越努力，越幸运。",
    img: "https://blog.linux-qitong.top/img/avatar.webp",
  },
  {
    title: "张洪 Heo",
    link: "https://blog.zhheo.com/",
    desc: "分享设计与科技生活。",
    img: "https://bu.dusays.com/2022/12/28/63ac2812183aa.png",
  },
  {
    title: "Royの主页",
    link: "https://www.royofficial.com/",
    img: "https://cdn.luogu.com.cn/upload/usericon/1.png",
    desc: "一个平平无奇的主页",
  },
  {
    title: "Shenley 的存档点",
    link: "http://blog.ykrazy.top/",
    desc: "随手存个档～",
    img: "https://blog.ykrazy.top/avatar.jpg",
  },
  {
    title: "Pinpe 的云端",
    link: "https://pinpe.top",
    desc: "一个属于自己的云朵。",
    img: "https://pinpe.top/_astro/head.DsU2qhAz_ZsxwbE.webp",
  },
];

const randomLinks = computed(() => links.sort(() => Math.random() - 0.5));
</script>
