<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { BetterRouterView as RouterView } from '../../src'
import { shallowRef } from 'vue'

const view$ = shallowRef()
console.log(view$)
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <nav>
        <RouterLink to="/"> Home </RouterLink>
        <RouterLink to="/about"> About </RouterLink>
        <RouterLink to="/about/1"> About1</RouterLink>
        <RouterLink to="/about/2"> About2</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView
    v-slot="{ Component: viewComponent }"
    :resolve-view-key="(route) => route.fullPath"
  >
    <KeepAlive :include="['/', '/about/1']">
      <Component
        ref="view$"
        :is="viewComponent"
        test="test"
      >
        <template #header>
          <h3>Header</h3>
        </template>
      </Component>
    </KeepAlive>
  </RouterView>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
