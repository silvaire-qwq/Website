<template>
    <div class="vp-doc layout beforeDocs">
        <h1 class="emoji">{{ $frontmatter.emoji }}</h1>
        <p class="time">创建于 {{ $frontmatter.date }}</p>
        <h1 class="title">{{ $frontmatter.title }}</h1>
        <p class="desc">{{ $frontmatter.descriptions }}</p>
    </div>
</template>

<style>
    div.vp-doc.layout.beforeDocs {
        /* 提高顶部空间 */
        margin-top: +30px;
        
        /* Emoji */
        h1.emoji {
            display: inline-block;
            margin: 15px 0px;
            font-size: 56px;
            border-radius: 0.7rem;
            margin-bottom: 20px;
        }

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