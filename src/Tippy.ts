import {ComputedRef, defineComponent, h, nextTick, Ref, ref} from "vue";
import {PropType} from "@vue/runtime-core";
import {commonEmits, commonSetup, Plugin} from "./common";
import tippy, {Instance as TippyInstance, Props as TippyProps} from "tippy.js";
import {VueSingleton} from "./TippySingleton";
import {
  delay,
  enabled,
  extra,
  hideOnClick,
  interactive,
  onBody,
  placement,
  trigger,
  visible
} from "./builtin";
import {DefineComponent, ExtractPluginProps} from "./types";

export const defaultTippyProps = [
  visible,

  enabled,
  placement,
  onBody,
  interactive,
  trigger,
  hideOnClick,
  delay,
  extra,
]

const baseProps = {
  /**
   * The v-tippy target name. Defaults to `""` (the default name used by `v-tippy`)
   */
  target: {
    type: String as PropType<string | '_parent'>,
    required: false,
    default: ""
  },

  /**
   * Whether to perform a deep search for targets (using querySelector) or to only search for direct siblings.
   */
  deepSearch: {
    type: Boolean,
    required: false,
    default: false
  },

  singleton: {
    type: String as PropType<boolean | string | '' | null>,
    required: false,
    default: null,
  },

  /**
   * Whether to eagerly render the content or only render when the tooltip is visible
   */
  eager: {
    type: Boolean,
    required: false,
    default: false
  },
}

export type TippyComponentType<Plugins extends Plugin[] = [], DefaultPlugins extends Plugin[] = typeof defaultTippyProps> = DefineComponent<//
    /* Props = */ typeof baseProps & ExtractPluginProps<Plugins[number] | DefaultPlugins[number]>,
    /* Emits = */ typeof commonEmits & { attach: (instance: TippyInstance) => true },
    /* Data = */ { tip: Ref<TippyInstance | undefined>, tippyOptions: ComputedRef<Partial<TippyProps>> },
    /* Methods = */ { attach(): void }>;

export function createTippyComponent<P extends Plugin[]>(...plugins: P): TippyComponentType<P> {
  let pluginProps = {}
  for (const plugin of plugins) {
    Object.assign(pluginProps, plugin.props)
  }

  return defineComponent({
    props: {
      ...baseProps,
      ...pluginProps
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    emits: {
      attach: (instance: TippyInstance) => true,
      ...commonEmits
    },
    /* eslint-enable @typescript-eslint/no-unused-vars */
    render() {
      return h('div', {
        'tippy-missing-target': this.tippyTargetMissing ? '' : undefined,
      }, (this.$props.eager || this.singletonInstance || this.shouldRenderContent) && this.$slots.default ? this.$slots.default() : [])
    },
    setup(props, context) {
      const tip = ref<TippyInstance>()
      const singletonInstance = ref<VueSingleton>()
      const tippyTargetMissing = ref<boolean>(false)
      const shouldRenderContent = ref<boolean>(false)

      const { tippyOptions } = commonSetup(props, plugins, context, tip, {
        onShow() {
          shouldRenderContent.value = true
        },
        onHidden() {
          shouldRenderContent.value = false
        }
      })

      return {
        tip,
        tippyOptions,
        singletonInstance,
        tippyTargetMissing,
        shouldRenderContent,
      }
    },
    methods: {
      attach() {
        // destroy old tip
        if (this.tip) {
          const tip = this.tip
          this.tip = undefined
          if(this.singletonInstance) {
            this.singletonInstance.remove(tip)
            this.singletonInstance = undefined
          }
          tip.destroy();
        }

        // find the target
        let target: Element | null
        if(this.target === '_parent') {
          target = this.$el.parentElement
        } else if (this.deepSearch) {
          target = this.$el.parentElement.querySelector(`[data-tippy-target="${this.target}"]`);
        } else {
          const targetValue = this.target
          target = findElement(this.$el, {
            test(el): boolean {
              let a = el as any
              return a && a.dataset && a.dataset.tippyTarget === targetValue
            }
          })
        }
        this.tippyTargetMissing = !target
        if (!target) {
          throw new Error(`Unable to find tippy target named '${this.target}'`)
        }

        // find the singleton
        if (this.singleton != null) {
          const targetValue = this.singleton
          const singletonElement = findElement(this.$el, {
            test(el): boolean {
              let a = el as any
              return a && a.dataset && a.dataset.tippySingleton === targetValue
            },
            recurse: true
          })
          this.singletonInstance = singletonElement ? singletonElement._tippySingleton : undefined;
        } else {
          this.singletonInstance = undefined
        }

        // create and bind tip
        this.tip = tippy(target, this.tippyOptions);
        if (!this.tip) {
          throw new Error(`Unable to create tippy instance`)
        }
        this.tip.setContent(this.$el)
        this.singletonInstance && this.singletonInstance.add(this.tip)

        if((this as any).enabled === false) {
          this.tip.disable();
        }
        if ((this as any).trigger === 'manual' && (this as any).visible === true) {
          this.tip.show();
        }

        this.$emit("attach", this.tip);
      }
    },
    async mounted() {
      await nextTick()
      this.attach()
    },
    beforeUnmount() {
      this.tip && this.tip.destroy()
    },
  }) as unknown as TippyComponentType<P>
}

type StandardSearch = {
  /**
   * Tests if an element matches
   */
  test(element: Element): boolean,
  /**
   * Whether to recurse up through the element's parents.
   */
  recurse?: boolean,
  /**
   * Whether to test the starting element. When recursing this also controls whether to test the element's direct
   * parents.
   */
  selftest?: boolean
}

/**
 * @param start the element to start at. will not test the starting element or any of its parents
 * @param search the search parameters to use
 */
function findElement(start: any, search: StandardSearch): Element | null {
  let found: Element | null = null
  let current = start
  do {
    found = findSibling(current, search.test, search.selftest === undefined ? false : search.selftest)
    current = current.parentElement
  } while(search.recurse && current && !found)
  return found
}

function findSibling(element: Element, test: (element: Element) => boolean, testSelf: boolean): Element | null {
  if(testSelf && test(element)) {
    return element
  }
  for(let sibling = element.previousElementSibling; sibling; sibling = sibling.previousElementSibling) {
    if (test(sibling))
      return sibling;
  }
  for(let sibling = element.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
    if (test(sibling))
      return sibling;
  }
  return null;
}
