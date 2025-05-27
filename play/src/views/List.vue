<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { keepAliveValues } from '@/stores/keepAlive'

const details = ref<{ time: number }[]>([])

const router = useRouter()
function gotoDetail(
  item: { time: number },
  { cached, clean }: { cached?: boolean, clean?: boolean } = {},
) {
  if (cached) {
    details.value.push(item)
  }
  const fullPath = `/list/detail/fullPath?time=${item.time}`
  if (clean) {
    keepAliveValues.delete(fullPath)
  }
  router.push(fullPath)
}
</script>

<template>
  <ElSpace
    style="width: 100%"
    direction="vertical"
    alignment="start"
    fill
  >
    <ElAlert
      type="primary"
      :closable="false"
    >
      <p>1. Click the "Goto Detail" button to view the time comparison on the detail page.</p>
      <p>
        2. After returning from the detail page, click "Clean Cache & Goto Detail" to view the time
        comparison again.
      </p>
      <p>
        3. When caching is based on
        <ElText
          type="primary"
          style="font-weight: bolder"
        >
          fullPath
        </ElText>, clearing one record won't affect other cached pages.
      </p>
    </ElAlert>

    <ElAlert
      type="info"
      :closable="false"
    >
      <p>1. 点击“详情页”按钮，在详情页查看时间对比结果。</p>
      <p>2. 从详情页返回后，点击“清除缓存并进入详情页”按钮再次查看时间对比结果。</p>
      <p>
        3. 基于
        <ElText
          type="primary"
          style="font-weight: bolder"
        >
          fullPath
        </ElText>
        缓存时，清除某一条记录不会影响其他缓存页面。
      </p>
    </ElAlert>

    <div>
      <ElButton @click="gotoDetail({ time: Date.now() }, { cached: true })">
        Goto Detail
      </ElButton>
    </div>
  </ElSpace>

  <ElDivider>Record</ElDivider>

  <ElSpace
    style="width: 100%"
    direction="vertical"
    alignment="start"
    fill
  >
    <div
      v-for="(item, index) in details"
      :key="index"
    >
      <ElSpace :size="50">
        <ElSpace>
          <b>time:</b>
          <span>{{ new Date(item.time).toLocaleString() }}</span>
        </ElSpace>

        <ElButton
          size="small"
          @click="gotoDetail(item)"
        >
          Goto Detail
        </ElButton>

        <ElButton
          size="small"
          @click="gotoDetail(item, { clean: true })"
        >
          Clean Cache & Goto Detail
        </ElButton>
      </ElSpace>
    </div>
  </ElSpace>
</template>
