# `v-tippy`

The `v-tippy` directive has two "modes", which are determined when the directive is first mounted. If the directive has 
no value (e.g. `<div v-tippy>`) it starts up in ["target mode"](#target-mode), otherwise it starts up in 
["inline mode"](#inline-mode).

## Inline mode

The `v-tippy` directive can be used to define a tooltip in-line, either as a string or a 
[Tippy.js props object](https://atomiks.github.io/tippyjs/v6/all-props/). The tooltip will automatically update if the text 
or any of the props change.

<demo v-slot="{seconds}">
<button v-tippy="'Static text'">Static text</button>
<button v-tippy="'Current time: ' + seconds">Dynamic text</button>
<button v-tippy="{content: `Seconds: ${seconds}`, placement: 'right'}">Props object</button>
</demo>

```vue
<button v-tippy="'Static text'">Static text</button>
<button v-tippy="'Current time: ' + seconds">Dynamic text</button>
<button v-tippy="{content: `Seconds: ${seconds}`, placement: 'right'}">Props object</button>
```

## Target mode

When started up in target mode, the directive marks itself as a target for the [`<tippy>` component](tippy.md). Note 
that `<tippy>` components won't automatically respond when the marker is updated, so in most cases a dynamic argument
won't work. Internally, the element is marked with `data-tippy-target="arg"`.

The details of how `<tippy>` binds to this marker are covered in the [`<tippy>` docs](tippy.md#target-binding).

<demo>
<button v-tippy>Default marker</button> <!-- Defaults to "" -->
<tippy>Default target</tippy>
<button v-tippy:name>Named marker</button>
<tippy target="name">Named target</tippy>
</demo>

```vue
<button v-tippy>Default marker</button> <!-- Defaults to "" -->
<tippy>Default target</tippy>
<button v-tippy:name>Named marker</button>
<tippy target="name">Named target</tippy>
```
