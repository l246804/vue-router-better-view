import { shallowReactive } from 'vue'

export const keepAliveValues = shallowReactive(new Set<string>())
