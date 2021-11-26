import {Plugin} from "vue";
import TippyDirective from "./TippyDirective";

const TippyVue: Plugin = {
  install(app, ...options: any[]) {
    app.directive('tippy', TippyDirective)
  }
}

export default TippyVue