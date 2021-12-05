import {defineComponent, h, nextTick, PropType, ref} from "vue";
import {commonEmits, commonProps, commonSetup, commonVisibleProp} from "./common";
import tippy, {Instance as TippyInstance} from "tippy.js";
import {findElement} from "./utils";
import {VueSingleton} from "./TippySingleton";

export default defineComponent({
  props: {
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
      type: String as PropType<string | '' | null>,
      required: false,
      default: null,
    },
    ...commonVisibleProp,
    ...commonProps
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
    }, this.$slots.default ? this.$slots.default() : [])
  },
  setup(props, context) {
    const tip = ref<TippyInstance>()
    const { tippyOptions } = commonSetup(props, context, tip)

    const singletonInstance = ref<VueSingleton>()
    const tippyTargetMissing = ref<boolean>(false)

    return {
      tip,
      tippyOptions,
      singletonInstance,
      tippyTargetMissing
    }
  },
  methods: {
    attach() {
      // destroy old tip
      if (this.tip) {
        const tip = this.tip
        this.tip = undefined
        this.singletonInstance?.remove(tip)
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
            return (el as any)?.dataset?.tippyTarget === targetValue
          }
        })
      }
      this.tippyTargetMissing = !target
      if (!target) {
        throw new Error(`Unable to find tippy target named ${this.target}`)
      }

      // find the singleton
      if (this.singleton != null) {
        const targetValue = this.singleton
        const singletonElement = findElement(this.$el, {
          test(el): boolean {
            return (el as any)?.dataset?.tippySingleton === targetValue
          },
          recurse: true
        })
        this.singletonInstance = singletonElement?._tippySingleton
      } else {
        this.singletonInstance = undefined
      }

      // create and bind tip
      this.tip = tippy(target, this.tippyOptions);
      if (!this.tip) {
        throw new Error(`Unable to create tippy instance`)
      }
      this.tip.setContent(this.$el)
      this.singletonInstance?.add(this.tip)

      if (!this.enabled) {
        this.tip.disable();
      }
      if (this.trigger === 'manual' && this.visible === true) {
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
    this.tip?.destroy()
  },
})