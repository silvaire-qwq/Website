<template>
    <div class="vp-doc layout beforeDocs">
        <p class="time">创建于 {{ $frontmatter.date }}</p>
        <h1 class="title">{{ $frontmatter.title }}</h1>
        <p class="desc">{{ $frontmatter.descriptions }}</p>
    </div>
</template>

<style scoped>
    div.vp-doc.layout.beforeDocs {
        /* 提高顶部空间 */
        margin-top: +50px;

        /* Time */
        p.time {
            color: var(--vp-c-gutter);
            font-weight: 500;
            margin-bottom: 7px;
        }

        /* Descriptions */
        p.desc {
            margin: 7px 0px 0px 0px;
            color: var(--vp-c-text-3);
            font-weight: 500;
        }
    }
</style>