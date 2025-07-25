<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const receiveTime = new Date(+route.query.time!).toLocaleString()
const currentTime = new Date().toLocaleString()
const isEquals = receiveTime === currentTime

defineExpose({
  test: route.fullPath,
})
</script>

<template>
  <h4>by route.{{ route.params.viewKey }}</h4>

  <div class="info-box">
    <p>
      <b>$route.query.time:</b>
      <ElText type="warning">
        {{ receiveTime }}
      </ElText>
    </p>

    <p>
      <b>current time:</b>
      <ElText type="primary">
        {{ currentTime }}
      </ElText>
    </p>

    <p>
      <b>$route.query.time === current time:</b>
      <ElText :type="isEquals ? 'success' : 'danger'">
        {{ isEquals }}
      </ElText>
    </p>
  </div>

  <ElButton @click="$router.back()">
    Back
  </ElButton>
</template>

<style scoped>
.info-box {
  max-width: 500px;
}

.info-box > p {
  display: flex;
  justify-content: space-between;
}

.info-box :deep(.el-text) {
  font-size: inherit;
}
</style>
