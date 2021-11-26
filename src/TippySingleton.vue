<template>
  <div class="tippy-singleton" :data-tippy-singleton="name"></div>
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

@Options({name: "tippy-singleton"})
export default class TippySingleton extends Vue {
  @Prop({type: String, required: false, default: ''})
  name!: string

  @Prop({type: Object, required: false})
  props!: Partial<CreateSingletonProps>

  /**
   * Whether the tooltip should be enabled
   */
  @Prop({required: false, type: Boolean, default: true})
  enabled!: boolean

  private instances: TippyInstance[] = []

  private singleton!: CreateSingletonInstance

  mounted() {
    this.$el._tippySingleton = this
    this.singleton = createSingleton(this.instances, this.props)
    if (!this.enabled) {
      this.singleton.disable();
    }
  }

  remove(instance: TippyInstance): void {
    let index = this.instances.indexOf(instance)
    if(index !== -1) {
      this.instances.splice(index, 1)
      this.singleton.setInstances(this.instances)
    }
  }

  add(instance: TippyInstance): void {
    if(this.instances.indexOf(instance) !== -1) {
      return
    }
    this.instances.push(instance)
    this.singleton.setInstances(this.instances)
  }

  @Watch("overrides", {deep: true})
  private overridesChanged() {
    this.singleton.setProps(this.props)
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

<style scoped>
.tippy-singleton {
  display: none;
}
</style>
