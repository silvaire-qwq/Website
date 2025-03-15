---
layout: home
title: Moments
pageClass: MomentsPage
---

<script setup>
import { ref } from 'vue';
import moments from '../configs/moments.json';

const momentsList = ref(moments);

function formatDate(dateString) {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('zh-CN', options);
}

function formatRelativeDate(dateString, timeString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        return `今天 ${timeString}`;
    } else if (diffDays === 1) {
        return `昨天 ${timeString}`;
    } else if (diffDays === 2) {
        return `前天 ${timeString}`;
    } else if (date.getFullYear() === now.getFullYear()) {
        return formatDate(dateString);
    } else {
        return new Date(dateString).toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}
</script>

<div class="spacer" style="height: 50px;"></div>
<div class="moments-container">
  <div class="moment" v-for="moment in momentsList" :key="moment.date + moment.content">
    <div class="moment-content">
      <p class="moment-text">{{ moment.content }}</p>
      <p class="moment-date">{{ formatRelativeDate(moment.date, moment.time) }}</p>
    </div>
  </div>
</div>

<style scoped>
.moments-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
}

.moment {
    box-shadow: var(--vp-c-bg-elv) 0px 12px 25px -5px, var(--vp-c-bg-elv) 0px 7px 15px -7px;
    border: 1px solid var(--vp-c-gutter);
    background-color: var(--vp-c-bg);
    border-radius: 12px;
    padding: 16px 20px;
    transition: all 0.4s;
}

.moment:hover {
    box-shadow: var(--vp-c-brand-soft) 0px 1px 25px -5px, var(--vp-c-brand-soft) 0px 3px 7px -7px;
    border: 1px solid var(--vp-c-brand-1);
}

.moment-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}

.moment-text {
    color: var(--vp-c-text-1);
    margin: 0;
}

.moment-date {
    font-size: 0.875rem;
    color: var(--vp-c-text-3);
    opacity: 0.7;
    margin: 10px 0px 0px 0px;
    align-self: flex-end;
}
</style>