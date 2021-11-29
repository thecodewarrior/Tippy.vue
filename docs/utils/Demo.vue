<template>
  <div class="demo">
    <slot :seconds="seconds"></slot>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue';

const seconds = ref(0);

let intervalHandle = -1;
onMounted(() => {
  intervalHandle = setInterval(() => seconds.value++, 1000)
});
onUnmounted(() => {
  clearInterval(intervalHandle)
});
</script>

<style scoped>
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo:deep(.separator) {
  display: block;
  margin: 5px;
  width: 3px;
  border-radius: 2px;
  background-color: var(--c-brand);
  align-self: stretch;
}
.demo:deep(.wrapper) {
  display: flex;
  margin: 5px;
  padding: 3px;
  border-radius: 4px;
  border: 2px solid var(--c-brand);
  background-color: white;
}
.demo:deep(.wrapper > button), .demo:deep(.wrapper > span) {
  box-shadow: 2px 2px 0 black;
}
.demo:deep(button) {
  display: inline-block;
  margin: 5px;

  border-width: 3px;
  border-style: solid;
  border-radius: 6px;
  transition: color var(--t-color), background-color var(--t-color);
  box-sizing: border-box;
  font-weight: bold;
  padding: 0.2em 0.6em;
  cursor: pointer;

  color: var(--c-brand);
  background-color: var(--c-bg);
  border-color: var(--c-brand);
}
.dem:deep(button:hover) {
  color: var(--c-bg);
  background-color: var(--c-brand-light);
}
</style>
