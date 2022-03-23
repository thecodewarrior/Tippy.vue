import tippy, {Instance as TippyInstance, Props} from "tippy.js";
import {Directive, DirectiveBinding} from "vue";

const _mode = Symbol("v-tippy mode")
type VTippyMode = 'inline' | 'target'
const _tippy = Symbol("v-tippy instance")

declare global {
  interface HTMLElement {
    [_mode]?: VTippyMode
    [_tippy]?: TippyInstance
  }
}

function createOptions(value: string | Partial<Props> | undefined): Partial<Props> {
  if(typeof value === 'string') {
    return {content: value}
  } else if(typeof value === 'undefined') {
    return {}
  } else {
    return value
  }
}

export const TippyDirective: Directive<HTMLElement, string | Partial<Props> | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | Partial<Props> | undefined>): void {
    if (binding.value === undefined) {
      el[_mode] = 'target'
      el.dataset.tippyTarget = binding.arg || ""
    } else {
      el[_mode] = 'inline'
      el[_tippy] = tippy(el, createOptions(binding.value))
    }
  },
  beforeUnmount(el: HTMLElement): void {
    if (el[_mode] === 'inline') {
      let tip = el[_tippy]
      tip && tip.destroy()
    } else {
      delete el.dataset.tippyTarget;
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string | Partial<Props> | undefined>): void {
    if (el[_mode] === 'inline') {
      let tip = el[_tippy]
      tip && tip.setProps(createOptions(binding.value))
    }
  }
}
