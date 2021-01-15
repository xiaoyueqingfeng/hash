<template>
  <div :class="b()">
    <div :class="b('filter')">
      <oa-filter-box>
        <a-select v-model="$searchQuery.status" placeholder="请选择">
          <a-select-option :value="-99">全部</a-select-option>
          <a-select-option :value="1">已完成</a-select-option>
          <a-select-option :value="2">未完成</a-select-option>
        </a-select>
        <a-input
          v-model="$searchQuery.leads_id"
          placeholder="请输入leadsId"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.brand_name"
          placeholder="请输入品牌名称"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <a-input
          v-model="$searchQuery.mch_id"
          placeholder="请输入商户号"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <oa-button @click="handlerSearch" type="primary">查询</oa-button>
        <oa-button @click="handlerReset" class="mg-l8">重置</oa-button>
        <template slot="actions">
          <oa-button class="button" @click="handleAddPos" type="primary">
            添加POS机
          </oa-button>
        </template>
      </oa-filter-box>
    </div>
    <div class="content mg-t16">
      <oa-table
        rowKeys="id"
        :scroll="{ x: 1200 }"
        :dataSource="dataSource"
        :loading="getPosaddList$loading"
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
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { getPosaddList } from '@/api/pos'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './add#config'
import { get } from 'lodash-es'
export default {
  name: 'pos-index-add',

  mixins: [tableMixins],

  bem: {
    b: 'pos-index-add'
  },

  data() {
    return {
      dataSource: [],
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },
      statusOption: []
    }
  },

  computed: {
    tableOptions
  },

  async: {
    getPosaddList() {
      return getPosaddList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = res.pager
        // this.mapping = res.mapping
        // this.auth_area = res.auth_area
      })
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getPosaddList()
    }
  },

  created() {
    this.getPosaddList()
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
     * @description 添加POS机
     */
    handleAddPos() {
      this.$modalRouter.push({
        name: 'pos-add-pos',
        on: {
          done: this.getPosaddList
        }
      })
    },
    /**
     * @description 编辑POS相关信息
     * @param {object} record
     */
    handleEditPos(record) {
      this.$modalRouter.push({
        name: 'pos-operate-relevance-pos',
        props: {
          isEdit: 1,
          leads_id: record.leads_id
        },
        on: {
          done: this.getPosaddList
        }
      })
    },
    /**
     * @description 查看pos机相关信息
     * @param {object} record
     */
    handleViewPos(record) {
      this.$modalRouter.push({
        name: 'pos-operate-relevance-pos',
        props: {
          isEdit: 0,
          leads_id: record.leads_id
        },
        on: {
          done: this.getPosaddList
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
