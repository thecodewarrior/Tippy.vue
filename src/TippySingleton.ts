import {defineComponent, h, PropType, ref} from "vue";
import {commonEmits, commonSetup, TippyProp} from "./common";
import {createSingleton, CreateSingletonInstance, Instance as TippyInstance} from "tippy.js";
import {
  delay,
  enabled, extra,
  hideOnClick,
  interactive,
  moveTransition,
  onBody,
  overrides,
  placement,
  trigger
} from "./builtin";

export type VueSingleton = {
  add(instance: TippyInstance): void,
  remove(instance: TippyInstance): void
}

declare global {
  interface Element {
    _tippySingleton?: VueSingleton
  }
}

export const defaultTippySingletonProps = [
  overrides,
  moveTransition,

  enabled,
  placement,
  onBody,
  interactive,
  trigger,
  hideOnClick,
  delay,
  extra,
]

export function createTippySingletonComponent(...plugins: TippyProp[]) {
  let pluginProps = {}
  for (const plugin of plugins) {
    Object.assign(pluginProps, plugin.props)
  }

  return defineComponent({
    props: {
      /**
       * The singleton name. Defaults to `""` (the default name used by `<tippy singleton>`)
       */
      name: {
        type: String as PropType<string>,
        required: false,
        default: ""
      },
      ...pluginProps
    },
    /* eslint-disable @typescript-eslint/no-unused-vars */
    emits: {
      add: (instance: TippyInstance) => true,
      remove: (instance: TippyInstance) => true,
      ...commonEmits
    },
    /* eslint-enable @typescript-eslint/no-unused-vars */
    render() {
      return h('div', {
        'style': 'display: none;',
        'data-tippy-singleton': this.name
      }, [])
    },
    setup(props, context) {
      const singleton = ref<CreateSingletonInstance>()
      const {tippyOptions} = commonSetup(props, plugins, context, singleton)

      const instances = ref<TippyInstance[]>([])

      return {
        tippyOptions,
        instances,
        singleton,
      }
    },
    mounted() {
      this.$el._tippySingleton = this
      this.singleton = createSingleton(this.instances as TippyInstance[], this.tippyOptions)
      if ((this as any).enabled === false) {
        this.singleton.disable();
      }
    },
    beforeUnmount() {
      this.singleton && this.singleton.destroy()
    },
    methods: {
      remove(instance: TippyInstance) {
        const index = this.instances.indexOf(instance)
        if (index === -1) {
          return
        }
        this.instances.splice(index, 1)
        this.$emit('remove', instance)
        this.singleton && this.singleton.setInstances(this.instances as TippyInstance[])
      },

      add(instance: TippyInstance) {
        if (this.instances.indexOf(instance) !== -1) {
          return
        }
        this.instances.push(instance)
        this.$emit('add', instance)
        this.singleton && this.singleton.setInstances(this.instances as TippyInstance[])
      }
    }
  })
}
