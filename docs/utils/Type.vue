<template>
  <a v-if="props.link" :href="props.link" :class="classes">{{content}}</a>
  <span v-else :class="classes">{{content}}</span>
</template>

<script setup lang="ts">
import {defineProps, computed} from 'vue';
const props = defineProps({
  op: String,
  punc: String,
  builtin: String,
  type: String,
  string: String,
  link: String
})

let content = computed<string>(() => {
  return props.op || props.punc || props.builtin || props.type || props.string
})
let classes = computed<string[]>(() => {
  let tokenClass =
      props.op ? 'operator' :
          props.punc ? 'punctuation' :
              props.builtin ? 'builtin' :
                  props.type ? 'builtin' :
                      props.string ? 'string' :
                          ''

  return ['token', tokenClass]
})

</script>

<style scoped>
a {
  font-style: italic;
}
</style>
