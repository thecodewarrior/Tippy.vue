---
home: true
heroImage:
tagline: Do one thing, and do it well.
features:
  - title: Easy to use
    details: A clumsy tool will wind up chronically underutilized, so Tippy.vue has been designed with a focus on ergonomics.
  - title: Clean to write
    details: Writing Tippy.vue is clean. We don't use wrapper components, everything is in the default slot, and common options are exposed as props.
  - title: Clean HTML
    details: Tippy.vue mounts itself and then disappears from the DOM tree, leaving your layout untouched. 
actions:
  - text: Get Started →
    link: /getting-started.md
    type: primary
---


<demo v-slot="{seconds}">
  <button class="big-button" v-tippy>&lt;tippy&gt;</button>
  <tippy @show="source = 'component'">Current time: <i>{{seconds}}</i></tippy>
  <button class="big-button" v-tippy="{content: 'Current time: ' + seconds, onShow: () => source = 'directive'}">v-tippy</button>
</demo>

<div class="hero-source">
<div :class="{'source-hidden': source !== 'component'}">

```vue
<button v-tippy>Tippy.vue</button>
<tippy>Current time: <i>{{seconds}}</i></tippy>
```

</div>
<div class="directive-source" :class="{'source-hidden': source !== 'directive'}" :style="{opacity: source === 'directive' ? '1.0' : '0.0'}">

```vue
<button v-tippy="'Current time: ' + seconds">v-tippy</button>

```

</div>
</div>

<script setup>
import {ref} from 'vue';

let source = ref("component")
</script>

<style scoped>
.big-button {
  font-size: 1.5em;
}

.hero-source {
  display: grid;
  justify-content: center;
  margin: .85rem 0;
  grid-template-columns: minmax(0, auto);
}
.hero-source > * {
  grid-area: 1 / 1;

  transition: opacity 0.15s;
}
.hero-source pre {
  margin: 0;
}
.directive-source {
  z-index: 1;
}
.source-hidden {
  visibility: hidden;
  transition: opacity 0.15s, visibility 0.15s;
}
</style>