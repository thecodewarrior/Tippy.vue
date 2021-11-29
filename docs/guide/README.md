# Getting Started

## `v-tippy`

The most basic tooltips can be created purely using the `v-tippy` directive. The value of the directive either a string 
or a [tippy props object](https://atomiks.github.io/tippyjs/v6/all-props/). The v-tippy directive is also used with an
argument and no value (`<... v-tippy:arg>`) to mark targets for the `<tippy>` component.

<demo v-slot="{seconds}">
  <button v-tippy="'Some content'">Static</button>
  <button v-tippy="{content: `Seconds: ${seconds}`}">Counter</button>
  <button v-tippy="{content: 'Some content', trigger:'click', interactive:true}">Click me</button>
</demo>

```vue
<button v-tippy="'Some content'">Static</button>
<button v-tippy="{content: `Seconds: ${seconds}`}">Counter</button>
<button v-tippy="{content: 'Some content', trigger:'click', interactive:true}">Click me</button>
```

## `<tippy>`

### Basics

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

### Lists

By default, `<tippy>` will search for `v-tippy` marked *siblings*, starting with the nearest
previous siblings, then the nearest next siblings. Searching this way means you can effortlessly create lists of
tooltipped elements.

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

### `deep-search`

Deep searching using `deep-search`
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

### Singletons

List without tippy-singleton

<demo>
  <button v-tippy>1</button>
  <tippy :extra="{delay: 500}">Item 1</tippy>
  <button v-tippy>2</button>
  <tippy :extra="{delay: 500}">Item 2</tippy>
  <button v-tippy>3</button>
  <tippy :extra="{delay: 500}">Item 3</tippy>
</demo>

```vue
<button v-tippy>1</button>
<tippy :extra="{delay: 500}">Item 1</tippy>
<button v-tippy>2</button>
<tippy :extra="{delay: 500}">Item 2</tippy>
<button v-tippy>3</button>
<tippy :extra="{delay: 500}">Item 3</tippy>
```

Singletons with tippy-singleton

<demo>
  <tippy-singleton :extra="{delay: 500}"/>
  <button v-tippy>1</button>
  <tippy singleton>Item 1</tippy>
  <button v-tippy>2</button>
  <tippy singleton>Item 2</tippy>
  <button v-tippy>3</button>
  <tippy singleton>Item 3</tippy>
</demo>

```vue
<tippy-singleton/>
<button v-tippy>1</button>
<tippy singleton :extra="{delay: 500}">Item 1</tippy>
<button v-tippy>2</button>
<tippy singleton :extra="{delay: 500}">Item 2</tippy>
<button v-tippy>3</button>
<tippy singleton :extra="{delay: 500}">Item 3</tippy>
<!-- or... -->
<tippy-singleton :extra="{delay: 500}"/>
<button v-tippy>1</button>
<tippy singleton>Item 1</tippy>
<button v-tippy>2</button>
<tippy singleton>Item 2</tippy>
<button v-tippy>3</button>
<tippy singleton>Item 3</tippy>
```

`tippy-singleton` uses a variation of the search algorithm used by the tippy target. On each level of the hierarchy it's
identical, but it progressively searches through its parent elements.

<demo>
  <tippy-singleton :extra="{delay: 500}"/>
  <button v-tippy>1</button>
  <tippy singleton>Item 1</tippy>
  <button v-tippy>2</button>
  <tippy singleton>Item 2</tippy>
  <button v-tippy>3</button>
  <tippy singleton>Item 3</tippy>
  <tippy-singleton :extra="{delay: 500}"/>
  <button v-tippy>A</button>
  <tippy singleton>Item A</tippy>
  <button v-tippy>B</button>
  <tippy singleton>Item B</tippy>
  <button v-tippy>C</button>
  <tippy singleton>Item C</tippy>
</demo>

```vue
<tippy-singleton :extra="{delay: 500}"/>
<button v-tippy>1</button>
<tippy singleton>Item 1</tippy>
<button v-tippy>2</button>
<tippy singleton>Item 2</tippy>
<tippy-singleton :extra="{delay: 500}"/>
<button v-tippy>A</button>
<tippy singleton>Item A</tippy>
<button v-tippy>B</button>
<tippy singleton>Item B</tippy>
```

Singletons can be given names and referenced by them for more control.

<demo>
  <tippy-singleton name="even" :extra="{delay: 500}"></tippy-singleton>
  <tippy-singleton name="odd" :extra="{delay: 500}"></tippy-singleton>
  <template v-for="i in 10">
    <button v-tippy>{{i}}</button>
    <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
</demo>

```vue
<tippy-singleton name="even" :extra="{delay: 500}"></tippy-singleton>
<tippy-singleton name="odd" :extra="{delay: 500}"></tippy-singleton>
<template v-for="i in 10">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'">
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
```

Interactive tooltips sometimes require `on-body` to get around z-index, clipping, or styling issues (when the element is
interactive and doesn't have `on-body`, it'll be placed next to its target, which means it'll inherit the styles of that
element. Note the style of the
`on-body` element in the interactive tooltips)
<demo>
<button v-tippy>non-interactive</button>
<tippy>I'm not interactive</tippy>
<button v-tippy>interactive</button>
<tippy interactive>I'm interactive,<br/>but not <code>on-body</code></tippy>
<button v-tippy>on-body</button>
<tippy interactive on-body>I'm interactive,<br/>and <code>on-body</code></tippy>
</demo>

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
