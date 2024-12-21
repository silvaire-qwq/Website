<template>
    <div class="before-docs">
        <h1 class="doc-title">
            {{ $frontmatter.title }}
        </h1>
        <div class="clock">
            {{ $frontmatter.description }}
        </div>
    </div>
    <div class="vue divider"></div>
</template>
<script setup lang="ts">
</script>
<style>
div.before-docs{
    h1 {
        margin: 15px 0px 15px 0px;
        line-height: 33px;
        font-size: 32px;
        font-weight: 600;
    }
    .clock {
        font-weight: 500;
        color: var(--vp-c-text-3);
    }
    .before-docs {
        margin-top: 50px;
        margin-bottom: 30px;
    }
    
}
.vue.divider {
    background-color: var(--vp-c-divider);
    height: 1px;
    width: 228px;
    margin: 45px 0px;
}
</style>
