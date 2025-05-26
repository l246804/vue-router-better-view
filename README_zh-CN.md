# vue-router-better-view

增强 [Vue Router](https://router.vuejs.org/) 的 [RouterView & KeepAlive](https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#KeepAlive-Transition) 功能。

## 背景

Vue Router 目前的 RouterView 组件在搭配 [KeepAlive](https://cn.vuejs.org/api/built-in-components.html#keepalive) 组件时存在以下问题：
1. 无法根据[动态路由匹配](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)进行相同组件实例不同参数的缓存
2. 路由组件必须设置不同的 `name` 属性，否则重名组件会缓存异常

该插件的引入可以简单、高效的处理上述问题。

## 安装

```sh
npm i vue-router-better-view
```

### 全局注册

```ts
import { BetterRouterView } from 'vue-router-better-view'

// 全局注册 BetterRouterView 组件
app.use(BetterRouterView)
```

### 局部注册

```html
<!-- layout.vue -->
<script setup lang="ts">
import { BetterRouterView } from 'vue-router-better-view'
</script>

<template>
  <main>
    <BetterRouterView />
  <main>
</template>
```

## 组件属性

```ts
export interface BetterRouterViewProps extends RouterViewProps {
  /**
   * 获取当前路由的视图组件标识，未设置或返回值为假值时与 `RouterView` 组件表现一致
   * @param route 当前路由
   * @returns 视图组件标识
   */
  resolveViewKey?: (route: RouteLocationNormalizedLoaded) => string
}
```

## 示例

```html
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { BetterRouterView } from 'vue-router-better-view'

function resolveViewKey(route: RouteLocationNormalizedLoaded) {
  // 如果 route.meta.singleton 为 true，则以路由的 path 作为视图组件标识
  if (route.meta.singleton) {
    return route.path
  }

  // 使用路由的 fullPath 作为视图组件标识
  return route.fullPath
}
</script>

<template>
  <main>
    <better-router-view
      v-slot="{ Component }"
      :resolve-view-key="resolveViewKey"
    >
      <!-- include、exclude 可以根据 resolveViewKey 的返回值进行缓存处理 -->
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </better-router-view>
  </main>
</template>
```

### 模板引用

```diff
<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { BetterRouterView } from 'vue-router-better-view'
+import { ref } from 'vue'

function resolveViewKey(route: RouteLocationNormalizedLoaded) {
  // 如果 route.meta.singleton 为 true，则以路由的 path 作为视图组件标识
  if (route.meta.singleton) {
    return route.path
  }

  // 使用路由的 fullPath 作为视图组件标识
  return route.fullPath
}

+const mainContent = ref<any>()
+const resolveMainContent = () => {
+  // 如果 resolveMainContent 返回值存在则需要使用 inner 属性获取原组件引用
+  return mainContent.value?.inner || mainContent.value
+}
</script>

<template>
  <main>
    <better-router-view
      v-slot="{ Component }"
      :resolve-view-key="resolveViewKey"
    >
      <!-- include、exclude 可以根据 resolveViewKey 的返回值进行缓存处理 -->
      <keep-alive>
-        <component :is="Component" />
+        <component :is="Component" ref="mainContent" />
      </keep-alive>
    </better-router-view>
  </main>
</template>
```
