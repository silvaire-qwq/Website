<script setup>
  import { default as webConfig } from "/config.json";
  const avatar = webConfig.logo
  const author = webConfig.author
  const desc = webConfig.description
</script>

<template>
  <div class="homepage">
    <img :src="avatar" class="avatar" />
    <span class="name" v-text="author"></span>
    <span class="desc" v-text="desc"></span>
  </div>  
</template>

<style>
  * {
    color: var(--vp-c-text-1);
  }
  div.homepage {
    .desc {
      display: block;
      font-size: 18px;
      text-align: center;
      font-family: var(--title-font);
    }
    a {
      color: var(--vp-c-text-1) !important;
      font-weight: 400 !important;
    }
    .icon {
      display: inline;
      margin-right: 3px;
    }
    .avatar {
      height: 150px;
      margin: 0px auto;
      border-radius: 9999px;
      padding: 6px;
      border: 1px solid var(--vp-c-gutter);
      transition: all .4s;
    }
    .avatar:hover {
      scale: 0.97;
      box-shadow: 5px 5px 10px var(--vp-c-bg-elv);
    }
    span.name {
      font-size: 30px;
      font-weight: 700;
      margin: 1.75rem 0px 1rem 0px;
      display: block;
      text-align: center;
    }
  }
</style>
