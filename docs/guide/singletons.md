# `<tippy-singleton>`

The `<tippy-singleton>` element itself is largely inert. It's a `display: none` div with a `data-tippy-singleton` 
attribute. Its job is to hold onto and maintain a [Tippy.js singleton](https://atomiks.github.io/tippyjs/v6/addons/#singleton) instance.

As `<tippy>` components are created and destroyed they will add and remove themselves from the singleton, however 
changes to the singleton's [`name`](#name) property or the tippy's [`singleton`](tippy.md#singleton) property won't 
have any effect on the tooltips already attached to the singleton.

## Example

To use a `<tippy-singleton>`, just add the `singleton` attribute to any `<tippy>` components you want to bind to it. 
The singleton must be in some common parent of all the `<tippy>` components you want to bind.

<demo>
<button v-tippy>Item 1</button>
<tippy :extra="{delay: 250}">Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy :extra="{delay: 250}">Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy :extra="{delay: 250}">Tip 3</tippy>
</demo>
<demo>
<tippy-singleton :extra="{delay: 250, moveTransition: 'transform 0.1s ease-out'}"/>
<button v-tippy>Item 1</button>
<tippy singleton>Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy singleton>Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy singleton>Tip 3</tippy>
</demo>

```vue
<tippy-singleton :extra="{delay: 250, moveTransition: 'transform 0.1s ease-out'}"/>
<button v-tippy>Item 1</button>
<tippy>Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy>Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy>Tip 3</tippy>
```

`<tippy-singleton>` components can be named using the `name` prop, allowing `<tippy>` elements to individually specify
which singleton to bind to (using the value of their `singleton` prop). In this example the even and odd numbers should
each share their own 500ms timer.

<demo>
<tippy-singleton name="even" :extra="{delay: 500}"/>
<tippy-singleton name="odd" :extra="{delay: 500}"/>
<template v-for="i in 9" :key="i">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'" >
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
</demo>

```vue
<tippy-singleton name="even" :extra="{delay: 500}"/>
<tippy-singleton name="odd" :extra="{delay: 500}"/>
<template v-for="i in 9" :key="i">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'" >
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
```

## Props

### <code>name<type op=":"/> <type builtin="string"/></code> {#name}

Optionally sets singleton's name.

### <code>extra<type op=":"/> <type type="Props" link="https://atomiks.github.io/tippyjs/v6/all-props/"/></code> {#extra}

Extra [Tippy.js options](https://atomiks.github.io/tippyjs/v6/all-props/) to be applied to everything using the 
singleton.

### <code>enabled<type op=":"/> <type builtin="boolean"/></code> {#enabled}

Whether the tooltip should be [enabled](https://atomiks.github.io/tippyjs/v6/methods/#disable). This is present on the
singleton because disabling the individual tooltips in a singleton has no effect.

## Events

`<tippy-singleton>` fires the `add` and `remove` events when a tippy instance is added or removed. The tippy instance in 
question is passed as the event argument. 
