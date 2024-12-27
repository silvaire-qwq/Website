<script setup lang="ts">
    interface Props {
        title: string
        singer: string
        bg: string
    }

    const props = withDefaults(defineProps<Props>(), {
        title: '',
        singer: '',
        bg: ''
    })
</script>

<style>
    section.MusicDiv {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-template-rows: repeat(auto-fill, 1fr);
        grid-gap: 8px;
    }
    div.MusicCard:hover {
        h1 {
            color: var(--vp-c-brand-1);
        }
        border-color: var(--vp-c-brand-1);
        box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
    }
    div.MusicCard {
        align-items: center;
        transition: all .4s;
        box-shadow: 0 8px 16px -4px var(--vp-c-bg-alt);
        border: 1px solid var(--vp-c-divider);
        border-radius: 1rem;
        padding: 20px;
        img {
            aspect-ratio: 1;
            height: 54px !important;
            width: 54px !important;
            float: left;
            margin-right: 15px;
            border-radius: .5rem;
            width: 150px;
        }
        h1 {
            font-size: 24px;
            line-height: 26px;
            margin-bottom: 4px;
            font-weight: 900;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            transition: all .4s;
        }
        span {
            color: var(--vp-c-text-3);
            opacity: .8;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>

<template>
    <div class="MusicCard">
        <img :src="bg" />
        <div class="text">
            <h1 v-text="title"></h1>
            <span v-text="singer"></span>
        </div>
    </div>
</template>