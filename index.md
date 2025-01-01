---
layout: home
title: 主页
footer: false
pageClass: hide-avatar
---

<script setup>
    import { default as webConfig } from "./config.json";
</script>

<style>
    .hide-avatar img.VPImage.logo {
        visibility: hidden;
        display: none;
    }
    div.homePage {
        * {
            user-select: none;
        }
        margin-bottom: 25px;
        img.logo {
            height: 240px;
            width: 240px;
            border: 1px solid var(--vp-c-divider);
            padding: 6px;
            margin-bottom: 20px;
            border-radius: 100%;
            box-shadow: 0 8px 16px -4px var(--vp-c-bg-soft);
        }
        h1 {
            letter-spacing: .4px !important;
            font-weight: 400;
            margin-bottom: 4px;
        }
        @media only screen and (max-width: 600px) {
            h1.work {
                display: none !important;
            }
        }
        span.author {
            font-weight: 700;
        }
        span.codeBlock {
            font-family: var(--vp-font-family-mono);
        }
        span.codeBlock:before {
            content: '<'
        }
        span.codeBlock:after {
            content: ' />'
        }
        h3.desc {
            font-weight: 400;
            margin-top: 5px !important;
            color: var(--vp-c-text-3);
            opacity: .8;
            font-size: 16px;
        }
    }
</style>

<div class="homePage">
    <img class="logo" :src="webConfig.logo"/>
    <h1 class="name">Hi, I'm <span class="author" v-text="webConfig.author"></span> 👋。</h1>
    <h1 class="work">A Student Who Is Learning <span class="codeBlock">Coding</span></h1>
    <h3 class="desc" v-text="webConfig.description"></h3>
</div>

<a class="CustomButton" style="background-color: var(--vp-c-brand-soft); border: 1px solid var(--vp-c-brand-1)" href="https://www.bilibili.com/video/BV187411i71P/?share_source=copy_web&vd_source=7042c7b68a10e8b7be829bab8708b7cb">
    <span>🎉<div style="margin-right:7px; display: inline"></div>新年快乐</span>
</a>

<VPBtn text="文章" href="/pages/reads/post" icon="fluent:document-one-page-multiple-sparkle-16-regular" />

<VPBtn text="动态" href="/pages/reads/light" icon="fluent:weather-snowflake-48-regular" />