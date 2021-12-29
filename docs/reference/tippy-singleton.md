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
<tippy delay="250">Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy delay="250">Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy delay="250">Tip 3</tippy>
</demo>
<demo>
<tippy-singleton delay="250" move-transition="transform 0.1s ease-out"/>
<button v-tippy>Item 1</button>
<tippy singleton>Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy singleton>Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy singleton>Tip 3</tippy>
</demo>

```vue
<tippy-singleton delay="250" move-transition="transform 0.1s ease-out"/>
<button v-tippy>Item 1</button>
<tippy>Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy>Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy>Tip 3</tippy>
```

`<tippy-singleton>` components can be named using the `name` prop, allowing `<tippy>` elements to individually specify
which singleton to bind to (using the value of their `singleton` prop). In this example the even and odd numbers each 
share their own 500ms timer.

<demo>
<tippy-singleton name="even" delay="500"/>
<tippy-singleton name="odd" delay="500"/>
<template v-for="i in 9" :key="i">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'" >
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
</demo>

```vue
<tippy-singleton name="even" delay="500"/>
<tippy-singleton name="odd" delay="500"/>
<template v-for="i in 9" :key="i">
  <button v-tippy>{{i}}</button>
  <tippy :singleton="i % 2 === 0 ? 'even' : 'odd'" >
    {{i % 2 === 0 ? 'Even' : 'Odd'}} {{i}}
  </tippy>
</template>
```

## Props

### <code>name<type op=":"/> <type builtin="string"/></code> {#name}

Set the singleton name

### <code>overrides<type op=":"/> <type builtin="string"/><type punc="[]"/></code> {#overrides}

Tippy.js options that should be overridden by the individual instances.
See the [Tippy.js docs](https://atomiks.github.io/tippyjs/v6/addons/#overrides) for details.

### <code>move-transition<type op=":"/> <type builtin="string"/></code> {#move-transition}

A CSS transition to use when switching between tooltips in this singleton (e.g. `transform 0.2s ease-out`). 
See the [Tippy.js docs](https://atomiks.github.io/tippyjs/v6/addons/#smooth-transitions) for details.

### Common props

`<tippy-singleton>` shares all the [common props from `<tippy>`](tippy.md#common-props)

## Events

### <code>add<type punc="("/><type link="https://atomiks.github.io/tippyjs/v6/tippy-instance/" type="tip"/><type punc=")"/></code> {#add}

`<tippy-singleton>` fires the `add` event whenever a tippy instance is added.

### <code>remove<type punc="("/><type link="https://atomiks.github.io/tippyjs/v6/tippy-instance/" type="tip"/><type punc=")"/></code> {#remove}

`<tippy-singleton>` fires the `add` event whenever a tippy instance is removed.

### Common events

`<tippy-singleton>` shares all the [common events from `<tippy>`](tippy.md#common-events)
