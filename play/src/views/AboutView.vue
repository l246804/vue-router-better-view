<script setup lang="ts">
import { shallowRef, useAttrs, useSlots } from 'vue';

const attrs = useAttrs()
const slots = useSlots()

console.log('About:', attrs, slots)

const text = shallowRef('')

defineExpose({
  name: 'About'
})
</script>

<template>
  <main class="about">
    <h4>No KeepAlive</h4>
    <input v-model="text" />
  </main>
</template>
