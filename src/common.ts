import tippy, {Instance as TippyInstance, Props} from "tippy.js";
import {ComponentPropsOptions, computed, ExtractPropTypes, Ref, ToRefs, toRefs, watch} from "vue";
import {SetupContext} from "@vue/runtime-core";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const commonEmits = {
  mount: (instance: TippyInstance) => true,
  show: (instance: TippyInstance) => true,
  shown: (instance: TippyInstance) => true,
  hidden: (instance: TippyInstance) => true,
  hide: (instance: TippyInstance) => true,
  trigger: (instance: TippyInstance, event: Event) => true,
  untrigger: (instance: TippyInstance, event: Event) => true,
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type TippyProp<P extends ComponentPropsOptions = {}> = {
  props: P,
  setup?(props: Required<ToRefs<ExtractPropTypes<P>>> & Record<string, Ref<unknown>>, tip: Ref<TippyInstance | undefined>): void
  build?(props: Required<ToRefs<ExtractPropTypes<P>>> & Record<string, Ref<unknown>>, options: Partial<Props>): void
}

export function commonSetup<P extends TippyProp[], E extends typeof commonEmits>(
    props: Record<string, unknown>,
    plugins: P,
    baseContext: SetupContext<E>,
    tip: Ref<TippyInstance | undefined>
) {
  const context = baseContext as unknown as SetupContext<typeof commonEmits>

  let refs = toRefs(props)
  const tippyOptions = computed<Partial<Props>>(() => {
    const options: Partial<Props> = {}

    for (const plugin of plugins) {
      let buildFn = plugin.build
      if(buildFn) buildFn(refs, options)
    }

    options.onShow = injectCallback(options.onShow, instance => context.emit("show", instance))
    options.onShown = injectCallback(options.onShown, instance => context.emit("shown", instance))
    options.onHidden = injectCallback(options.onHidden, instance => context.emit("hidden", instance))
    options.onHide = injectCallback(options.onHide, instance => context.emit("hide", instance))
    options.onMount = injectCallback(options.onMount, instance => context.emit("mount", instance))
    options.onTrigger = injectCallback(options.onTrigger, (instance, event) => context.emit("trigger", instance, event))
    options.onUntrigger = injectCallback(options.onUntrigger, (instance, event) => context.emit("untrigger", instance, event))

    return options;
  })

  for (const plugin of plugins) {
    let setupFn = plugin.setup
    if (setupFn) setupFn(refs, tip)
  }

  watch(tippyOptions, value => {
    if(tip.value)
      tip.value.setProps(value)
  }, {
    deep: true
  })

  return {
    tippyOptions
  }
}

function injectCallback<Args extends any[], Return>(
    existing: ((...args: Args) => Return) | undefined,
    callback: (...args: Args) => Return,
): (...args: Args) => Return {
  return (...args: Args) => {
    let result = callback(...args)
    if (existing)
      result = existing(...args)
    return result
  }
}
