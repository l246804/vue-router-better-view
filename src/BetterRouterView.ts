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
import { defineComponent, getCurrentInstance, h, shallowRef } from 'vue'
import { RouterView } from 'vue-router'
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
              expose({ inner: inner$ })
              return () => h(viewComponent, { ...attrs, ref: inner$ }, slots)
            },
          }),
        )
      }
      return wrappers.get(name)!
    }

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
