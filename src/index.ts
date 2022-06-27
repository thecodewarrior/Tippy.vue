import {App, Plugin as VuePlugin} from "vue";
import tippy, {DefaultProps} from "tippy.js";
import {TippyDirective} from "./TippyDirective";
import {createTippyComponent, defaultTippyProps, TippyComponentType} from "./Tippy";
import {createTippySingletonComponent, defaultTippySingletonProps, TippySingletonComponentType} from "./TippySingleton";
import {Plugin} from "./common";

export function install(app: App, options?: {
  tippyDefaults?: Partial<DefaultProps>,
  tippyProps?: Plugin[],
  tippySingletonProps?: Plugin[],
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

export const TippyPlugin: VuePlugin = {
  install
}
export const Tippy = createTippyComponent(...defaultTippyProps)
export const TippySingleton = createTippySingletonComponent(...defaultTippySingletonProps)

export type {Plugin, TippyComponentType, TippySingletonComponentType};
export {inferPlugin, optionPlugin} from './common'
export {TippyDirective} from "./TippyDirective";
export {createTippyComponent, defaultTippyProps} from "./Tippy";
export {createTippySingletonComponent, defaultTippySingletonProps} from "./TippySingleton";
export * as props from "./builtin";
