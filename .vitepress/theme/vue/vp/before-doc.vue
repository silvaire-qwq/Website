<template>
    <div class="before-docs">
        <div class="content">
            <h1 class="doc-title">
                {{ $frontmatter.title }}
            </h1>
            <span class="date">{{  $frontmatter.clock }}</span>
            <br>
            <!--<span v-for="(tag,i) in frontmatter.tags" v-text="tag" class="tags">
            </span>-->
            <div class="desc">
                <p class="gen-by-doubao"><Icon icon="fluent:checkmark-starburst-20-filled" width="20" height="20"  style="display: inline; margin-right: 8px;" />由豆包 AI 手动生成</p><br>
                {{ $frontmatter.description }}
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useData } from 'vitepress';
    const { frontmatter } = useData()
</script>
<style>
div.before-docs{
    margin: 70px 0px;
    * {
        user-select: none;
    }
    .tags {
      display: inline;
      opacity: 1;
      transition: all .4s;
      color: var(--vp-c-text-3);
      margin-right: 7px;
      border-radius: .6rem;
      font-weight: 500;
      opacity: .7;
    }
    .tags::before {
      content: '#';
      margin-right: 3px;
    }
    .date {
        transition: .4s;
        color: var(--vp-c-text-3);
        opacity: .7;
        font-weight: 500;
        margin-bottom: 10px;
        margin-right: 8px;
    }
    img {
        object-fit: cover;
        height: 275px;
        width: 100%;
        border-top-left-radius: 1.1rem;
        border-top-right-radius: 1.1em;
        border-bottom: 1px solid var(--vp-c-divider);
    }
    h1 {
        margin: 0px 0px 12px 0px;
        line-height: 33px;
        font-size: 32px;
        font-weight: 600;
    }
    .desc {
        .gen-by-doubao {
            margin-bottom: 9px;
            border-radius: 15px;
            color: var(--vp-c-brand-1);
            display: inline-block;
        }
        font-weight: 500;
        margin-bottom: -40px;
        color: var(--vp-c-text-3);
        border: 1px solid var(--vp-c-divider);
        padding: 20px;
        margin-top: 100px;
        border-radius: 1.1rem;
    }
}
</style>
