<template>
  <div :class="{'tippy-missing-target': tippyTargetMissing}">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import {Prop, Watch} from 'vue-property-decorator'
import tippy, {Instance as TippyInstance, Placement, Props} from "tippy.js";
import TippySingleton from "@/TippySingleton.vue";

/**
 * A tooltip which will be attached to another element. The target element should be specified using the
 * `v-tippy` directive. When first being mounted, this component will search among its peers for a matching element.
 * This means that so long as your target name is unique among its peers (and optionally their descendents), the tippy
 * will bind to that element.
 *
 * When the target isn't specified, this will bind to an "unnamed" (`""`) target. By default this will only bind to
 * immediate sibling elements. To search recursively, set `deepSearch` to a truthy value.
 *
 * In order to be used as a binding point, the `v-tippy` MUST NOT have a value. `v-tippy=""` does not count.
 * `v-tippy="undefined"` does not count. The directive uses the presence of any *expression* as indication.
 *
 * For example:
 * ```
 * <div>
 *   <div v-tippy>Hello, I'm a target!</div>
 *   <tippy>Wow, such attachment</tippy>
 *   <div v-tippy:why>Why?</div>
 *   <tippy target="why">Because!</tippy>
 *   <div>
 *     <div v-tippy:thats-deep>I'm not a sibling!</div>
 *   </div>
 *   <tippy target="thats-deep" deep-search>But I'll work!</tippy>
 * </div>
 * ```
 *
 * When not using a deep search, Tippy will prefer the closest matching sibling, favoring previous siblings. Note that
 * in many cases attaching to a subsequent element won't work, because tippy will search before `v-tippy` has gone and
 * added the data attribute.
 * ```
 * <div>
 *   <div v-tippy>Target 2</div>
 *   <div v-tippy>Target 1</div>
 *   <tippy>Attached to 1</tippy>
 *   <div v-tippy>Target 3</div>
 * </div>
 * <div>
 *   <tippy>Attached to 1</tippy>
 *   <div v-tippy>Target 1</div> <!-- won't work, since the v-tippy directive isn't initialized yet -->
 *   <div v-tippy>Target 2</div>
 * </div>
 * ```
 * This allows repeated targets:
 * ```
 * <div>
 *   <div v-tippy>Target 1</div>
 *   <tippy>Attached to 1</tippy>
 *   <div v-tippy>Target 2</div>
 *   <tippy>Attached to 2</tippy>
 *   <div v-tippy>Target 3</div>
 *   <tippy>Attached to 3</tippy>
 * </div>
 * ```
 *
 * This attaching process is performed once, during the mounting process. However, you can update the attachments using
 * the `attach()` method.
 *
 * Searching for singletons works similarly to searching for `v-tippy` targets, but will search ancestors. The
 * `tippy-singleton` component must be a sibling of one of the `tippy` component's ancestors, and among those it's
 * chosen by similar nearest-preceeding criteria.
 *
 * When using a singleton, some properties on the individual tooltips won't have any effect. For example, disabling
 * using the `enabled` property won't work. Instead, the enabled property on the singleton should be used.
 *
 * Several of the tippy events are exposed as vue events. For more information on these events, see
 * [the Tippy docs](https://atomiks.github.io/tippyjs/v6/all-props/#onhidden)
 * - `onShow(instance)` -> `show`
 * - `onShown(instance)` -> `shown`
 * - `onHidden(instance)` -> `hidden`
 * - `onHide(instance)` -> `hide`
 * - `onMount(instance)` -> `mount`
 * - `onTrigger(instance, event)` -> `trigger`
 * - `onUntrigger(instance, event)` -> `untrigger`
 *
 * You can cancel showing and hiding by explicitly passing the functions in `extra`, since Vue events can't have return
 * values.
 */
@Options({
  name: 'tippy',
  emits: [
    'attach', 'show', 'shown', 'hidden', 'hide', 'mount', 'trigger', 'untrigger'
  ]
})
export default class Tippy extends Vue {
  /**
   * The v-tippy target name. Defaults to `""` (the default name used by `v-tippy`)
   */
  @Prop({required: false, type: String, default: ""})
  private target!: string | "_parent"

  /**
   * Whether to perform a deep search for targets (using querySelector) or to only search for direct siblings.
   */
  @Prop({required: false, type: Boolean, default: false})
  private deepSearch!: boolean

  /**
   * Extra options for tippy.js
   */
  @Prop({required: false})
  private extra?: Partial<Props>

  /**
   * Whether the tooltip should be enabled
   */
  @Prop({required: false, type: Boolean, default: true})
  private enabled!: boolean

  /**
   * Where to place the tooltip relative to the target element
   */
  @Prop({required: false, default: 'top'})
  private placement!: Placement

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
  @Prop({required: false, type: Boolean})
  private onBody?: boolean

  /**
   * Whether the tippy should be interactive. You don't need to specify a value for this property, its presence is
   * sufficient (e.g. `<tippy interactive>`).
   *
   * This is a shorthand for `interactive: true` in the `extra` property.
   */
  @Prop({required: false, type: Boolean})
  private interactive?: boolean

  /**
   * The events that trigger the tooltip. Setting the trigger key in `extra` will override this property.
   */
  @Prop({required: false, type: String})
  private trigger?: string

  /**
   * Only used when using the manual trigger. To show/hide when using another trigger, use `tippy().show()` and
   * `tippy().hide()`
   */
  @Prop({required: false, type: Boolean})
  private visible?: boolean

