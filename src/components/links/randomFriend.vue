<template>
    <a class="card-base z-10 relative w-full rounded-2xl h-[250px] overflow-hidden" :href="friend.link" target="_blank">
        <!-- 背景 + 标题同时淡入淡出 -->
        <transition name="fade-bg-title" mode="out-in">
            <div :key="friend.id" class="relative h-full w-full">
                <div class="absolute top-0 bottom-0 right-0 w-[80%] bg-cover bg-center opacity-50 blur-[2px] rounded-2xl"
                    :style="{ backgroundImage: `url(${friend.img})` }">
                    <!-- 渐变层永远存在 -->
                    <div class="absolute inset-0" :style="{
                        background: `linear-gradient(to left, transparent, var(--card-bg))`
                    }"></div>
                </div>

                <!-- 前景文字 -->
                <div class="flex flex-col justify-between h-full relative z-10 px-9 py-6 ">
                    <div class="flex-1"></div>
                    <div>
                        <h3 class="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                            {{ friend.title }}
                        </h3>
                        <p class="text-50 text-sm font-medium fade-desc-item">
                            {{ friend.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </transition>
    </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { links } from "../../config/friend";

const validLinks = links
    .map((l, index) => ({ ...l, id: index }));

const friend = ref(validLinks[Math.floor(Math.random() * validLinks.length)]);

let interval: number;

onMounted(() => {
    interval = window.setInterval(() => {
        friend.value = validLinks[Math.floor(Math.random() * validLinks.length)];
    }, 10000);
});

onBeforeUnmount(() => {
    clearInterval(interval);
});
</script>

<style scoped>
/* 背景 + 标题同时淡入淡出 */
.fade-bg-title-enter-active,
.fade-bg-title-leave-active {
    transition: opacity 0.5s ease;
}

.fade-bg-title-enter-from,
.fade-bg-title-leave-to {
    opacity: 0;
}

.fade-bg-title-enter-to,
.fade-bg-title-leave-from {
    opacity: 1;
}

/* 描述延迟淡入 */
.fade-desc-item {
    opacity: 0;
    animation: fadeDesc 0.5s forwards;
    animation-delay: 0.5s;
    /* 延迟 0.5 秒 */
}

@keyframes fadeDesc {
    to {
        opacity: 1;
    }
}
</style>
