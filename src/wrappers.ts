import type { App } from 'vue'
import type { RouteComponent } from 'vue-router'

export type Wrappers = Map<string, RouteComponent>

export const appWrappers: WeakMap<App, Wrappers> = new WeakMap()

export function getWrappers(app: App): Wrappers {
  if (!appWrappers.has(app)) {
    appWrappers.set(app, new Map())
    app.onUnmount(() => {
      appWrappers.get(app)?.clear()
      appWrappers.delete(app)
    })
  }
  return appWrappers.get(app)!
}