  /**
   * Whether to hide the tooltip when the target element is clicked. Defaults to false when using the `'manual'`
   * trigger, otherwise defaults to true.
   */
  @Prop({required: false, type: Boolean, default: null})
  private hideOnClick!: boolean | null

  /**
   * The singleton name to link to. Setting to an empty string (or setting no value, e.g. `<tippy singleton>`) will link
   * to the default tippy-singleton name
   */
  @Prop({required: false, default: null})
  singleton!: string | '' | null

  private tip!: TippyInstance | null
  private singletonInstance?: TippySingleton | null
  private options!: Partial<Props>
  private tippyTargetMissing: boolean = false

  created() {
    this.tip = null
    this.options = {}
  }
  mounted() {
    this.$nextTick(() => {
      this.attach();
    })
  }

  @Watch('enabled')
  private enabledChanged(val: boolean) {
    if (!this.tip) return;
    if (val) {
      this.tip.enable();
    } else {
      this.tip.hide();
      this.tip.disable();
    }
  }

  @Watch('visible')
  private visibleChanged(val: boolean) {
    if (!this.tip) return;
    if (val && this.isManualTrigger) {
      this.tip.show();
    } else {
      this.tip.hide();
    }
  }

  updated() {
    if (this.tip) {
      this.tip.setProps(this.getOptions());
    }
  }

  beforeUnmount() {
    if (!this.tip) return;
    this.singletonInstance?.remove(this.tip)
    this.tip.destroy();
  }

  get isManualTrigger() {
    return this.trigger === "manual";
  }

  attach(): void {
    if (!this.$el.parentElement) {
      return; // the tippy was created and immediately destroyed.
    }
    if (this.tip) {
      try {
        this.singletonInstance?.remove(this.tip)
        this.tip.destroy();
      } catch (error) {
        console.error(error)
      }
      this.tip = null;
    }

    let target: Element | null
    if(this.target === '_parent') {
      target = this.$el.parentElement
    } else if (this.deepSearch) {
      target = this.$el.parentElement.querySelector(`[data-tippy-target="${this.target}"]`);
    } else {
      target = Tippy.findSibling(this.$el, 'tippyTarget', this.target)
    }
    this.tippyTargetMissing = !target
    if (!target) {
      throw new Error(`Unable to find tippy target named ${this.target}`)
    }

    if (this.singleton != null) {
      this.singletonInstance = Tippy.findSingleton(this.$el, this.singleton)
    } else {
      this.singletonInstance = null
    }
    const tip = tippy(target, this.getOptions());
    if (!tip) {
      throw new Error(`Unable to create tippy instance`)
    }
    this.tip = tip;

    if (this.singletonInstance) {
      this.singletonInstance.add(this.tip)
    }
    this.$emit("attach", this.tip);

    if (!this.enabled) {
      this.tip.disable();
    }
    if (this.isManualTrigger && this.visible === true) {
      this.tip.show();
    }
  }

  static findSibling(element: Element, data: string, target: string): Element | null {
    for(let sibling = element.previousElementSibling; sibling; sibling = sibling.previousElementSibling) {
      if (Tippy.matchesTarget(sibling, data, target))
        return sibling;
    }
    for(let sibling = element.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
      if (Tippy.matchesTarget(sibling, data, target))
        return sibling;
    }
    return null;
  }

  static matchesTarget(element: any, data: string, target: string): boolean {
    return element.dataset && element.dataset[data] === target
  }

  static findSingleton(element: any, name: string): TippySingleton | null {
    let singleton: Element | null = null
    let current = element
    while(current && !singleton) {
      singleton = this.findSibling(current, 'tippySingleton', name)
      current = current.parentElement
    }
    return singleton?._tippySingleton ?? null;
  }

  get tippy(): TippyInstance | null {
    return this.tip;
  }

  private getOptions(): Partial<Props> {
    const options: Partial<Props> = {}
    if(this.trigger) {
      options.trigger = this.trigger;
      if(this.isManualTrigger)
        options.hideOnClick = false;
    }
    if(this.placement) {
      options.placement = this.placement;
    }
    if(this.onBody === true) {
      options.appendTo = () => document.body;
    }
    if(this.interactive === true) {
      options.interactive = true;
    }
    if(this.hideOnClick !== null) {
      options.hideOnClick = this.hideOnClick
    }
    Object.assign(options, this.extra || {});

    options.onShow = this.wrap(options.onShow, 'show');
    options.onShown = this.wrap(options.onShown, 'shown');
    options.onHidden = this.wrap(options.onHidden, 'hidden');
    options.onHide = this.wrap(options.onHide, 'hide');
    options.onMount = this.wrap(options.onMount, 'mount');
    options.onTrigger = this.wrap(options.onTrigger, 'trigger');
    options.onUntrigger = this.wrap(options.onUntrigger, 'untrigger');
    options.content = this.$el;

    this.options = options;
    return options;
  }

  private wrap<Args extends any[], Return>(
      existing: ((...args: Args) => Return) | undefined,
      name: string
  ): ((...args: Args) => Return | undefined) {
    return (...args: any) => {
      this.$emit(name, ...args)
      if(existing)
        return existing(...args)
    }
  }
}
</script>
<style scoped>
.tippy-missing-target {
  display: none;
}
</style>