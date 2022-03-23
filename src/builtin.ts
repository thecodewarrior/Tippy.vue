import {watch} from "vue";
import {ComponentPropsOptions, PropType} from "@vue/runtime-core";
import {CreateSingletonProps, Placement, Props} from "tippy.js";
import {Plugin} from "./common";

function inferPlugin<P extends ComponentPropsOptions>(plugin: Plugin<P>): Plugin<P> {
  return plugin
}

/**
 * Extra options for tippy.js
 */
export const extra = inferPlugin({
  props: {
    extra: {
      type: Object as PropType<Partial<Props>>,
      required: false,
    },
  },
  build(props, options) {
    Object.assign(options, props.extra.value || {});
  }
})

/**
 * Whether the tooltip should be enabled
 */
export const enabled = inferPlugin({
  props: {
    enabled: {
      type: Boolean,
      required: false,
      default: true,
    }
  },

  setup(props, tip) {
    watch(props.enabled, value => {
      if (!tip.value) return;
      if (value) {
        tip.value.enable();
      } else {
        tip.value.hide();
        tip.value.disable();
      }
    })
  }
})

/**
 * Where to place the tooltip relative to the target element
 */
export const placement = inferPlugin({
  props: {
    placement: {
      type: String as PropType<Placement>,
      required: false,
      default: 'top',
    }
  },
  build(props, options) {
    if (props.placement.value) {
      options.placement = props.placement.value;
    }
  }
})

/**
 * Whether the tippy should be interactive. You don't need to specify a value for this property, its presence is
 * sufficient (e.g. `<tippy interactive>`).
 *
 * This is a shorthand for `interactive: true` in the `extra` property.
 */
export const interactive = inferPlugin({
  props: {
    interactive: {
      type: Boolean,
      required: false,
    }
  },

  build(props, options) {
    if (props.interactive.value !== undefined) {
      options.interactive = props.interactive.value;
    }
  }
})

/**
 * Whether to hide the tooltip when the target element is clicked. Defaults to false when using the `'manual'`
 * trigger, otherwise defaults to true.
 */
export const hideOnClick = inferPlugin({
  props: {
    hideOnClick: {
      type: Boolean,
      required: false,
    },
  },
  build(props, options) {
    if (props.hideOnClick.value !== undefined) {
      options.hideOnClick = props.hideOnClick.value;
    }
  }
})

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
export const onBody = inferPlugin({
  props: {
    onBody: {
      type: Boolean,
      required: false,
    },
  },

  build(props, options) {
    if (props.onBody.value === true) {
      options.appendTo = () => document.body;
    }
  }
})

/**
 * The events that trigger the tooltip. Setting the trigger key in `extra` will override this property.
 */
export const trigger = inferPlugin({
  props: {
    trigger: {
      type: String,
      required: false,
    },
  },
  build(props, options) {
    if (props.trigger.value) {
      options.trigger = props.trigger.value;
      if (props.trigger.value === 'manual' && options.hideOnClick === undefined) {
        options.hideOnClick = false;
      }
    }
  }
})

const delayPattern = /^([0-9]+)$|^([0-9]+|-)(?:\s*,\s*([0-9]+|-))?$/

function parseDelay(input: string | number | [number | null, number | null]): number | [number | null, number | null] | undefined {
  if (typeof input === "string") {
    let match = input.match(delayPattern)
    if (match) {
      if (match[1]) {
        return parseFloat(match[1])
      } else {
        return [
          match[2] === '-' ? null : parseFloat(match[2]),
          match[3] === '-' ? null : parseFloat(match[3])
        ]
      }
    } else {
      return undefined
    }
  } else {
    return input
  }
}

/**
 * The delay when showing or hiding the tooltip. One of four formats:
 * - A number (or number string) representing the delay in milliseconds
 * - A string consisting of two comma-separated elements representing the show and hide delays, each of which is
 *   either a number or a '-'
 * - An array of two `number | null` elements
 */
export const delay = inferPlugin<{
  delay: {
    type: PropType<string | number | [number | null, number | null]>;
    required: boolean;
    validator(value: unknown): boolean;
  }
}>({
  props: {
    delay: {
      type: [String, Number, Array] as PropType<string | number | [number | null, number | null]>,
      required: false,
      validator(value: unknown): boolean {
        return parseDelay(value as (string | number | [number | null, number | null])) !== undefined
      }
    }
  },
  build(props, options) {
    if (props.delay.value !== undefined) {
      options.delay = parseDelay(props.delay.value as string | number | [number | null, number | null])
    }
  }
})

/**
 * Only used when using the manual trigger. To show/hide when using another trigger, use `tippy().show()` and
 * `tippy().hide()`
 */
export const visible = inferPlugin({
  props: {
    visible: {
      type: Boolean,
      required: false,
    },
  },
  setup(props, tip) {
    watch(props.visible, value => {
      if (!tip.value || (props.trigger && props.trigger.value !== 'manual')) return;
      if (value) {
        tip.value.show();
      } else {
        tip.value.hide();
      }
    })
  }
})

/**
 * Tippy.js options that should be overridden by the individual instances.
 */
export const overrides = inferPlugin({
  props: {
    overrides: {
      type: Array as PropType<Array<keyof Props>>,
      required: false,
    },
  },
  build(props, options) {
    const sOptions = options as Partial<CreateSingletonProps>
    sOptions.overrides = (sOptions.overrides || []).concat(props.overrides.value || [])
  }
})

/**
 * The CSS transition to use when moving between instances within the singleton
 */
export const moveTransition = inferPlugin({
  props: {
    moveTransition: {
      type: String,
      required: false,
    }
  },
  build(props, options) {
    if (props.moveTransition.value)
      options.moveTransition = props.moveTransition.value
  }
})
