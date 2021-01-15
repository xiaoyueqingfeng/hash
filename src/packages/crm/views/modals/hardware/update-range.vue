<template>
  <oa-modal v-model="show" title="更新范围" :width="1000" :footer="null">
    <oa-table
      rowKeys="id"
      :dataSource="dataSource"
      :columns="tableOptions.columns"
      :pagination="{ pageSize: 20 }"
      :loading="getUpdateRange$loading"
      :showFullScreen="false"
    ></oa-table>
  </oa-modal>
</template>
<script>
import { getUpdateRange } from '@/api/hardware'
import { tableOptions } from './update-range#congfig'
import { get } from 'lodash-es'
export default {
  props: {
    task_id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      show: true,
      dataSource: []
    }
  },
  created() {
    this.getUpdateRange()
  },
  async: {
    getUpdateRange() {
      return getUpdateRange().then(res => {
        this.dataSource = get(res, 'shop_list', [])
      })
    }
  },
  computed: {
    tableOptions
  },
  methods: {}
}
</script>

<style lang="less" scoped></style>
