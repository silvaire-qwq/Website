<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 my-4">
    <LinkCard
      v-for="link in randomLinks"
      :key="link.link"
      :title="link.title"
      :desc="link.desc"
      :link="link.link"
      :img="link.img"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import LinkCard from "./LinkCard.vue";
import { links } from "../../data/friends";

const randomLinks = computed(() => links.sort());
</script>
