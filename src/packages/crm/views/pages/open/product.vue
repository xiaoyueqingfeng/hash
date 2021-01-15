<template>
  <div :class="b()">
    <a-row type="flex" justify="end" class="mg-b16">
      <a-col>
        <oa-button class="button" @click="onAddProduct" type="primary">
          新增产品
        </oa-button>
      </a-col>
    </a-row>
    <oa-table
      rowKey="id"
      :scroll="{ x: 1200 }"
      :dataSource="dataSource"
      :loading="getProductList$loading"
      :columns="tableOptions.columns"
      :pager="pager"
      @change="tbOnTableChange"
    >
      <template slot="type" slot-scope="text, record">
        {{ typeTodesc(record.type) }}
      </template>
      <template slot="status" slot-scope="text, record">
        {{ statusTodesc(record.status) }}
      </template>
      <template slot="model" slot-scope="text, record">
        {{ modelTodesc(record.model) }}
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a-popconfirm
            @confirm="onActivateProduct(record)"
            v-if="record.status === 0"
          >
            <template slot="title">
              <p>确认激活?</p>
              <p>激活后该产品可以进行设备接入</p>
            </template>
            <a>
              激活授权
            </a>
          </a-popconfirm>
          <a @click="onDeActivateProduct(record)" v-if="record.status === 1">
            置为无效
          </a>
          <a @click="onEditProduct(record)">
            编辑
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>

<script>
import { getProductList, changeSupplierStatus } from '@/api/product'
import { tableOptions } from './product.config'
import { get, mixin } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  components: {},
  bem: {
    b: 'open-product'
  },
  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      mapping: [],
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
      this.$searchQuery = newRoute.meta.query
      this.getProductList()
    }
  },
  async: {
    /**
     * @description 获取硬件列表
     */
    getProductList() {
      console.log('this.$searchQuery', this.$searchQuery)
      return getProductList(this.$searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.mapping = get(res, 'mapping', {})
        this.pager = res.pager
      })
    },
    changeSupplierStatus(data) {
      return changeSupplierStatus(data).then(res => {
        this.$success({
          content: '状态切换成功'
        })
        this.$router.reload()
      })
    }
  },

  mounted() {
    this.getProductList()
  },

  methods: {
    modelTodesc(model) {
      let currentModel = this.mapping.model.filter(i => i.id === model)[0]
      return currentModel && currentModel['name']
    },
    typeTodesc(type) {
      let currentType = this.mapping.type.filter(i => i.id === type)[0]
      return currentType && currentType['name']
    },
    statusTodesc(status) {
      let currentStatus = this.mapping.status.filter(i => i.id === status)[0]
      return currentStatus && currentStatus['name']
    },
    /**
     * @description 新增产品
     */
    onAddProduct() {
      this.$modalRouter.push({
        name: 'open-product-edit',
        props: {
          isEdit: false,
          mapping: this.mapping
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 编辑产品
     */
    onEditProduct(record) {
      this.$modalRouter.push({
        name: 'open-product-edit',
        props: {
          isEdit: true,
          id: record.id,
          mapping: this.mapping
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 激活产品
     */
    onActivateProduct(record) {
      this.changeSupplierStatus({
        product_id: record.id,
        switch: 1
      })
    },
    /**
     * @description 置为无效
     */
    onDeActivateProduct(record) {
      this.changeSupplierStatus({
        product_id: record.id,
        switch: 2
      })
    }
  }
}
</script>

<style lang="less" scoped>
.open-product {
  padding: 24px;
  background: #fff;
}
</style>
