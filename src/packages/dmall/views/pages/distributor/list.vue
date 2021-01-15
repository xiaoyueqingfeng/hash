<template>
  <oa-panel app :class="b()">
    <div :class="b('header')">
      <a-input-search
        :class="b('search')"
        enterButton
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
        placeholder="搜索分销商、品牌名称"
      ></a-input-search>
      <div class="action"></div>
    </div>

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
      <template slot="level" slot-scope="text">
        <a-tag :color="tagColor(text)">
          {{ distributorLevelFilter(text) }}
        </a-tag>
      </template>
      <template slot="distributor_name" slot-scope="text, record">
        <a @click="onCLickDetail(record)">{{ text }}</a>
      </template>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onClickUpdate(record)">
            编辑
          </a>
          <a @click="onClickAccount(record)">
            账号
          </a>
          <a @click="onClickBuylog(record)">
            购买记录
          </a>
          <a @click="onClickDisable(record)">
            禁用
          </a>
          <a @click="onClickReCover(record)">
            恢复
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getList, setProhibit, setEnable } from '@/api/distributor'
import { tableOptions } from './list#config'
import { mapGetters } from 'vuex'
import tableMixins from 'oa-core/mixins/table'

export default {
  name: 'DistributorList',
  mixins: [tableMixins],
  bem: {
    b: 'distributor'
  },
  data() {
    return {
      list: [],
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },
      isDisable: true,
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
      const names = this.customerList
        .filter(item => this.selectedRowKeys.includes(item.id))
        .map(item => item.brand_name)
      return names
    },
    ...mapGetters('dmall', ['distributorLevel'])
  },
  mounted() {
    this.initData()
  },
  async: {
    tagColor(value) {
      const colorAyy = ['cyan', 'green', 'red']
      return colorAyy[value]
    },
    success(message) {
      this.getList()
      this.$message.success(message)
    },
    initData() {
      return Promise.all([this.getList()])
    },
    setProhibit(data) {
      return setProhibit(data).then(res => {
        this.success('禁用成功')
      })
    },
    setEnable(data) {
      return setEnable(data).then(res => {
        this.success('恢复成功')
      })
    },
    getList() {
      return getList(this.$searchQuery).then(res => {
        this.auth_area = res.auth_area

        this.list = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    // 分销商等级颜色
    tagColor(value) {
      const colorAyy = ['cyan', 'green', 'red']
      return colorAyy[value]
    },
    // 查看分销商详情
    onCLickDetail(record) {
      this.$modalRouter.push({
        name: 'distributor-show',
        props: {
          id: record.id
        }
      })
    },
    // 表格字段分销商等级名称
    distributorLevelFilter(value) {
      let val = ''
      this.distributorLevel.forEach(item => {
        if (item.id == value) val = item.name
      })
      return val
    },
    // 分销商编辑
    onClickUpdate(record) {
      this.$modalRouter.push({
        name: 'distributor-edit',
        props: {
          distributor: record
        },
        on: {
          success: () => {
            this.getList()
          }
        }
      })
    },
    // 分销商账户查询
    onClickAccount(record) {
      this.$modalRouter.push({
        name: 'distributor-account-show',
        props: {
          id: record.id
        }
      })
    },
    // 分销商购买记录
    onClickBuylog(record) {
      this.$modalRouter.push({
        name: 'distributor-buy-log',
        props: {
          id: record.id
        }
      })
    },
    // 禁用分销商
    onClickDisable(record) {
      this.$confirm({
        title: '是否禁用分销商？',
        content: '禁用后将无法登录分销商城',
        onOk: () => {
          this.setProhibit({ distributor_id: record.id })
        }
      })
    },
    // 启用分销商
    onClickReCover(record) {
      this.setEnable({ distributor_id: record.id })
    }
  }
}
</script>
<style lang="less" scoped>
.distributor {
  &__header {
    display: flex;
    justify-content: space-between;
  }
  &__search {
    width: 300px;
  }
}

.warn-tooltip {
  .c(#f5222d);
  .mg-l(8px);
  .cur-p;
}
</style>
