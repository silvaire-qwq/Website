<template>
    <div class="before-docs">
        <h1 class="doc-title">
            {{ $frontmatter.title }}
        </h1>
        <div class="clock">
            <Icon icon="fluent:clock-12-regular" height="18px" style="display: inline;"/> {{ $frontmatter.clock }} <span style="margin-right: 5px;"></span>
            <Icon icon="fluent:tag-16-regular" height="18px" style="display: inline;"/> {{ $frontmatter.tag }}
        </div>
    </div>
</template>
<script setup lang="ts">
</script>
<style>
    h1 {
        text-align: center;
        margin: 0px 0px 15px 0px;
        font-size: 32px;
        font-weight: 600;
    }
    .clock {
        text-align: center;
        font-weight: 500;
        color: var(--vp-c-text-3);
    }
    .before-docs {
        margin-top: 50px;
        margin-bottom: 100px;
    }
</style>
