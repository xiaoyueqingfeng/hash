<template>
  <oa-modal v-model="show" @ok="onOk" title="选中品牌">
    <div class="tip">
      <span>已选</span>
      <span>{{ list.length }}</span>
      家
    </div>
    <oa-table
      rowKey="id"
      :columns="tableOptions.columns"
      :dataSource="list"
      :pagination="{ pageSize: 10 }"
      :showFullScreen="false"
    >
      <a slot="action" @click="remove(record.id)" slot-scope="record">
        移除
      </a>
    </oa-table>
  </oa-modal>
</template>

<script>
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './brandList#config'
import { get } from 'lodash-es'

export default {
  mixins: [tableMixins],
  props: {
    info: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: false,
      list: [],
      pager: {
        p: 1,
        ps: 5
      }
    }
  },
  watch: {
    info: {
      handler(newV) {
        if (newV && newV.length) this.list = this.info.concat()
      },
      immediate: true
    }
  },
  computed: {
    tableOptions
  },
  methods: {
    onOk() {
      this.$emit('changeBrandSearchList', this.list)
      this.show = false
    },
    remove(id) {
      this.list = this.list.filter(item => item.id !== id)
    }
  }
}
</script>
<style lang="less" scoped>
.tip {
  height: 40px;
  line-height: 40px;
  margin-bottom: 16px;
  padding: 0 8px;
  background: rgba(255, 251, 230, 1);
  border-radius: 0px 0px 4px 4px;
}
.label {
}
</style>
