<script setup lang="ts">
interface Props {
    icon: string
    text: string
    link: string
}

const props = withDefaults(defineProps<Props>(), {
    icon: '',
    text: '',
    link: '',
})
</script>


<template>
    <a class="CustomButton" :href="link">
        <Icon :icon="icon" width="20" height="20" class="icon"/>
        <span v-text="text"></span>
    </a>
</template>

<style>
    a.CustomButton:hover {
        background-color: var(--vp-c-bg-alt);
        color: var(--vp-c-text-1);
        transform: scale(99%);
    }
    a.CustomButton {
        box-shadow: 0 8px 16px -4px var(--vp-c-bg-soft);
        margin-right: 6px;
        transition: all .4s;
        display: inline-block;
        color: var(--vp-c-text-1);
        padding: 5px 10px;
        border-radius: .5em;
        border: 1px solid var(--vp-c-divider);
        background-color: var(--vp-c-bg);
        .icon {
            display: inline;
            margin-right: 10px;
        }
        span {
            font-size: 16px;
        }
    }
</style>
