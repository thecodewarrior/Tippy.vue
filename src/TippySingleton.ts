import {defineComponent, h, PropType, ref, toRefs} from "vue";
import {commonEmits, commonProps, commonSetup} from "./common";
import {
  createSingleton,
  CreateSingletonInstance,
  CreateSingletonProps,
  Instance as TippyInstance,
  Props
} from "tippy.js";

export type VueSingleton = {
  add(instance: TippyInstance): void,
  remove(instance: TippyInstance): void
}

declare global {
  interface Element {
    _tippySingleton?: VueSingleton
  }
}

export default defineComponent({
  props: {
    /**
     * The singleton name. Defaults to `""` (the default name used by `<tippy singleton>`)
     */
    name: {
      type: String as PropType<string>,
      required: false,
      default: ""
    },
    /**
     * Tippy.js options that should be overridden by the individual instances.
     */
    overrides: {
      type: Array as PropType<Array<keyof Props>>,
      required: false,
    },
    /**
     * The CSS transition to use when moving between instances within the singleton
     */
    moveTransition: {
      type: String,
      required: false,
    },
    ...commonProps
  },
  emits: {
    add: (instance: TippyInstance) => true,
    remove: (instance: TippyInstance) => true,
    ...commonEmits
  },
  render() {
    return h('div', {
      'style': 'display: none;',
      'data-tippy-singleton': this.name
    }, [])
  },
  setup(props, context) {
    const singleton = ref<CreateSingletonInstance>()
    const { tippyOptions } = commonSetup(props, context, singleton, options => {
      const sOptions = options as CreateSingletonProps
      sOptions.overrides = (sOptions.overrides ?? []).concat(props.overrides ?? [])
      options.moveTransition = props.moveTransition
      return options
    })

    const instances = ref<TippyInstance[]>([])

    return {
      tippyOptions,
      instances,
      singleton,
    }
  },
  mounted() {
    this.$el._tippySingleton = this
    this.singleton = createSingleton(this.instances as TippyInstance[], this.extra)
    if (!this.enabled) {
      this.singleton.disable();
    }
  },
  beforeUnmount() {
    this.singleton?.destroy()
  },
  methods: {
    remove(instance: TippyInstance) {
      const index = this.instances.indexOf(instance)
      if(index === -1) {
        return
      }
      this.instances.splice(index, 1)
      this.$emit('remove', instance)
      this.singleton?.setInstances(this.instances as TippyInstance[])
    },

    add(instance: TippyInstance) {
      if(this.instances.indexOf(instance) !== -1) {
        return
      }
      this.instances.push(instance)
      this.$emit('add', instance)
      this.singleton?.setInstances(this.instances as TippyInstance[])
    }
  }
})