<template>
  <div :class="b()">
    <a-row type="flex" justify="end" class="mg-b16">
      <a-col>
        <oa-button class="button" @click="onAddSupplier" type="primary">
          新增供应商
        </oa-button>
      </a-col>
    </a-row>
    <oa-table
      rowKey="id"
      :scroll="{ x: 1200 }"
      :dataSource="dataSource"
      :loading="getSupplierList$loading"
      :columns="tableOptions.columns"
      :pager="pager"
      @change="tbOnTableChange"
    >
      <template slot="supplier_name" slot-scope="text, record">
        <oa-overflow-text maxWidth="10em" :title="record.supplier_name">
          {{ record.supplier_name }}
        </oa-overflow-text>
      </template>
      <template slot="status" slot-scope="text, record">
        {{ statusTodesc(record.status) }}
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onEditSupplier(record)">
            编辑
          </a>
          <a-popconfirm title="确认删除?" @confirm="onDeleteSupplier(record)">
            <a>
              删除
            </a>
          </a-popconfirm>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>

<script>
import { getSupplierList, deleteSupplier } from '@/api/supplier'
import { tableOptions } from './supplier.config'
import { get, mixin } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  components: {},
  bem: {
    b: 'open-supplier'
  },
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      mapping: {},
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.getSupplierList()
    }
  },
  async: {
    /**
     * @description 获取硬件列表
     */
    getSupplierList() {
      return getSupplierList(this.$searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.mapping = get(res, 'mapping', {})
        this.pager = res.pager
      })
    },
    deleteSupplier(id) {
      return deleteSupplier({
        id
      }).then(res => {
        this.$success({
          content: '供应商删除成功'
        })
        this.getSupplierList()
      })
    }
  },

  mounted() {
    this.getSupplierList()
  },

  methods: {
    statusTodesc(status) {
      let currentStatus = this.mapping.status.filter(i => i.id === status)[0]
      return currentStatus && currentStatus['name']
    },
    /**
     * @description 新增供应商
     */
    onAddSupplier() {
      this.$modalRouter.push({
        name: 'open-supplier-edit',
        props: {
          isEdit: false
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 编辑供应商
     */
    onEditSupplier(record) {
      this.$modalRouter.push({
        name: 'open-supplier-edit',
        props: {
          isEdit: true,
          id: record.id
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 删除供应商
     */
    onDeleteSupplier(record) {
      this.deleteSupplier(record.id)
    }
  }
}
</script>

<style lang="less" scoped>
.open-supplier {
  padding: 24px;
  background: #fff;
}
</style>
