<template>
  <oa-panel class="break-list">
    <oa-filter-box :mode.sync="$searchQuery.mode">
      <template slot="actions">
        <oa-button @click="onClickAdd" type="primary" class="mg-l8">
          添加分类
        </oa-button>
      </template>
    </oa-filter-box>
    <oa-table
      class="mg-t16"
      :scroll="{ x: 1600 }"
      :columns="tableOptions.columns"
      rowKey="id"
      :loading="getCategoryList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="categoryList"
    >
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onClickUpdate(record)">
            编辑
          </a>
          <a @click="onClickDelete(record)">
            删除
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import {
  getCategoryList,
  addCategory,
  updateCategory,
  deleteCategory
} from '@/api/goods'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'

export default {
  mixins: [tableMixins],
  data() {
    return {
      pager: {
        p: 1,
        ps: 20
      },
      categoryList: []
    }
  },
  computed: {
    tableOptions
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getCategoryList()])
    },
    addCategory(data) {
      data.parent_id = data.parent_id || 0
      return addCategory(data).then(res => {
        this.success('添加成功')
      })
    },
    updateCategory(data) {
      return updateCategory(data).then(res => {
        this.success('编辑成功')
      })
    },
    deleteCategory(id) {
      return deleteCategory({ id }).then(res => {
        this.success('删除成功')
      })
    },
    getCategoryList() {
      return getCategoryList(this.$searchQuery).then(res => {
        this.auth_area = res.auth_area

        this.categoryList = res.list.map(item => {
          item.children.length
            ? item.children.forEach(ele => {
                delete ele.children
              })
            : delete item.children
          return item
        })
        this.pager = res.pager
      })
    }
  },
  methods: {
    success(message) {
      this.getCategoryList()
      this.$message.success(message)
    },
    onClickAdd() {
      this.$modalRouter.push({
        name: 'goods-type-add',
        on: {
          save: data => {
            this.addCategory(data)
          }
        }
      })
    },
    onClickUpdate(record) {
      this.$modalRouter.push({
        name: 'goods-type-add',
        props: { category: record },
        on: {
          save: data => {
            const form = { id: record.id, ...data }
            this.updateCategory(form)
          }
        }
      })
    },
    onClickDelete(record) {
      this.$confirm({
        title: '确认删除',
        content: '确定删除商品分类吗？',
        onOk: () => {
          this.deleteCategory(record.id)
        }
      })
    },
    onModalDone() {
      this.getCategoryList().then(res => {
        this.tbOnSelectionReset()
      })
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
