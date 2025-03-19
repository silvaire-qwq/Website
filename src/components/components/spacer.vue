<script setup lang="ts">

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