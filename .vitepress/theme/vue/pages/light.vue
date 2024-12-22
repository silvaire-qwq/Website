<script setup lang="ts">
interface Props {
    text: string
    time: string
}

const props = withDefaults(defineProps<Props>(), {
    text: '',
    time: ''
})
</script>


<template>
    <div class="lightPage">
        <p class="description" v-text="text">
        </p>
        <p class="time" v-text="time"></p>
    </div>
</template>

<style>
/* 卡片背景 */
.lightPage {
    break-inside: avoid !important;
    text-decoration: none;
    padding: 17px;
    box-shadow: 0 8px 16px -4px var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.8em;
    transition: all 0.4s;
    p.description {
        margin: 0px;
        color: var(--vp-c-text-1);
        display: block;
        transition: all 0.4s;
    }
    p.time {
        color: var(--vp-c-text-3);
        opacity: .6;
        transition: all .4s;
        margin: 10px 0px 0px 0px;
    }
}

/* 卡片鼠标悬停 */
.lightPage:hover {
    p.time {
        color: var(--vp-c-text-1);
        opacity: .8;
    }
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
}

section.lightloader {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-gap: 7px;
}
</style>
