<template>
  <div :class="b()">
    <div :class="b('content')">
      <oa-table
        rowKey="id"
        :columns="tableColumns"
        :loading="getList$loading"
        :dataSource="list"
        @change="tbOnTableChange"
      >
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a href="javascript:;" @click="handleEditPage(record)">
              初始化字段配置
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import tableMixins from 'oa-core/mixins/table'
import { getList } from '@/api/list'
import { tableColumns } from './listInit#config'
export default {
  name: '',

  bem: {
    b: 'list-init'
  },

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      list: [],
      tableColumns
    }
  },

  computed: {},

  async: {
    getList() {
      return getList(this.$searchQuery).then(res => {
        this.list = res.list
      })
    }
  },

  mounted() {
    this.getList()
  },

  methods: {
    handleEditPage(record) {
      this.$modalRouter.push({
        name: 'system-table-columns-set',
        props: {
          auth_key: record.auth_key,
          setType: 'system'
        },
        on: {
          done: this.getList
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
