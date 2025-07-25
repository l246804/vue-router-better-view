import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ShallowRef,
  VNode,
  VNodeProps,
} from 'vue'
import type {
  RouteComponent,
  RouteLocationNormalizedLoaded,
  RouteLocationNormalizedLoadedGeneric,
  RouterViewProps,
} from 'vue-router'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  provide,
  shallowRef,
  toValue,
} from 'vue'
import { RouterView, useRoute, viewDepthKey } from 'vue-router'
import { getWrappers } from './wrappers'

export interface SlotData {
  route: RouteLocationNormalizedLoadedGeneric
  Component: VNode
}

export type ResolveViewKey = (
  route: RouteLocationNormalizedLoaded,
) => string | void | undefined | null

export interface BetterRouterViewProps extends RouterViewProps {
  resolveViewKey?: ResolveViewKey
  exact?: boolean
}

export const BetterRouterView: new () => {
  $props: AllowedComponentProps & ComponentCustomProps & VNodeProps & BetterRouterViewProps
  $slots: {
    default?: (data: SlotData) => VNode[]
  }
} = /* #__PURE__ */ defineComponent({
  name: 'BetterRouterView',
  inheritAttrs: false,
  props: {
    resolveViewKey: {
      type: Function,
    },
    exact: {
      type: Boolean,
    },
  },
  setup(props: BetterRouterViewProps, { attrs, slots }) {
    const app = getCurrentInstance()!.appContext.app
    const wrappers = getWrappers(app)

    function createViewWrapper({ route, Component: viewComponent }: SlotData): RouteComponent {
      const name = props.resolveViewKey?.(route)
      if (!name) {
        return viewComponent
      }

      if (!wrappers.has(name)) {
        wrappers.set(
          name,
          defineComponent({
            name,
            inheritAttrs: false,
            setup(_, { attrs, slots, expose }) {
              const inner$: ShallowRef<any> = shallowRef()
              expose(
                new Proxy(
                  {},
                  {
                    get: (t, p) => Reflect.get(inner$.value || t, p),
                    has: (t, p) => Reflect.get(inner$.value || t, p),
                  },
                ),
              )
              return () => h(viewComponent, { ...attrs, ref: inner$ }, slots)
            },
          }),
        )
      }
      return wrappers.get(name)!
    }

    const route = useRoute()
    const viewDepth = inject(viewDepthKey, 0)
    provide(
      viewDepthKey,
      // route.matched 最后一个往往就是精确匹配的，这里更改 viewDepth 后可以让其直接渲染对应的视图组件
      computed(() => (props.exact ? route.matched.length - 1 : toValue(viewDepth))),
    )

    return () =>
      h(RouterView, attrs, {
        default: (data: Omit<SlotData, 'Component'> & { Component?: VNode }) => {
          const slot = slots.default
          if (data.Component) {
            data.Component = h(createViewWrapper(data as SlotData))
          }
          if (slot) {
            return slot(data)
          }
          return data.Component
        },
      })
  },
})
