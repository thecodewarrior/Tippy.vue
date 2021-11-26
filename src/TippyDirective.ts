import tippy, {Instance as TippyInstance} from "tippy.js";
import {createOptions} from "./TippyOptions";
import {Directive, DirectiveBinding, VNode} from "vue";

declare global {
  interface HTMLElement {
    _tippy?: TippyInstance
  }
}

const TippyDirective: Directive = {
  mounted(el: any, binding: DirectiveBinding, vnode: VNode): void {
    if (binding.value === undefined) {
      el.dataset.tippyTarget = binding.arg ?? ""
    } else {
      tippy(el, createOptions(binding.value, vnode))
    }
  },
  beforeUnmount(el: any): void {
    if (el.dataset.tippyTarget !== undefined) {
      delete el.dataset.tippyTarget;
    } else if (el._tippy) {
      el._tippy.destroy()
    }
  },
  updated(el: any, binding: DirectiveBinding, vnode: VNode): void {
    if (el.dataset.tippyTarget !== undefined) {
      el.dataset.tippyTarget = binding.arg ?? ""
    } else {
      if(el._tippy) {
        el._tippy.setProps(createOptions(binding.value, vnode))
      } else {
        tippy(el, createOptions(binding.value, vnode))
      }
    }
  }
}

export default TippyDirective
