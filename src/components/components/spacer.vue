<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

interface SpacerProps {
  height: string;
}

const props = withDefaults(defineProps<SpacerProps>(), {
  height: '50px',
});
</script>

<template>
  <div :style="{ height: props.height }"></div>
</template>

<style scoped>
div {
  width: 100%;
}
</style>