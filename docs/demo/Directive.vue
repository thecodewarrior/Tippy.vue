<template>
  <button v-tippy="'Some content'">Static</button>
  <button v-tippy="{content: 'Some content', trigger:'click', interactive:true}">Click me</button>
  <button v-tippy="{content: `Seconds: ${seconds}`}">Counter</button>
</template>
<script setup>
import {ref} from 'vue';

const seconds = ref(0);
setInterval(() => seconds.value++, 1000)
</script>
