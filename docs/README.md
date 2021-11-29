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
    link: /guide/
    type: primary
---

<demo v-slot="{seconds}">
  <button class="big-button" v-tippy>Tippy.vue</button>
  <tippy>Current time: <i>{{seconds}}</i></tippy>
</demo>

<div class="narrow-text">

```vue
<button v-tippy>Tippy.vue</button>
<tippy>Current time: <i>{{seconds}}</i></tippy>
```

</div>

<style scoped>
.big-button {
  font-size: 1.5em;
}
.narrow-text {
  display: flex;
  justify-content: center;
  margin: .85rem 0;
}
.narrow-text pre {
  margin: 0;
}
</style>