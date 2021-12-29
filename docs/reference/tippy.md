# `<tippy>`

For anything other than the simplest tooltips, the `<tippy>` component will be the best (or only) option. When it gets
mounted it searches for a matching [`v-tippy` target](v-tippy.md#target-mode) and binds itself to that element. Details
on the search algorithm are in the [target binding](#target-binding) section.

## Example

The basic usage of `<tippy>` involves marking an element as a tippy target and then adding a matching `<tippy>` sibling 
element.

<demo v-slot="{seconds}">
<button v-tippy>Plain</button>
<tippy>Plain time: {{seconds}}</tippy>
<button v-tippy:html>HTML</button>
<tippy target="html">Bold time: <b>{{seconds}}</b></tippy>
</demo>

```vue
<button v-tippy>Plain</button>
<tippy>Plain time: {{seconds}}</tippy>
<button v-tippy:html>HTML</button>
<tippy target="html">Bold time: <b>{{seconds}}</b></tippy>
```

## Props

Note that a bare attribute is identical to `''`. This is used for several flag-like properties. 
(e.g. `<tippy interactive></tippy>`)

### <code>target<type op=":"/> <type builtin="string"/> <type op="|"/> <type string="'_parent'"/></code> {#target}

Sets the `v-tippy` target name this component will bind to. When set to `_parent`, it will bind to its direct parent 
element. Details on how exactly this binding process works are in the [target binding](#target-binding) section.

### <code>deep-search<type op=":"/> <type builtin="boolean"/> <type op="|"/> <type string="''"/></code> {#deep-search}

When specified, the component will perform the target search using `querySelector` on its parent, as opposed to only
searching its siblings. 

### <code>singleton<type op=":"/> <type builtin="string"/> <type op="|"/> <type string="''"/></code> {#singleton}

The name of a `<tippy-singleton>` to bind to. Details on how singleton binding works are in the
[singleton binding](#singleton-binding) section.

### <code>visible<type op=":"/> <type builtin="boolean"/></code> {#visible}

Controls the visibility of the tooltip when the [`trigger`](#trigger) is set to `'manual'`. To manually show/hide the 
tooltip when using another trigger, use `component.tip.show()` and `component.tip.hide()`

## Common props

These options are common to both `<tippy>` and `<tippy-singleton>`

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

Whether to hide the tooltip when clicking outside it. This defaults to false when the using the `'manual'` 
[`trigger`](#trigger) and true otherwise. (setting the prop to a non-null value overrides this default)

### <code>delay<type op=":"/> <type builtin="string"/> <type op="|"/> <type builtin="number"/> <type op="|"/> <type class="Array"/></code> {#delay}

The [Tippy.js delay property](https://atomiks.github.io/tippyjs/v6/all-props/#delay), but with some added parsing for
convenience. The property supports directly passing either a number or an array to the underlying tippy instance. If
passed a string, it will either parse it as a number or as two comma-separated elements, each of which can be either a
positive number or a `-`, which correlates to null in the two-element-array form of the Tippy.js prop

```vue
<!-- show and hide delay are 100ms -->
<tippy delay="100"></tippy> 
<!-- show delay is 100ms, hide delay is 200ms -->
<tippy delay="100,200"></tippy>
<!-- show delay is 100ms, hide delay is the default -->
<tippy delay="100,-"></tippy> 
```

## Events

### <code>attach<type punc="("/><type link="https://atomiks.github.io/tippyjs/v6/tippy-instance/" type="tip"/><type punc=")"/></code> {#attach}

`<tippy>` fires the `attach` event after the tippy instance is been created and has been attached to the target element.

### Common events

The `<tippy>` component exposes several of the 
[Tippy.js events](https://atomiks.github.io/tippyjs/v6/all-props/#onhidden) as Vue events:

| Tippy.js event | Vue event | Vue event parameters |
|----------------|-----------|----------------------|
| [`onShow`](https://atomiks.github.io/tippyjs/v6/all-props/#onshow) | `show` | `(tip)` |
| [`onShown`](https://atomiks.github.io/tippyjs/v6/all-props/#onshown) | `shown` | `(tip)` |
| [`onHidden`](https://atomiks.github.io/tippyjs/v6/all-props/#onhidden) | `hidden` | `(tip)` |
| [`onHide`](https://atomiks.github.io/tippyjs/v6/all-props/#onhide) | `hide` | `(tip)` |
| [`onMount`](https://atomiks.github.io/tippyjs/v6/all-props/#onmount) | `mount` | `(tip)` |
| [`onTrigger`](https://atomiks.github.io/tippyjs/v6/all-props/#ontrigger) | `trigger` | `(tip, triggerEvent)` |
| [`onUntrigger`](https://atomiks.github.io/tippyjs/v6/all-props/#onuntrigger) | `untrigger` | `(tip, triggerEvent)` |

## Target Binding

After the `<tippy>` element is mounted it will search for an element with a matching `v-tippy` name, starting with the
nearest preceding siblings and then the subsequent siblings. This allows easily creating lists, since you can repeat 
tippy elements without them interfering. 

The default algorithm only searches among the `<tippy>` element's direct siblings. If you need to search through the 
entire hierarchy you can use the [`deep-search`](#deep-search) flag, which will use `querySelector` on the `<tippy>` 
component's parent element.

```vue
<!-- Search order: -->
<button></button> <!-- 3 -->
<button></button> <!-- 2 -->
<button></button> <!-- 1 -->
<tippy></tippy>
<button></button> <!-- 4 -->
<button></button> <!-- 5 -->
<button></button> <!-- 6 -->

<!-- Lists: -->
<button v-tippy>Item 1</button> 
<tippy>Tip 1</tippy> <!-- binds to the previous button -->
<button v-tippy>Item 2</button>
<tippy>Tip 2</tippy> <!-- binds to the previous button -->

<!-- Only siblings: -->
<button v-tippy></button> <!-- won't search outside its parent-->
<div>
  <tippy></tippy>
  <div>
    <button v-tippy></button> <!-- won't drill into nested elements -->
  </div>
</div>
```

Because of the order that things are mounted, `<tippy>` defers this check until the tick after it gets mounted. If it
searched immediately, subsequent elements may not be fully mounted, and so `v-tippy` won't have had a chance to add the
`data-tippy-target` attribute. See [`Vue.nextTick`](https://v3.vuejs.org/api/global-api.html#nexttick) for 
information on Vue ticks.

## Singleton Binding

The algorithm for binding to a `<tippy-singleton>` is in essence the same as target binding, but applied to all the 
component's ancestors. It first applies the standard search order among its siblings, then its parent's siblings, then 
up the hierarchy until it finds a match.

```vue
<!-- Search order: -->
<button></button>   <!-- 5 -->
<div>
  <button></button> <!-- 2 -->
  <button></button> <!-- 1 -->
  <tippy singleton></tippy>
  <button></button> <!-- 3 -->
  <button></button> <!-- 4 -->
</div>
<button></button>   <!-- 6 -->

<!-- Lists: -->
<tippy-singleton/>
<button v-tippy>Item 1</button>
<tippy singleton>Tip 1</tippy>
<div>
  <button v-tippy>Item 2</button>
  <tippy singleton>Tip 2</tippy>
</div>

<!-- Nearest parent: -->
<tippy-singleton/>
<div>
  <tippy-singleton/> <!-- They'll bind here -->
  <div>
    <tippy singleton></tippy>
    <tippy singleton></tippy>
    <tippy singleton></tippy>
  </div>
</div>
```
