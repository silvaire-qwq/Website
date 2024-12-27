<script setup lang="ts">
interface Props {
    url: string
    title: string
    description: string
    logo: string
}

const props = withDefaults(defineProps<Props>(), {
    url: '',
    title: '',
    description: '',
    logo: '',
})
</script>


<template>
    <div class="linkcard">
        <a :href="props.url" target="_blank">
            <div class="logo">
                <img alt="logo" width="70px" height="70px" :src="props.logo" />
            </div>
            <p class="description">
                <span class="name">
                    {{ props.title }}
                </span>
                <br>
                <span class="des">
                    {{ props.description }}
                </span>
            </p>
        </a>
    </div>
</template>

<style>
/* 卡片背景 */

.linkcard {
    align-items: center;
    box-shadow: 0 8px 16px -4px var(--vp-c-bg-alt);
    text-decoration: none;
    display: block;
    padding: 17px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 0.8em;
    transition: all 0.4s;
    margin-bottom: 7px;
}

/* 卡片鼠标悬停 */
.linkcard:hover {
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
}

.name {
    transition: 0.4s;
}

.des {
    color: var(--vp-c-text-3);
    opacity: .8;
}

.linkcard:hover .name {
    color: var(--vp-c-brand-1);
}

/* 链接样式 */
.linkcard a {
    display: flex;
    align-items: center;
}

p {
    line-height: 23px !important;
}

p.description {
    margin: 0px;
}

/* 描述链接文字 */
.linkcard .description {
    color: var(--vp-c-text-1);
    font-size: 20px;
    display: block;
    transition: all 0.4s;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 10px;
}

/* 描述链接文字2 */
.linkcard .description span.des {
    font-size: 14px;
}

/* logo图片 */
.linkcard .logo img {
    clear: both;
    display: block;
    float: left;
    max-width: 48px;
    max-height: 48px;
    border-radius: 100%;
    box-sizing: border-box;
}

/* 链接下划线去除 */
.vp-doc a {
    text-decoration: none;
}

</style>
