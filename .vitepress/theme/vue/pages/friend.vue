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

.linkcard:hover {
    border-color: var(--vp-c-brand-1);
    box-shadow: 0 8px 16px -4px var(--vp-c-brand-soft);
}

.linkcard .name {
    transition: 0.4s;
    font-weight: 500;
}

.linkcard .des {
    color: var(--vp-c-text-3);
    opacity: .8;
}

.linkcard:hover .name {
    color: var(--vp-c-brand-1);
}

.linkcard a {
    display: flex;
    align-items: center;
}

.linkcard p {
    line-height: 23px !important;
}

.linkcard p.description {
    margin: 0px;
}

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

.linkcard .description span.des {
    font-size: 14px;
}

/* logo图片 */
.linkcard .logo img {
    margin-right: 12px;
    clear: both;
    display: block;
    float: left;
    max-width: 49px;
    max-height: 49px;
    border-radius: 100%;
    box-sizing: border-box;
}


</style>
