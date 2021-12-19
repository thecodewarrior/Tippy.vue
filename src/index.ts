import {App, Plugin} from "vue";
import Tippy from "./Tippy";
import TippyDirective from "./TippyDirective";
import TippySingleton from "./TippySingleton";
import tippy, {DefaultProps} from "tippy.js";

export function install(app: App, defaultProps?: Partial<DefaultProps>) {
  if (defaultProps) {
    tippy.setDefaultProps(defaultProps)
  }
  app.directive('tippy', TippyDirective)
  app.component('tippy', Tippy)
  app.component('tippy-singleton', TippySingleton)
}

export const TippyPlugin: Plugin = {
  install
}

export {default as TippyDirective} from "./TippyDirective"
export {default as TippySingleton} from "./TippySingleton"
export {default as Tippy} from "./Tippy"
