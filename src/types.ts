import {ComponentPropsOptions, ComponentOptionsMixin, DefineComponent as VueDefineComponent, EmitsOptions, MethodOptions} from "vue";
import {Plugin} from "./common";

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
export type ExtractPluginProps<P extends Plugin> = UnionToIntersection<(P extends Plugin<infer I> ? I : never)>

// vue's DefineComponent is a pain, so here's a simpler version
export type DefineComponent<Props extends ComponentPropsOptions, Emits extends EmitsOptions, Data, Methods extends MethodOptions> =
    VueDefineComponent<//
        /* PropsOrPropOptions = */ Props,
        /* RawBindings = */ Data,
        /* D = */ unknown,
        /* C = */ {},
        /* M = */ Methods,
        /* Mixin = */ ComponentOptionsMixin,
        /* Extends = */ ComponentOptionsMixin,
        /* E = */ Emits>;
