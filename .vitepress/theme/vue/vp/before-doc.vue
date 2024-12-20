<template>
    <div class="before-docs">
        <h1 class="doc-title">
            {{ $frontmatter.title }}
        </h1>
        <div class="clock">
            “{{ $frontmatter.description }}”
        </div>
    </div>
    <div class="divider"></div>
</template>
<script setup lang="ts">
</script>
<style>
    h1 {
        margin: 0px 0px 15px 0px;
        line-height: 33px;
        font-size: 32px;
        font-weight: 600;
    }
    .clock {
        font-weight: 500;
        font-style: italic;
        color: var(--vp-c-text-3);
    }
    .before-docs {
        margin-top: 50px;
        margin-bottom: 30px;
    }
    .divider {
        background-color: var(--vp-c-divider);
        height: 1px;
        width: 228px;
    }
</style>
