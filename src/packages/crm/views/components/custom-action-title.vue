<template>
  <span slot="actionTitle" class="actionTitle">
    <a-dropdown :trigger="['click']" @visibleChange="visibleChange">
      <a class="ant-dropdown-link" href="#">
        <span>操作</span>
        <div class="icon_table" :class="{ active: visible }"></div>
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="0">
          <a href="javascript:;" @click="handleOpenFilter">设置显示字段</a>
        </a-menu-item>
        <a-menu-item key="1">
          <a href="javascript:;" @click="handleTableFix">表格最大化</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {
    authKey: {
      type: String
    },
    tableRef: null
  },

  data() {
    return {
      visible: false
    }
  },

  computed: {},

  async: {},

  mounted() {},

  methods: {
    handleOpenFilter() {
      console.log('authKey', this.authKey)
      this.visible = false
      this.$modalRouter.push({
        name: 'system-table-columns-set',
        props: {
          auth_key: this.authKey
        },
        on: {
          done: this.handleResetTable
        }
      })
    },
    // 表格最大化
    handleTableFix() {
      this.visible = false
      this.$emit('handleTableFix')
    },
    handleResetTable() {
      this.$emit('done')
    },
    visibleChange(e) {
      this.visible = e
    }
  }
}
</script>

<style lang="less" scoped>
.ant-dropdown-link {
  text-decoration: none;
  color: #000000;
  height: 24px;
  display: flex;
  span {
    line-height: 24px;
  }
}
.icon_table {
  width: 24px;
  height: 24px;
  background: url('~@/assets/images/icon_table_arrow@2x.png') no-repeat;
  background-size: cover;
}
.icon_table.active {
  background: url('~@/assets/images/icon_table_arrow_active@2x.png') no-repeat;
  background-size: cover;
}
.icon_table:hover {
  background: url('~@/assets/images/icon_table_arrow_active@2x.png') no-repeat;
  background-size: cover;
}
</style>
