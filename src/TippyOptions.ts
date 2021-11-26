import tippy, {Props} from "tippy.js";
import {VNode} from "vue";

function hook(options: any, optionName: string, listeners: any, listenerName: string) {
  const listener = listeners[listenerName]
  if(listener) {
    const old = options[optionName];
    options[optionName] = function (...args: any) {
      let result = listener.fns(...args)
      if(old) {
        const oldResult = old(...args)
        result = result || oldResult;
      }
      return result
    }
  }
}

export function createOptions(value: Partial<Props> | string, vnode: VNode): Partial<Props> {
  let opts = value;
  if (typeof opts === "string") {
    opts = {content: value as string};
  }
  if (opts == null) {
    opts = {};
  }

  const options: Partial<Props> = Object.assign({}, tippy.defaultProps, opts);

  // const listeners = vnode.component?.listeners ?? {}
  //
  // hook(options, 'onShow', listeners, 'tippy-show')
  // hook(options, 'onShown', listeners, 'tippy-shown')
  // hook(options, 'onHidden', listeners, 'tippy-hidden')
  // hook(options, 'onHide', listeners, 'tippy-hide')
  //
  // hook(options, 'onMount', listeners, 'tippy-mount')
  // hook(options, 'onTrigger', listeners, 'tippy-trigger')
  // hook(options, 'onUntrigger', listeners, 'tippy-untrigger')
  // hook(options, 'onClickOutside', listeners, 'tippy-clickoutside')

  return options;
}
