<template>
  <div :class="b()">
    <div :class="b('header')">
      <div>
        <!-- <oa-select
          class="mg-r8"
          style="width:200px"
          :options="status_tips"
          v-model="$searchQuery.status"
          placeholder="请选择字段状态"
          allowClear
          @change="getListFields"
        ></oa-select> -->
        <a-input-search
          enterButton
          placeholder="搜索字段名称"
          v-model="$searchQuery.keywords"
          style="width: 300px"
          @search="tbOnSearchKeywords('keywords', $event)"
        ></a-input-search>
      </div>
      <oa-button type="primary" @click="handleAddField">
        添加字段
      </oa-button>
    </div>
    <div :class="b('content')">
      <oa-table
        rowKey="id"
        :columns="tableColumns"
        :loading="getListFields$loading"
        :pager="pager"
        :dataSource="list"
        @change="tbOnTableChange"
      >
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a href="javascript:;" @click="handleEditField(record)">
              编辑
            </a>
            <a href="javascript:;" @click="handleDeleteField(record)">
              删除
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import tableMixins from 'oa-core/mixins/table'
import { getListFields, deleteField } from '@/api/listfields'
import { tableColumns } from './fieldStore#config'
export default {
  name: '',

  bem: {
    b: 'field-store'
  },

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      status_tips: [],
      pager: {
        p: 1,
        ps: 20
      },
      tableColumns,
      list: []
    }
  },

  computed: {},

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getListFields()
    }
  },

  async: {
    getListFields() {
      return getListFields(this.$searchQuery).then(res => {
        this.status_tips = res.status_tips
        this.list = res.list
        this.pager = res.pager
      })
    },
    deleteField(data) {
      return deleteField(data)
    }
  },

  mounted() {
    this.getListFields()
  },

  methods: {
    handleAddField() {
      this.$modalRouter.push({
        name: 'system-field-edit',
        props: {
          isEdit: false
        },
        on: {
          done: this.getListFields
        }
      })
    },
    handleEditField(record) {
      this.$modalRouter.push({
        name: 'system-field-edit',
        props: {
          id: record.id,
          isEdit: true
        },
        on: {
          done: this.getListFields
        }
      })
    },
    handleDeleteField(record) {
      this.$confirm({
        title: '提示',
        content: h => (
          <div>
            <div>是否删除{record.name}，</div>
            <div>删除该字段后将不再展示该字段。</div>
          </div>
        ),
        onOk: () => {
          this.deleteField({
            id: record.id
          }).then(res => {
            this.$message.success('字段删除成功')
            this.getListFields()
          })
        },
        onCancel: () => {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.field-store {
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
  }
}
</style>
