<template>
    <div class="comment">
      <component
        v-if="isDark"
        :is="'script'"
        src="https://giscus.app/client.js"
        data-repo="silvaire-qwq/Website"
        data-repo-id="R_kgDONDiNmg"
        data-category="Announcements"
        data-category-id="DIC_kwDONDiNms4CkxsX"
        data-mapping="pathname"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="https://giscus.catppuccin.com/themes/mocha.css"
        data-lang="zh-CN"
        crossorigin="anonymous"
        data-loading="eager"
        async
      >
      </component>
      <component
        v-else
        :is="'script'"
        src="https://giscus.app/client.js"
        data-repo="silvaire-qwq/Website"
        data-repo-id="R_kgDONDiNmg"
        data-category="Announcements"
        data-category-id="DIC_kwDONDiNms4CkxsX"
        data-mapping="pathname"
        data-reactions-enabled="0"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="https://giscus.catppuccin.com/themes/latte.css"
        data-lang="zh-CN"
        crossorigin="anonymous"
        data-loading="eager"
        async
      >
      </component>
    </div>
  </template>
  <script setup lang="ts">
    import { useData } from 'vitepress';
    // 获取当前配色方案
    const { isDark } = useData();
  </script>
  <style>
    .comment {
      border: 1px solid var(--vp-c-divider);
      padding: 20px 20px;
      border-radius: 1.2em;
      box-shadow: 0 8px 16px -4px var(--vp-c-bg-alt);
    }
  </style>
