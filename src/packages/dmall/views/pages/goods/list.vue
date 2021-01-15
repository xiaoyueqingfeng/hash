<template>
  <oa-panel class="goods-list">
    <div class="goods-list__header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="搜索商品名称"
        ></a-input-search>

        <template slot="actions">
          <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>

        <oa-select
          placeholder="选择商品状态"
          v-model="$searchQuery.status"
          :options="goodsStatus"
        ></oa-select>

        <oa-select
          placeholder="选择供应商"
          v-model="$searchQuery.supplier_id"
          :options="supplierOptions"
        ></oa-select>
        <oa-cascader
          placeholder="选择商品分类"
          v-model="$searchQuery.category_id"
          :options="categoryStatus"
        ></oa-cascader>
        <oa-cascader
          placeholder="选择渠道"
          v-model="$searchQuery.channel"
          :options="channelOptions"
        ></oa-cascader>
      </oa-filter-box>
      <div class="good-action__button-group">
        <oa-button @click="onClickTypes" type="primary" class="mg-l8">
          分类管理
        </oa-button>
        <oa-button @click="onClickAdd" type="primary" class="mg-l8">
          添加商品
        </oa-button>
      </div>
    </div>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-show="tbIsSelected" @click="tbOnSelectionReset">清空</a>
        <a v-show="tbIsSelected" @click="onClickBatchSetup">
          批量上架
        </a>
        <a v-show="tbIsSelected" @click="onClickBatchSetDown">
          批量下架
        </a>
      </span>
    </oa-alert-intro>
    <oa-table
      class="mg-t16"
      :scroll="{ x: 1600 }"
      :columns="tableOptions.columns"
      :rowSelection="{
        selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      rowKey="id"
      :loading="getList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="goodsList"
    >
      <template slot="name" slot-scope="text, record">
        <div class="goods-list__name">
          <viewer
            class="goods-list__name-img-wapper"
            style="width: 40px; height: 40px"
            :images="[record.cover_image]"
          >
            <img :src="record.cover_image" alt="商品主图" />
          </viewer>
          <span>{{ text }}</span>
        </div>
      </template>
      <template slot="status" slot-scope="text">
        <a-tag :color="tagColor(text)">{{ goodsStatusFilter(text) }}</a-tag>
      </template>
      <template slot="channel" slot-scope="text">
        <span v-for="value in text" :key="value">
          <a-tag :color="tagColor(value)">{{ channelFilter(value) }}</a-tag>
        </span>
      </template>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onClickUpdate(record)">
            编辑
          </a>
          <a @click="onClickSetup(record)">
            上架
          </a>
          <a @click="onClickSetDown(record)">
            下架
          </a>
          <!-- <a @click="onClickPreview(record)">
            预览
          </a> -->
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import {
  getList,
  setUp,
  setDown,
  batchSetUp,
  batchSetDown,
  preview
} from '@/api/goods'
import { tableOptions } from './list#config'
import tableMixins from 'oa-core/mixins/table'
import { mapGetters } from 'vuex'
import { getSelectList } from '@/api/suppliers'

export default {
  name: 'goodsList',
  mixins: [tableMixins],
  data() {
    return {
      goodsList: [],
      selects: {
        goodsStatus: [],
        categoryStatus: []
      },
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },
      qrCode: '',
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
    ...mapGetters('dmall', [
      'channelOptions',
      'goodsStatus',
      'categoryStatus',
      'supplierOptions'
    ])
  },
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getList()])
    },
    setUp(goodsSn) {
      return setUp(goodsSn)
    },
    setDown(goodsSn) {
      return setDown(goodsSn)
    },
    batchSetUp(goodsSnList) {
      return batchSetUp(goodsSnList)
    },
    batchSetDown(goodsSnList) {
      return batchSetDown(goodsSnList)
    },
    preview(goodsSn) {
      return preview(goodsSn)
    },
    getList() {
      return getList(this.$searchQuery).then(res => {
        // 获取筛选条件
        this.auth_area = res.auth_area
        this.goodsList = res.list
        this.pager = res.pager
      })
    }
  },
  methods: {
    tagColor(value) {
      const colorAyy = ['cyan', 'green', 'red']
      return colorAyy[value]
    },
    success(message) {
      this.getList()
      this.$message.success(message)
    },
    channelFilter(value) {
      let statusName = ''
      this.channelOptions.forEach(element => {
        if (element.id == value) statusName += element.name
      })
      return statusName
    },
    goodsStatusFilter(value) {
      let statusName = ''
      this.goodsStatus.forEach(element => {
        if (element.id == value) statusName = element.name
      })
      return statusName
    },
    onModalDone() {
      this.getList().then(res => {
        this.tbOnSelectionReset()
      })
    },
    onClickTypes() {
      this.$router.push({ name: 'goods-types-list' })
    },
    onClickAdd() {
      this.$router.push({ name: 'goods-add' })
    },
    onClickUpdate(record) {
      this.$router.push({
        name: 'goods-update',
        query: { goods_sn: record.goods_sn }
      })
    },
    onClickSetup(record) {
      this.setUp({ goods_sn: record.goods_sn }).then(() => {
        this.success('商品上架成功')
      })
    },
    onClickSetDown(record) {
      this.setDown({ goods_sn: record.goods_sn }).then(() => {
        this.success('商品下架成功')
      })
    },
    onClickBatchSetup() {
      const goods_sn = this.selectedRows.map(item => item.goods_sn)
      this.batchSetUp({ goods_sn }).then(() => {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.success('商品批量上架成功')
      })
    },
    onClickBatchSetDown() {
      const goods_sn = this.selectedRows.map(item => item.goods_sn)
      this.batchSetDown({ goods_sn }).then(() => {
        this.selectedRowKeys = []
        this.selectedRows = []
        this.success('商品批量下架成功')
      })
    },
    onClickPreview(record) {
      this.preview({ goods_sn: record.goods_sn }).then(res => {
        this.$modalRouter.push({
          name: 'goods-preview',
          props: {
            imageUrl: res.qr_code
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list__header {
  display: flex;
  justify-content: space-between;
}
.goods-list__name {
  display: flex;
  align-items: center;
  &-img-wapper {
    width: 40px;
    height: 40px;
    margin-right: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.warn-tooltip {
  .c(#f5222d);
  .mg-l(8px);
  .cur-p;
}
</style>
