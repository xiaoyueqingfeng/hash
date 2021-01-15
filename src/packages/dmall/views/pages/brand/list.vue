<template>
  <oa-panel app class="brand-list">
    <div class="brand-list__header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="搜索手机号"
        ></a-input-search>

        <template slot="actions">
          <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>

        <oa-select
          placeholder="选择品牌商类型"
          v-model="$searchQuery.brand_type"
          :options="brandTypeOptions"
        ></oa-select>
      </oa-filter-box>
      <div class="brand-action__button-group">
        <oa-button @click="onClickCreate" type="primary" class="mg-l8">
          添加
        </oa-button>
      </div>
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
      <span slot="brandType" slot-scope="text, record">
        <a-tag :color="text === 1 ? 'orange' : 'cyan'">
          {{ typeFilter(text) }}
        </a-tag>
      </span>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-modal-link="{
              name: 'brand-edit',
              props: { brand: record },
              on: { success: onModalDone }
            }"
          >
            编辑
          </a>
          <a
            v-modal-link="{
              name: 'brand-account-show',
              props: { id: record.id }
            }"
          >
            账户
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import { getList } from '@/api/brand'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'
import { mapGetters } from 'vuex'
export default {
  mixins: [tableMixins],
  data() {
    return {
      list: [],
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      }
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
    ...mapGetters('dmall', ['brandTypeOptions'])
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getList()])
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
    onClickCreate() {
      this.$modalRouter.push({
        name: 'brand-add',
        on: {
          success: () => {
            this.onModalDone()
          }
        }
      })
    },
    typeFilter(value) {
      let text = ''
      this.brandTypeOptions.forEach(item => {
        value === item.id && (text = item.name)
      })
      console.log(text)
      return text
    },
    onModalDone() {
      this.getList().then(res => {
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
.brand-list__header {
  display: flex;
  justify-content: space-between;
}
</style>
