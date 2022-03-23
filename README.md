<div align="center">
<img src="./tippy+vue.min.svg" alt="Logo" height="100"/>
</div>

<h1 align="center">
Tippy.vue
<br>
<a href="https://www.npmjs.com/package/tippy.vue"><img src="https://img.shields.io/npm/v/tippy.vue.svg" alt="npm"/></a>
<a href="https://v3.vuejs.org/"><img src="https://img.shields.io/badge/vue-3.x-brightgreen.svg" alt="Vue 3"/></a>
<a href="https://www.npmjs.com/package/tippy.vue"><img src="https://img.shields.io/npm/dt/tippy.vue.svg" alt="Download"/></a>
</h1>

<p align="center">
Nesting-free <a href="https://atomiks.github.io/tippyjs/">Tippy.js</a> directive/component for Vue 3
</p>

## Design

- ***Easy to use:*** A clumsy tool will wind up chronically underutilized, so Tippy.vue has been designed with a focus 
  on ergonomics.
- ***Clean to write:*** Writing Tippy.vue is clean. We don't use wrapper components, everything is in the default slot, 
  and common options are exposed as props.
- ***Clean HTML:*** Tippy.vue mounts itself and then disappears from the DOM tree, leaving your layout untouched.

## Examples

```vue
<!-- As an inline directive -->
<button v-tippy="`Seconds: ${seconds}`">Counter</button>
<button v-tippy="{content: 'Some content', placement: 'right'}">Side</button>

<!-- As a component -->
<button v-tippy>Counter</button>
<tippy>Time: <i>{{seconds}}</i></tippy>

<button v-tippy:name>Props</button>
<tippy target="name" placement="right">Side tooltip</tippy>

<!-- Target the parent (useful for components adding a tooltips to themselves) -->
<button>
  Button
  <tippy target="_parent">Bound to parent</tippy>
</button>

<!-- Only the commonly-used Tippy.js options have props, but
     other niche options can be passed into the 'extra' prop -->
<button v-tippy>Follow me</button>
<tippy :extra="{followCursor: true}">Tip</tippy>

<!-- Using a singleton -->
<tippy-singleton move-transition="transform 0.1s ease-out"/>
<button v-tippy>Item 1</button> <tippy singleton>Tip 1</tippy>
<button v-tippy>Item 2</button> <tippy singleton>Tip 2</tippy>
<button v-tippy>Item 3</button> <tippy singleton>Tip 3</tippy>
```

More examples and working demos can be found [in the documentation](https://thecodewarrior.github.io/Tippy.vue/getting-started.html#demo).  

### Custom Props

Tippy.vue doesn't have a vue property for every Tippy.js prop, instead providing `extra` for additional options. This
is by design, since it keeps the API clean and easy to understand. You can however add you own props without any
modifications to the base library. This is a fairly advanced feature, but it's available if needed.
[See the docs](https://thecodewarrior.github.io/Tippy.vue/reference/custom-props.html) for an overview of the API.

## Why?

There's already a popular Vue library for using Tippy.js, [VueTippy](https://github.com/KABBOUCHI/vue-tippy), so you 
might (rightfully) ask, why make another one?

To put it simply, VueTippy makes a few structural concessions which I disagree with. The most significant is that when
using VueTippy, adding a complex (i.e. non-directive) tooltip to an element will wrap it in a `<span>`, which can easily 
screw up a complex layout. On top of that, I find their syntax clunky and ugly. Wrapping every tooltipped component in a 
slot seems unnecessary. 

One of my mottos is that a clumsy tool will wind up chronically underutilized, so Tippy.vue has been designed from the 
start with a strong focus on ergonomics. Adding a tooltip is a simple, drop-in addition, with no structural or styling 
changes necessary.

```html
<!-- VueTippy -->
<tippy>
  <button>Tippy!</button>
  
  <template #content>
    Hi!
  </template>
</tippy>

<!-- Tippy.vue -->
<button v-tippy>Tippy!</button>
<tippy>Hi!</tippy>
```

## 🚀 Installation

### 📦 Package Manager

```shell
# npm
npm i tippy.vue

# Yarn
yarn add tippy.vue
```

### 💻 CDN

Tippy.vue doesn't bundle Tippy.js. The most up-to-date Tippy install process is explained 
[in the Tippy docs](https://atomiks.github.io/tippyjs/v6/getting-started/#2-cdn), but as of the time of writing, these 
are the necessary scripts:
```html
<!-- Development -->
<script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js"></script>
<script src="https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js"></script>

<script src="https://unpkg.com/tippy.vue@3"></script>
```
```html
<!-- Production -->
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="https://unpkg.com/tippy.js@6"></script>

<script src="https://unpkg.com/tippy.vue@3"></script>
```

## Usage

### 📦 Package Manager
You can use Tippy.vue as a plugin or access the individual components directly:
```js
// use the plugin
import {TippyPlugin} from 'tippy.vue';

app.use(TippyPlugin);
app.use(TippyPlugin, {
  tippyDefaults: {}, // convenience to set tippy.js default props
});
```
```js
// or add them individually
import {TippyDirective, Tippy, TippySingleton} from 'tippy.vue';

app.directive('tippy', TippyDirective);
app.component('tippy', Tippy);
app.component('tippy-singleton', TippySingleton);

import tippy from 'tippy.js'
tippy.setDefaultProps({
  // default tippy props
});
```
```css
/* add styles/themes to your global stylesheet */
@import '~tippy.js/dist/tippy.css';
```

You can also add them in individual components:
```vue
<template>
  <div>
    <div v-tippy>Wow</div>
    <tippy>Cool</tippy>
  </div>
</template>

<script>
import {Tippy, TippyDirective} from 'tippy.vue'

export default {
  components: {
    Tippy
  },
  directives: {
    tippy: TippyDirective
  }
}
</script>
```

### 💻 CDN

```js
// use the plugin
app.use(TippyVue);
app.use(TippyVue, {
  tippyDefaults: {}, // convenience to set tippy.js default props
});
```
```js
// or add them individually
app.directive('tippy', TippyVue.TippyDirective);
app.component('tippy', TippyVue.Tippy);
app.component('tippy-singleton', TippyVue.TippySingleton);
tippy.setDefaultProps({
  // default tippy props
});
```

### Code Completion

Tippy.vue includes code completion files for IntelliJ IDEA, Vetur, and Volar. 
[See the docs](https://thecodewarrior.github.io/Tippy.vue/reference/code-completion.html) for details on how to use them.

## Contributing

Setting up an environment is very standard. Make sure you're on the latest version of yarn, then run:
```shell
yarn install
yarn docs:dev
```
