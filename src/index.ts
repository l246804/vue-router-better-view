import type { App, ObjectPlugin } from 'vue'
import { BetterRouterView as Component } from './BetterRouterView'

export * from './BetterRouterView'

const BetterRouterView: typeof Component & ObjectPlugin = /* #__PURE__ */ Object.assign(Component, {
  install(app: App) {
    app.component('BetterRouterView', Component)
  },
})

export { BetterRouterView, BetterRouterView as default }
