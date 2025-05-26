<script setup lang="ts">
import { shallowRef, useAttrs, useSlots } from 'vue';

const attrs = useAttrs()
const slots = useSlots()

console.log('Home:', attrs, slots)

const text = shallowRef('')

defineExpose({
  name: 'Home'
})
</script>

<template>
  <main class="home">
    <h4>KeepAlive</h4>
    <input v-model="text" />
  </main>
</template>
