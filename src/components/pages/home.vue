<template>
    <div id="CustomHome">
        <div style="margin-top: 175px;"></div>
        <div class="alignCenter">
            <div class="titles">
                <h1>你好，</h1>
                <h1>歡迎蒞臨 <highlight v-text="config.title"></highlight>。</h1>
            </div>
            <p v-text="config.desc" class="desc"></p>
        </div>
    </div>
    <div style="margin-top: 175px;"></div>
    <PostList />
</template>

<script setup>
import { default as config } from "/src/configs/config.json";
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
            
            h1 {
                font-size: 35px;
            }
        }
    }
}
</style>
