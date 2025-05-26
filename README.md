# vue-router-better-view

Enhances the [RouterView & KeepAlive](https://router.vuejs.org/guide/advanced/router-view-slot.html#KeepAlive-Transition) functionality of [Vue Router](https://router.vuejs.org/).

## Background

The current [RouterView](file:///home/leihaohao/workspaces/own/vue-router-better-view/node_modules/.pnpm/vue-router@4.5.1_vue@3.5.14_typescript@5.8.3_/node_modules/vue-router/dist/vue-router.d.ts#L1603-L1613) component in Vue Router has the following limitations when used with the [KeepAlive](https://cn.vuejs.org/api/built-in-components.html#keepalive) component:
1. Unable to cache different parameters of the same component instance based on [dynamic route matching](https://router.vuejs.org/guide/essentials/dynamic-matching.html).
2. Route components must have distinct [name](file:///home/leihaohao/workspaces/own/vue-router-better-view/node_modules/.pnpm/vue-router@4.5.1_vue@3.5.14_typescript@5.8.3_/node_modules/vue-router/dist/vue-router.d.ts#L244-L244) attributes; otherwise, components with the same name will cause caching issues.

This plugin provides a simple and efficient solution to the above problems.

## Installation

```sh
npm i vue-router-better-view
```

### Global Registration

```ts
import { BetterRouterView } from 'vue-router-better-view'

// Globally register the BetterRouterView component
app.use(BetterRouterView)
```

### Local Registration

```html
<!-- layout.vue -->
<script setup lang="ts">
import { BetterRouterView } from 'vue-router-better-view'
</script>

<template>
  <main>
    <BetterRouterView />
  </main>
</template>
```

## Component Props

```ts
export interface BetterRouterViewProps extends RouterViewProps {
  /**
   * Retrieves the view component key for the current route.
   * If not set or returns a falsy value, behaves like the standard `RouterView` component.
   * @param route The current route
   * @returns The view component key
   */
  resolveViewKey?: (route: RouteLocationNormalizedLoaded) => string
}
```

## Example

```html
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { BetterRouterView } from 'vue-router-better-view'

function resolveViewKey(route: RouteLocationNormalizedLoaded) {
  // If route.meta.singleton is true, use the route's path as the view component key
  if (route.meta.singleton) {
    return route.path
  }

  // Use the route's fullPath as the view component key
  return route.fullPath
}
</script>

<template>
  <main>
    <better-router-view
      v-slot="{ Component }"
      :resolve-view-key="resolveViewKey"
    >
      <!-- include/exclude can be used based on the return value of resolveViewKey -->
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </better-router-view>
  </main>
</template>
```

### Template Refs

```diff
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { BetterRouterView } from 'vue-router-better-view'
+import { ref } from 'vue'

function resolveViewKey(route: RouteLocationNormalizedLoaded) {
  // If route.meta.singleton is true, use the route's path as the view component key
  if (route.meta.singleton) {
    return route.path
  }

  // Use the route's fullPath as the view component key
  return route.fullPath
}

+const mainContent = ref<any>()
+const resolveMainContent = () => {
+  // If resolveMainContent returns a value, use the inner property to get the original component reference
+  return mainContent.value?.inner || mainContent.value
+}
</script>

<template>
  <main>
    <better-router-view
      v-slot="{ Component }"
      :resolve-view-key="resolveViewKey"
    >
      <!-- include/exclude can be used based on the return value of resolveViewKey -->
      <keep-alive>
-        <component :is="Component" />
+        <component :is="Component" ref="mainContent" />
      </keep-alive>
    </better-router-view>
  </main>
</template>
```
