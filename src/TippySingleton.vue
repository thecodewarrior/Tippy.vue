<template>
  <div style="display: none;" :data-tippy-singleton="name"></div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {Prop, Watch} from 'vue-property-decorator'
import {createSingleton, CreateSingletonInstance, CreateSingletonProps, Instance as TippyInstance} from "tippy.js";

declare global {
  interface Element {
    _tippySingleton?: TippySingleton
  }
}

@Options({
  name: "tippy-singleton",
  emits: [
    'add', 'remove'
  ]
})
export default class TippySingleton extends Vue {
  @Prop({type: String, required: false, default: ''})
  name!: string

  @Prop({type: Object, required: false})
  extra!: Partial<CreateSingletonProps>

  /**
   * Whether the tooltip should be enabled
   */
  @Prop({required: false, type: Boolean, default: true})
  enabled!: boolean

  private instances: TippyInstance[] = []

  private singleton!: CreateSingletonInstance

  mounted() {
    this.$el._tippySingleton = this
    this.singleton = createSingleton(this.instances, this.extra)
    if (!this.enabled) {
      this.singleton.disable();
    }
  }

  unmounted() {
    this.singleton.destroy()
  }

  remove(instance: TippyInstance): void {
    let index = this.instances.indexOf(instance)
    if(index === -1) {
      return
    }
    this.instances.splice(index, 1)
    this.$emit('remove', instance)
    this.singleton.setInstances(this.instances)
  }

  add(instance: TippyInstance): void {
    if(this.instances.indexOf(instance) !== -1) {
      return
    }
    this.instances.push(instance)
    this.$emit('add', instance)
    this.singleton.setInstances(this.instances)
  }

  @Watch("extra", {deep: true})
  private extraChanged() {
    this.singleton.setProps(this.extra)
  }
  @Watch('enabled')
  private enabledChanged(val: boolean) {
    if (val) {
      this.singleton.enable();
    } else {
      this.singleton.hide();
      this.singleton.disable();
    }
  }
}
</script>
