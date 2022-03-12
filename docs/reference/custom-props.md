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

By convention, custom props should start with `t-` (`tCustomProp` in code). That's because the IntelliJ code completion 
has been configured to accept any `t-*` props as custom props. Vetur doesn't have that kind of pattern capability, so
custom properties won't be recognized in VSCode.
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
