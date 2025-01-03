<template>
    <div class="before-docs">
        <div class="content">
            <h1 class="doc-title">
                {{ $frontmatter.title }}
            </h1>
            <div class="desc">
                {{ $frontmatter.description }}
            </div>
            <span class="date">{{  $frontmatter.clock }}</span>
            <br>
            <!--<span v-for="(tag,i) in frontmatter.tags" v-text="tag" class="tags">
            </span>-->
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useData } from 'vitepress';
    const { frontmatter } = useData()
</script>
<style>
div.before-docs{
    margin: 100px 0px;
    * {
        text-align: center;
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
        font-weight: 500;
        margin-bottom: 20px;
        color: var(--vp-c-text-3);
    }
}
</style>
