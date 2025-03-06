<template>
    <div id="CustomHome">
        <div style="margin-top: 70px;"></div>
        <div class="alignCenter">
            <div class="titles">
                <div>
                    <div class="filter"></div>
                    <img :src="config.avatar">
                </div>
                <h1 v-html="text1"></h1>
                <h1 v-html="text2"></h1>
            </div>
            <p v-text="config.desc" class="desc"></p>
        </div>
    </div>
    <div style="margin-top: 70px;"></div>
    <PostList />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { default as config } from "/src/configs/config.json";

const text1 = ref("");
const text2 = ref("");
const fullText1 = "你好👋，";
const fullText2 = `欢迎来到 ${config.title}。`;

function typeWriter(text, refVar, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            refVar.value += text[i];
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

onMounted(() => {
    typeWriter(fullText1, text1, 100);
    setTimeout(() => typeWriter(fullText2, text2, 100), fullText1.length * 100);
});
</script>

<style scoped>
div#CustomHome {
    div.alignCenter {
        text-align: center;
        p.desc {
            color: var(--vp-c-text-3);
            opacity: .8;
            margin-top: 5px;
        }
        .titles {
            div.filter {
                position: absolute;
                left: 40%;
                z-index: -1;
                border-radius: 50%;
                width: 192px;
                height: 192px;
                background-image: var(--vp-home-hero-image-background-image);
                filter: var(--vp-home-hero-image-filter);
            }
            img {
                margin: 0 auto;
                border-radius: 100%;
                aspect-ratio: 1;
                height: 250px;
                width: 250px;
                margin-bottom: 30px;
            }
            h1 {
                font-size: 35px;
            }
        }
    }
}
</style>
