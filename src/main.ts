import {Plugin} from "vue";
import Tippy from "./Tippy";
import TippyDirective from "./TippyDirective";
import TippySingleton from "./TippySingleton";

const TippyVue: Plugin = {
  install(app, ...options: any[]) {
    app.directive('tippy', TippyDirective)
    app.component('tippy', Tippy)
    app.component('tippy-singleton', TippySingleton)
  }
}

export {default as TippyDirective} from "./TippyDirective"
export {default as TippySingleton} from "./TippySingleton"
export {default as Tippy} from "./Tippy"
export default TippyVue
