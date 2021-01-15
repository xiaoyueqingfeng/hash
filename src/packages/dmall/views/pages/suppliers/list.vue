<template>
  <oa-panel app class="suppliers-list">
    <oa-filter-box :mode.sync="$searchQuery.mode">
      <template slot="actions">
        <oa-button @click="onClickAdd" type="primary" class="mg-l8">
          添加供应商
        </oa-button>
      </template>
    </oa-filter-box>

    <oa-table
      class="mg-t16"
      :scroll="{ x: 1600 }"
      :columns="tableOptions.columns"
      rowKey="id"
      :loading="getList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="list"
    >
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onEdit(record)">
            编辑
          </a>
          <a @click="onAccount(record)">
            账户
          </a>
          <a @click="onStop(record)">
            禁用
          </a>
          <a @click="onEnable(record)">
            恢复
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getList, add, update, setProhibit, setEnable } from '@/api/suppliers'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      selects: {
        work_model: [],
        brand_level: [],
        throw_reason: []
      },
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },

      isExpand: false,
      userStatus: 'all'
    }
  },
  watch: {
    $route(newRoute) {
      this.getList()
    }
  },
  computed: {
    tableOptions,
    selectedRowCustomerNames() {
      const names = this.list
        .filter(item => this.selectedRowKeys.includes(item.id))
        .map(item => item.brand_name)
      return names
    }
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getList()])
    },
    add(data) {
      return add(data).then(res => {
        this.success('添加成功')
      })
    },
    update(data) {
      return update(data).then(res => {
        this.success('编辑成功')
      })
    },
    setProhibit(id) {
      return setProhibit({ supplier_id: id }).then(res => {
        this.success('禁用成功')
      })
    },
    setEnable(id) {
      return setEnable({ supplier_id: id }).then(res => {
        this.success('启用成功')
      })
    },
    getList() {
      return getList(this.$searchQuery).then(res => {
        this.selects.work_model = res.work_model
        this.selects.brand_level = res.brand_level
        this.selects.throw_reason = res.throw_reason
        this.auth_area = res.auth_area

        this.list = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    success(message) {
      this.getList().then(res => {
        this.tbOnSelectionReset()
      })
      this.$message.success(message)
    },
    onClickAdd() {
      this.$modalRouter.push({
        name: 'suppliers-add',
        on: {
          save: values => {
            this.add(values)
          }
        }
      })
    },
    onEdit(record) {
      this.$modalRouter.push({
        name: 'suppliers-add',
        props: {
          supplier: record
        },
        on: {
          save: values => {
            values.supplier_id = record.id
            this.update(values)
          }
        }
      })
    },
    onAccount(record) {
      this.$modalRouter.push({
        name: 'suppliers-account-show',
        props: { id: record.id }
      })
    },
    onStop(record) {
      this.$confirm({
        title: '是否禁用供应商？',
        content: '禁用后将无法登录分销商城',
        onOk: () => {
          this.setProhibit(record.id)
        }
      })
    },
    onEnable(record) {
      this.setEnable(record.id)
    }
  }
}
</script>
<style lang="less" scoped>
.warn-tooltip {
  .c(#f5222d);
  .mg-l(8px);
  .cur-p;
}
</style>
