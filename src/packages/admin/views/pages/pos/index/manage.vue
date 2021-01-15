<template>
  <div :class="b()">
    <div :class="b('filter')">
      <oa-filter-box>
        <a-input
          v-model="$searchQuery.brand_name"
          placeholder="请输入品牌名称"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.shop_name"
          placeholder="请输入场馆名称"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.terminal_no"
          placeholder="请输入设备ID"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <oa-button @click="handlerSearch" type="primary">查询</oa-button>
        <oa-button @click="handlerReset" class="mg-l8">重置</oa-button>
      </oa-filter-box>
    </div>
    <div class="content mg-t16">
      <oa-table
        rowKeys="id"
        :scroll="{ x: 1200 }"
        :dataSource="dataSource"
        :loading="getPosManageList$loading"
        :columns="tableOptions.columns"
        :pager="pager"
        @change="tbOnTableChange"
      >
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a @click="handleEditPos(record)">
              编辑
            </a>
            <a @click="handleViewPos(record)">
              查看
            </a>
            <a @click="handleDeletePos(record)">
              删除
            </a>
            <a @click="handleSwitchPos(record)" v-if="record.status === '4'">
              启用
            </a>
            <a @click="handleSwitchPos(record)" v-if="record.status === '1'">
              禁用
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { getPosManageList, deletePos, PosSwitch } from '@/api/pos'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './manage#config'
import { get } from 'lodash-es'
export default {
  name: 'pos-index-manage',

  mixins: [tableMixins],

  bem: {
    b: 'pos-index-add'
  },

  data() {
    return {
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    tableOptions
  },

  async: {
    getPosManageList() {
      return getPosManageList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = res.pager
        this.mapping = res.mapping
      })
    },
    PosSwitch(data) {
      return PosSwitch(data)
    },
    deletePos(data) {
      return deletePos(data)
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getPosManageList()
    }
  },

  created() {
    this.getPosManageList()
  },

  methods: {
    //查询
    handlerSearch() {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1
        }
      })
    },
    /**
     * @description 编辑POS相关信息
     * @param {object} record
     */
    handleEditPos(record) {
      this.$modalRouter.push({
        name: 'pos-operate-enable-pos',
        props: {
          isEdit: 1,
          leads_id: record.leads_id,
          terminal_id: record.terminal_id
        },
        on: {
          done: this.getPosManageList
        }
      })
    },
    /**
     * @description 查看pos机相关信息
     * @param {object} record
     */
    handleViewPos(record) {
      this.$modalRouter.push({
        name: 'pos-operate-enable-pos',
        props: {
          isEdit: 0,
          leads_id: record.leads_id,
          terminal_id: record.terminal_id
        }
      })
    },
    handleDeletePos(record) {
      this.$confirm({
        title: '删除提示',
        content:
          '删除此设备会导致该设备解除绑定，删除后，该设备将停止服务，直到重新添加至列表，您确定删除吗？',
        onOk: () => {
          this.deletePos({
            leads_id: record.leads_id,
            terminal_id: record.terminal_id
          }).then(() => {
            this.$success({
              title: '提示',
              content: '删除成功'
            })
            this.getPosManageList()
          })
        }
      })
    },
    handleSwitchPos(record) {
      let mapData = {
        '1': {
          title: '禁用提示',
          content:
            '禁用此设备会导致该设备无法使用，禁用后，该设备将停止服务，直到重新启用，您确定禁用吗？'
        },
        '4': {
          title: '启用提示',
          content: '启用后，该设备将恢复服务，您确定启用吗？'
        }
      }
      this.$confirm({
        title: mapData[record.status].title,
        content: mapData[record.status].content,
        onOk: () => {
          this.PosSwitch({
            leads_id: record.leads_id,
            terminal_id: record.terminal_id,
            status: record.status === '1' ? '4' : '1'
          }).then(() => {
            this.$success({
              title: '提示',
              content: `${record.status === '1' ? '禁用' : '启用'}成功`
            })
            this.getPosManageList()
          })
        }
      })
    },
    //重置
    handlerReset() {
      this.$searchQuery = { p: 1, ps: 20 }
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.update-package-manage {
  padding: 24px;
  background-color: #fff;
  &__filter {
    display: flex;
    justify-content: space-between;
    .search {
      width: 300px;
    }
  }
}
</style>
