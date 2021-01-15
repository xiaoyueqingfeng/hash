<template>
  <section class="sg-section">
    <h3>oa-table</h3>
    <p>
      使用与
      <a target="_blank" href="https://vue.ant.design/components/table-cn/">
        a-table
      </a>
      相同的api，只是增加了默认无数据的占位图，以及默认应用的分页条数,分页器样式已包含
    </p>
    <oa-table :dataSource="[]" :columns="columns"></oa-table>
    <p class="mg-t16">结合alert-selection</p>

    <oa-alert-intro>
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / 600 条数据
      <span slot="actions">
        <a @click="selectedRowKeys = []">清空</a>
        <a>分配</a>
        <a>放弃</a>
        <a>删除</a>
      </span>
    </oa-alert-intro>
    <oa-table
      class="mg-t16"
      :columns="columns"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectionChange
      }"
      rowKey="id"
      @change="onTableChange"
      :pagination="{ current: +query.p || 1 }"
      :dataSource="tableData"
    >
      <div slot="action" slot-scope="record">
        <a>分配销售</a>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm title="确认删除该权限么?" @confirm="onDelete(record.id)">
          <a>删除</a>
        </a-popconfirm>
      </div>
    </oa-table>
  </section>
</template>
<script>
const tableData = new Array(60).fill(1).map((item, i) => ({ id: i, name: i }))
export default {
  rxState() {
    return {
      query: this.route.query$
    }
  },
  data() {
    return {
      tableData,
      selectedRowKeys: [],
      columns: [
        { title: 'id', dataIndex: 'id' },
        { title: '名称', dataIndex: 'name' },
        { title: '操作', width: 180, scopedSlots: { customRender: 'action' } }
      ]
    }
  },
  computed: {
    query() {
      return this.$route.query
    }
  },
  methods: {
    onSelectionReset() {
      this.selectedRowKeys = []
    },
    onSelectionChange(keys) {
      this.selectedRowKeys = keys
    },
    onDelete(record) {
      console.log('delete ', record)
    },
    onTableChange(pagination) {
      console.log('pagination', pagination)
      this.$router.push({
        query: {
          p: pagination.current,
          ps: pagination.pageSize
        }
      })
    },
    onReset() {
      this.selectedRowKeys = []
    }
  }
}
</script>
