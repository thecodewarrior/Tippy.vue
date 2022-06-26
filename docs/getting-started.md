# Getting Started

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

// or add them individually
app.directive('tippy', TippyVue.TippyDirective);
app.component('tippy', TippyVue.Tippy);
app.component('tippy-singleton', TippyVue.TippySingleton);
tippy.setDefaultProps({
  // default tippy props
});
```

## Code Completion

Tippy.vue includes code completion files for IntelliJ IDEA, Vetur, and Volar. 
[See the code completion page](reference/code-completion.md) for details on how to use them.

## Demo

### `v-tippy`

The most basic tooltips can be created purely using the `v-tippy` directive. The value of the directive is either a
string or a [tippy props object](https://atomiks.github.io/tippyjs/v6/all-props/). The `v-tippy` directive is also used
without a value (`<... v-tippy>`) to mark targets for the `<tippy>` component.

<demo v-slot="{seconds}">
  <button v-tippy="'Some content'">Static</button>
  <button v-tippy="`Seconds: ${seconds}`">Counter</button>
  <button v-tippy="{content: 'Some content', placement: 'right'}">Side</button>
</demo>

```vue
<button v-tippy="'Some content'">Static</button>
<button v-tippy="`Seconds: ${seconds}`">Counter</button>
<button v-tippy="{content: 'Some content', placement: 'right'}">Side</button>
```

Like the Tippy.js [`content` option](https://atomiks.github.io/tippyjs/v6/html-content/#string), make sure HTML strings
containing user data are sanitized properly to prevent XSS attacks. For cases involving user data the `<tippy>` 
component will likely be safer and more convenient.

### `<tippy>`

The basic mechanic behind the Tippy component is that you first mark an element with `v-tippy`, then when `<tippy>`
is mounted it locates that element and attaches itself to it. You can name targets and reference them using the `target`
property on the Tippy component. The target property also accepts a magic value `"_parent"`, which will target the
component's parent.

<demo v-slot="{seconds}">
  <button v-tippy>Boring</button>
  <tippy>Nothing to see here</tippy>
  <button v-tippy:fancy>Fancy</button>
  <tippy target="fancy">HTML: <i>Fancy {{seconds}}</i></tippy>
  <button>
    Parent
    <tippy target="_parent">bound to _parent</tippy>
  </button>
</demo>

```vue
<button v-tippy>Boring</button> <!-- the default name is "" -->
<tippy>Nothing to see here</tippy>

<button v-tippy:fancy>Fancy pants</button>
<tippy target="fancy">HTML: <i>Fancy {{seconds}}</i></tippy>

<button>
  Parent
  <tippy target="_parent">bound to _parent</tippy>
</button>
```

By default, `<tippy>` will search for `v-tippy` marked *siblings*, starting with the nearest previous siblings, then 
the nearest next siblings. Searching this way means you can effortlessly create lists of tooltipped elements.

<demo>
  <button v-tippy>Item 1</button>
  <tippy>Info 1</tippy>
  <button v-tippy>Item 2</button>
  <tippy>Info 2</tippy>
</demo>

```vue
<button v-tippy>Item 1</button>
<tippy>Info 1</tippy>
<button v-tippy>Item 2</button>
<tippy>Info 2</tippy>
```

If you need to search in more than just the siblings, you can use `deep-search`, which instead uses `querySelector` on
the parent element. You can bind to deeply nested elements at the cost of not being able to chain them (since
`querySelector` always returns the first element, all your tooltips will bind to the first item)

<demo>
  <tippy target="box" deep-search>Attachment</tippy>
  <span class="wrapper">
    <button v-tippy:box>Deep</button>
  </span>
</demo>

```vue
<tippy target="box" deep-search>Attachment</tippy>
<span class="wrapper">
  <button v-tippy:box>Deep</button>
</span>
```

### `<tippy-singleton>`

Singletons allow a single tippy element to be used for multiple tippy instances. This allows for shared fades, delays,
and smooth transitions. (See the [Tippy.js demo](https://atomiks.github.io/tippyjs/#singleton) for more)

List without tippy-singleton

<demo>
  <button v-tippy>1</button>
  <tippy delay="200">Item 1</tippy>
  <button v-tippy>2</button>
  <tippy delay="200">Item 2</tippy>
  <button v-tippy>3</button>
  <tippy delay="200">Item 3</tippy>
</demo>

```vue
<button v-tippy>1</button>
<tippy delay="200">Item 1</tippy>
<button v-tippy>2</button>
<tippy delay="200">Item 2</tippy>
<button v-tippy>3</button>
<tippy delay="200">Item 3</tippy>
```

Singletons with tippy-singleton

<demo>
  <tippy-singleton delay="200"/>
  <button v-tippy>1</button>
  <tippy singleton>Item 1</tippy>
  <button v-tippy>2</button>
  <tippy singleton>Item 2</tippy>
  <button v-tippy>3</button>
  <tippy singleton>Item 3</tippy>
</demo>

```vue
<tippy-singleton delay="200"/>
<button v-tippy>1</button>
<tippy singleton>Item 1</tippy>
<button v-tippy>2</button>
<tippy singleton>Item 2</tippy>
<button v-tippy>3</button>
<tippy singleton>Item 3</tippy>
```

`tippy-singleton` uses a variation of the search algorithm used by the tippy target. On each level of the hierarchy it
looks for the nearest previous singleton, then the nearest next singleton. If it doesn't find one, it repeats the search
in the parent element.

<demo>
  <tippy-singleton delay="200"/>
  <button v-tippy>1</button>
  <tippy singleton>Item 1</tippy>
  <button v-tippy>2</button>
  <tippy singleton>Item 2</tippy>
  <button v-tippy>3</button>
  <tippy singleton>Item 3</tippy>
  <tippy-singleton delay="200"/>
  <button v-tippy>A</button>
  <tippy singleton>Item A</tippy>
  <button v-tippy>B</button>
  <tippy singleton>Item B</tippy>
  <button v-tippy>C</button>
  <tippy singleton>Item C</tippy>
</demo>

```vue
<tippy-singleton delay="200"/>
<button v-tippy>1</button>
<tippy singleton>Item 1</tippy>
<button v-tippy>2</button>
<tippy singleton>Item 2</tippy>

<tippy-singleton delay="200"/>
<button v-tippy>A</button>
<tippy singleton>Item A</tippy>
<button v-tippy>B</button>
<tippy singleton>Item B</tippy>
```

Singletons can be given names and referenced by them for more control.

<demo>
  <tippy-singleton name="even" delay="500"></tippy-singleton>
  <tippy-singleton name="odd" delay="500"></tippy-singleton>
  <template v-for="i in 10">
    <button v-tippy>{{i}}</button>
    <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
</demo>

```vue
<tippy-singleton name="even" delay="500"></tippy-singleton>
<tippy-singleton name="odd" delay="500"></tippy-singleton>
<template v-for="i in 10">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
```

<script setup>
import {ref} from 'vue';

const singletons = ref([1, 2, 3]);

let nextSingleton = 4;
function addSingleton() {
  singletons.value.push(nextSingleton++);
}
function removeSingleton() {
  singletons.value.splice(0, 1);
}
</script>
