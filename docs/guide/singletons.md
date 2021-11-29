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
<tippy-singleton :extra="{delay: 250}" move-transition="transform 0.1s ease-out"/>
<button v-tippy>Item 1</button>
<tippy singleton>Tip 1</tippy>
<button v-tippy>Item 2</button>
<tippy singleton>Tip 2</tippy>
<button v-tippy>Item 3</button>
<tippy singleton>Tip 3</tippy>
</demo>

```vue
<tippy-singleton :extra="{delay: 250}" move-transition="transform 0.1s ease-out"/>
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

## Unique Props

### <code>name<type op=":"/> <type builtin="string"/></code> {#name}

Set the singleton name

### <code>overrides<type op=":"/> <type builtin="string"/><type punc="[]"/></code> {#overrides}

Tippy.js options that should be overridden by the individual instances.
See the [Tippy.js docs](https://atomiks.github.io/tippyjs/v6/addons/#overrides) for details.

### <code>move-transition<type op=":"/> <type builtin="string"/></code> {#move-transition}

A CSS transition to use when switching between tooltips in this singleton (e.g. `transform 0.2s ease-out`). 
See the [Tippy.js docs](https://atomiks.github.io/tippyjs/v6/addons/#smooth-transitions) for details.

## Tippy props

These options are all to configure the tippy object

### <code>extra<type op=":"/> <type type="Props" link="https://atomiks.github.io/tippyjs/v6/all-props/"/></code> {#extra}

Extra [Tippy.js options](https://atomiks.github.io/tippyjs/v6/all-props/)

### <code>enabled<type op=":"/> <type builtin="boolean"/></code> {#enabled}

Whether the tooltip should be [enabled](https://atomiks.github.io/tippyjs/v6/methods/#disable)

### <code>placement<type op=":"/> <type type="Placement" link="https://atomiks.github.io/tippyjs/v6/all-props/#placement"/></code> {#placement}

The [Tippy.js placement](https://atomiks.github.io/tippyjs/v6/all-props/#placement). Defaults to `'top'`

### <code>interactive<type op=":"/> <type builtin="boolean"/> <type op="|"/> <type string="''"/></code> {#interactive}

The [Tippy.js interactive flag](https://atomiks.github.io/tippyjs/v6/all-props/#interactive). The `on-body` prop
implements the `appendTo: () => document.body` workaround mentioned in the linked documentation.

### <code>on-body<type op=":"/> <type builtin="boolean"/> <type op="|"/> <type string="''"/></code> {#on-body}

Whether to place an interactive tooltip in the `<body>` instead of next to the target. This can be useful when you need
to isolate the styles (a rogue selector may be trying to style the tooltip contents) or to
[avoid clipping issues](https://atomiks.github.io/tippyjs/v6/accessibility/#clipping-issues).

### <code>trigger<type op=":"/> <type builtin="string"/></code> {#trigger}

The [Tippy.js trigger](https://atomiks.github.io/tippyjs/v6/all-props/#trigger).

### <code>hide-on-click<type op=":"/> <type builtin="boolean"/> <type op="|"/> <type builtin="null"/></code> {#hide-on-click}

Whether to hide the tooltip when clicking outside it. Unless overridden by being set to a non-null value, this defaults
to false when the using the `'manual'` [`trigger`](#trigger) and true otherwise.

## Events

In addition to the `add` and `remove` events, which are fired when a tippy instance is added or removed, 
`<tippy-singleton>` exposes several of the [Tippy.js events](https://atomiks.github.io/tippyjs/v6/all-props/#onhidden) 
as Vue events

| Tippy.js event | Vue event | Vue event parameters |
|----------------|-----------|----------------------|
| [`onShow`](https://atomiks.github.io/tippyjs/v6/all-props/#onshow) | `show` | `(tip)` |
| [`onShown`](https://atomiks.github.io/tippyjs/v6/all-props/#onshown) | `shown` | `(tip)` |
| [`onHidden`](https://atomiks.github.io/tippyjs/v6/all-props/#onhidden) | `hidden` | `(tip)` |
| [`onHide`](https://atomiks.github.io/tippyjs/v6/all-props/#onhide) | `hide` | `(tip)` |
| [`onMount`](https://atomiks.github.io/tippyjs/v6/all-props/#onmount) | `mount` | `(tip)` |
| [`onTrigger`](https://atomiks.github.io/tippyjs/v6/all-props/#ontrigger) | `trigger` | `(tip, triggerEvent)` |
| [`onUntrigger`](https://atomiks.github.io/tippyjs/v6/all-props/#onuntrigger) | `untrigger` | `(tip, triggerEvent)` |

