import tippy, {Instance as TippyInstance, LifecycleHooks, Props} from "tippy.js";
import {computed, Ref, ToRefs, toRefs, watch} from "vue";
import {ComponentPropsOptions, ExtractPropTypes, PropType, SetupContext} from "@vue/runtime-core";

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

export type Plugin<P extends ComponentPropsOptions = {}> = {
  props: P,
  setup?(props: Required<ToRefs<ExtractPropTypes<P>>> & Record<string, Ref<unknown>>, tip: Ref<TippyInstance | undefined>): void
  build?(props: Required<ToRefs<ExtractPropTypes<P>>> & Record<string, Ref<unknown>>, options: Partial<Props>): void
}

/**
 * Infers the plugin type to provide type hinting for the parameter
 */
export function inferPlugin<P extends ComponentPropsOptions>(plugin: Plugin<P>): Plugin<P> {
  return plugin
}

/**
 * Creates a plugin that exposes a Tippy.js option as a Vue prop
 * @param name The name of the Tippy.js option
 * @param type The type of the Vue property (e.g. `String`, `Boolean`, etc.)
 * @param def The default value, if any
 */
export function optionPlugin<T extends keyof Props>(name: T, type?: PropType<any>, def?: Props[T]): Plugin<Record<T, { type: PropType<Props[T]>, required: false }>> {
  return {
    props: {
      [name]: {
        type: type ? type : null,
        required: false,
        default: def,
      },
    } as Record<T, {type: PropType<Props[T]>, required: false, default: typeof def}>,
    build(props, options) {
      if (props[name].value !== undefined) {
        options[name] = props[name].value;
      }
    }
  }
}

export function commonSetup<P extends Plugin[], E extends typeof commonEmits>(
    props: Record<string, unknown>,
    plugins: P,
    baseContext: SetupContext<E>,
    tip: Ref<TippyInstance | undefined>,
    hooks?: Partial<LifecycleHooks>,
) {
  const context = baseContext as unknown as SetupContext<typeof commonEmits>

  let refs = toRefs(props)
  const tippyOptions = computed<Partial<Props>>(() => {
    const options: Partial<Props> = {}

    for (const plugin of plugins) {
      let buildFn = plugin.build
      if(buildFn) buildFn(refs, options)
    }

    options.onShow = joinCallbacks(instance => context.emit("show", instance), hooks && hooks.onShow, options.onShow)
    options.onShown = joinCallbacks(instance => context.emit("shown", instance), hooks && hooks.onShown, options.onShown)
    options.onHidden = joinCallbacks(instance => context.emit("hidden", instance), hooks && hooks.onHidden, options.onHidden)
    options.onHide = joinCallbacks(instance => context.emit("hide", instance), hooks && hooks.onHide, options.onHide)
    options.onMount = joinCallbacks(instance => context.emit("mount", instance), hooks && hooks.onMount, options.onMount)
    options.onTrigger = joinCallbacks((instance, event) => context.emit("trigger", instance, event), hooks && hooks.onTrigger, options.onTrigger)
    options.onUntrigger = joinCallbacks((instance, event) => context.emit("untrigger", instance, event), hooks && hooks.onUntrigger, options.onUntrigger)

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

function joinCallbacks<Args extends any[], Return>(
    ...callbacks: (((...args: Args) => Return) | undefined)[]
): (...args: Args) => Return {
  return (...args: Args) => {
    let result
    for(let callback of callbacks) {
      if(callback)
        result = callback(...args)
    }
    return result as Return
  }
}
