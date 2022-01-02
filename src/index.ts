import {App, Plugin} from "vue";
import tippy, {DefaultProps} from "tippy.js";
import {TippyDirective} from "./TippyDirective";
import {createTippyComponent, defaultTippyProps} from "./Tippy";
import {createTippySingletonComponent, defaultTippySingletonProps} from "./TippySingleton";
import {TippyProp} from "./common";

export function install(app: App, options?: {
  tippyDefaults?: Partial<DefaultProps>,
  tippyProps?: TippyProp[],
  tippySingletonProps?: TippyProp[],
}) {
  if (options && options.tippyDefaults) {
    tippy.setDefaultProps(options.tippyDefaults)
  }
  app.directive('tippy', TippyDirective)
  app.component(
      'tippy',
      createTippyComponent(...(options && options.tippyProps || defaultTippyProps))
  )
  app.component(
      'tippy-singleton',
      createTippySingletonComponent(...(options && options.tippySingletonProps || defaultTippySingletonProps))
  )
}

export const TippyPlugin: Plugin = {
  install
}
export const Tippy = createTippyComponent(...defaultTippyProps)
export const TippySingleton = createTippySingletonComponent(...defaultTippySingletonProps)

export {TippyDirective} from "./TippyDirective"
export {createTippyComponent, defaultTippyProps} from "./Tippy";
export {createTippySingletonComponent, defaultTippySingletonProps} from "./TippySingleton";
export * as props from "./builtin"
