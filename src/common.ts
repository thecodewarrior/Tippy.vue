import {Instance as TippyInstance, Placement, Props} from "tippy.js";
import {computed, ExtractPropTypes, PropType, Ref, toRefs, watch} from "vue";
import {SetupContext} from "@vue/runtime-core";
import {injectCallback} from "./utils";

export const commonEmits = {
  mount: (instance: TippyInstance) => true,
  show: (instance: TippyInstance) => true,
  shown: (instance: TippyInstance) => true,
  hidden: (instance: TippyInstance) => true,
  hide: (instance: TippyInstance) => true,
  trigger: (instance: TippyInstance, event: Event) => true,
  untrigger: (instance: TippyInstance, event: Event) => true,
}

export const commonProps = {
  /**
   * Extra options for tippy.js
   */
  extra: {
    type: Object as PropType<Partial<Props>>,
    required: false,
  },

  /**
   * Whether the tooltip should be enabled
   */
  enabled: {
    type: Boolean,
    required: false,
    default: true,
  },

  /**
   * Where to place the tooltip relative to the target element
   */
  placement: {
    type: String as PropType<Placement>,
    required: false,
    default: 'top',
  },

  /**
   * Whether the tippy should *always* be appended to the `<body>`. You don't need to specify a value for this property,
   * its presence is sufficient (e.g. `<tippy on-body>`).
   *
   * Normally, tooltips will be appended to the document body element, *however*, interactive elements are appended
   * adjacent to their trigger, in the interest of maintaining keyboard focus order.
   * [more info](https://atomiks.github.io/tippyjs/v6/accessibility/#clipping-issues)
   *
   * This can cause zIndex issues, so sometimes it's necessary to put an interactive tooltip on the body element.
   *
   * This is a shorthand for `appendTo: () => document.body` in the `extra` property. (Note that you can't access
   * `document` directly in a vue template, so you would have to use a computed property if you wanted to set this in
   * `extra` yourself.
   */
  onBody: {
    type: Boolean,
    required: false,
  },

  /**
   * Whether the tippy should be interactive. You don't need to specify a value for this property, its presence is
   * sufficient (e.g. `<tippy interactive>`).
   *
   * This is a shorthand for `interactive: true` in the `extra` property.
   */
  interactive: {
    required: false,
    type: Boolean
  },

  /**
   * The events that trigger the tooltip. Setting the trigger key in `extra` will override this property.
   */
  trigger: {
    type: String,
    required: false,
  },

  /**
   * Whether to hide the tooltip when the target element is clicked. Defaults to false when using the `'manual'`
   * trigger, otherwise defaults to true.
   */
  hideOnClick: {
    type: Boolean as PropType<boolean | null>,
    required: false,
    default: null,
  },
}

export const commonVisibleProp = {
  /**
   * Only used when using the manual trigger. To show/hide when using another trigger, use `tippy().show()` and
   * `tippy().hide()`
   */
  visible: {
    type: Boolean,
    required: false,
  },
}

export function commonSetup<E extends typeof commonEmits>(
    props: ExtractPropTypes<typeof commonProps>,
    baseContext: SetupContext<E>,
    tip: Ref<TippyInstance | undefined>,
    transformOptions: (options: Partial<Props>) => Partial<Props> = value => value
) {
  const context = baseContext as unknown as SetupContext<typeof commonEmits>

  const tippyOptions = computed<Partial<Props>>(() => {
    const options: Partial<Props> = {}

    if(props.trigger) {
      options.trigger = props.trigger;
      if(props.trigger === 'manual')
        options.hideOnClick = false;
    }

    if(props.placement) {
      options.placement = props.placement;
    }
    if(props.onBody === true) {
      options.appendTo = () => document.body;
    }
    if(props.interactive === true) {
      options.interactive = true;
    }
    if(props.hideOnClick !== null) {
      options.hideOnClick = props.hideOnClick
    }
    Object.assign(options, props.extra || {});

    options.onShow = injectCallback(options.onShow, instance => context.emit("show", instance))
    options.onShown = injectCallback(options.onShown, instance => context.emit("shown", instance))
    options.onHidden = injectCallback(options.onHidden, instance => context.emit("hidden", instance))
    options.onHide = injectCallback(options.onHide, instance => context.emit("hide", instance))
    options.onMount = injectCallback(options.onMount, instance => context.emit("mount", instance))
    options.onTrigger = injectCallback(options.onTrigger, (instance, event) => context.emit("trigger", instance, event))
    options.onUntrigger = injectCallback(options.onUntrigger, (instance, event) => context.emit("untrigger", instance, event))

    return transformOptions(options);
  })

  const propRefs = toRefs(props)
  watch(propRefs.enabled, value => {
      if (value) {
        tip.value?.enable();
      } else {
        tip.value?.hide();
        tip.value?.disable();
      }
  })

  const visibleRef = (propRefs as any)['visible']
  if(visibleRef) {
    watch(visibleRef, value => {
      if (props.trigger !== 'manual') return;
      if (value) {
        tip.value?.show();
      } else {
        tip.value?.hide();
      }
    })
  }

  watch(tippyOptions, value => {
    tip.value?.setProps(value)
  }, {
    deep: true
  })

  return {
    tippyOptions
  }
}