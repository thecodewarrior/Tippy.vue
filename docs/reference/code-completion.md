# Code Completion

Tippy.vue supports code completion in VS Code using either Vetur or Volar, and in IntelliJ IDEA using their 
first-party Vue plugin. In both IDEs the autocomplete may not appear until you close and reopen the project.

## VS Code 

### Vetur

Tippy.vue includes Vetur's [`attributes.json` and `tags.json`](https://vuejs.github.io/vetur/guide/component-data.html#workspace-component-data)
files, so it should work out of the box. Vetur's system is much more rudimentary than JetBrains' web-types or 
`GlobalComponents`, so it doesn't have any type information and custom props won't be recognized.

### Volar

Volar supports directly reading component definitions from TypeScript definitions, a la [vuejs/core#3399](https://github.com/vuejs/core/pull/3399),
so it has full support for custom properties. Just add a `.d.ts` file to your project with this content:

```ts
import {TippyComponentType, TippySingletonComponentType, TippyDirective} from 'tippy.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Tippy: TippyComponentType
    TippySingleton: TippySingletonComponentType
  }
  export interface ComponentCustomProperties {
    vTippy: typeof TippyDirective
  }
}

export { }
```

If you have custom props you can add them as well. Just pass an array of them `[typeof prop1, typeof prop2, ...]` as the
first type parameter of the `TippyComponentType` and `TippySingletonType` types. If you aren't using the full set of
default props you'll have to update the second type parameter to reflect that.

```ts
import {customProp} from './wherever'
import {TippyComponentType, TippySingletonComponentType, TippyDirective} from 'tippy.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Tippy: TippyComponentType<[typeof customProp]>
    TippySingleton: TippySingletonComponentType<[typeof customProp]>
  }
  export interface ComponentCustomProperties {
    vTippy: typeof TippyDirective
  }
}

export { }
```

## IntelliJ IDEA

### web-types.json

Tippy.vue supports JetBrains' [`web-types.json`](https://github.com/JetBrains/web-types), and should work out of the box 
in IntelliJ IDEA version 2021.3.1 or later. The web-types file includes documentation for each property as well as 
detailed typechecking information (including autocomplete for the valid `position` prop values)

If the web-types still aren't working for you, it may be an issue with the IDE's indexing.
See [this web-types issue](https://github.com/JetBrains/web-types/issues/27#issuecomment-768307294) for details.

### GlobalComponents

The Vue plugin for IntelliJ IDEA 2022.1 EAP and later has support for `GlobalComponents`, which provides better custom
property support. It works the same as in [Volar](#volar) but with a few caveats.

* Directives using `ComponentCustomProperties` aren't supported, but the `web-types.json` should act as a fallback for 
  that. 
* The `web-types.json` file will still be used by the IDE, so removing a built-in property from the type in 
  `GlobalComponents` won't reflect in the code completion. You can still overwrite a property, however.
* When adding props, IDEA doesn't appear to support `typeof customProp`, even if you explicitly specify the type of the 
  `customProp` variable.

```ts
import {PropType} from "@vue/runtime-core";
import {TippyComponentType, TippySingletonComponentType, Plugin} from 'tippy.vue'

type CustomPropPlugin = Plugin<{ // can't use `typeof customProp`
  custom: {
    type: PropType<"off" | "slow" | "fast">,
  }
}>;

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Tippy: TippyComponentType<[CustomPropPlugin]>
    TippySingleton: TippySingletonComponentType<[CustomPropPlugin]>
  }
}

export { }
```
