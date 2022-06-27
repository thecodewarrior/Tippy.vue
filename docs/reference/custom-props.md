# Custom Props

```ts
type TippyProp = {
  // standard vue prop objects
  props: VueProps,
  // called in the vue composition setup function
  setup?(props: ToRefs<YourProps>, tip: Ref<TippyInstance | undefined>): void
  // called any time the props change
  build?(props: ToRefs<YourProps>, options: Partial<TippyJsProps>): void
}
```

For example:
```js
const animation = {
  props: {
    tAnimation: {
      type: String
    }
  },
  build(props, options) {
    if (props.tAnimation.value !== undefined)
      options.animation = props.tAnimation.value
  }
}
```
```js
// using the plugin
import {TippyPlugin, defaultTippyProps, defaultTippySingletonProps} from 'tippy.vue';

app.use(TippyPlugin, {
  tippyProps: [animation, ...defaultTippyProps],
  tippySingletonProps: [animation, ...defaultTippySingletonProps]
});

// or adding them individually
import {
  TippyDirective,
  createTippyComponent, defaultTippyProps,
  createTippySingletonComponent, defaultTippySingletonProps
} from 'tippy.vue';

app.directive('tippy', TippyDirective);
app.component('tippy', createTippyComponent(animation, ...defaultTippyProps));
app.component('tippy-singleton', createTippySingletonComponent(animation, ...defaultTippySingletonProps));
```
```html
<tippy t-animation="fade"></tippy>
```

You can even remove or replace existing props:
```js
import {
  createTippyComponent, props
} from 'tippy.vue';

app.component(
    'tippy',
    createTippyComponent(
        animation,

        props.visible,
        props.enabled,
        props.placement,
        //props.onBody,
        props.interactive,
        //props.trigger,
        //props.hideOnClick,
        //props.delay,
        props.extra,
    )
);
```

Tippy.vue provides a couple of helper functions for creating plugins. `optionPlugin` exposes a Tippy.js option directly
as a Vue prop, with an optional default value:
```js
import {optionPlugin} from 'tippy.vue';
const animation = optionPlugin("animation", String, "slide-in")
```
`inferPlugin` is primarily used for TypeScript. It improves the code completion when creating plugins by inferring the
plugin type. Otherwise, you would either have no code completion or have to manually specify the `props` type:
```ts
// no type checking
export const animation = {
  props: {
    animation: {
      type: String,
      required: false,
    }
  },
  // args are implicitly 'any'
  build(props, options) {
    // ...
  }
}

export const animation: Plugin<{
  // unnecessary duplication
  animation: {
    type: PropType<String>,
    required: boolean,
  }
}> = {
  props: {
    animation: {
      type: String,
      required: false,
    }
  },
  build(props, options) {
    // ...
  }
}

// everything is inferred
export const animation = inferPlugin({
  props: {
    animation: {
      type: String,
      required: false,
    }
  },
  build(props, options) {
    // ...
  }
})
```
