<template>
  <oa-panel :class="b()">
    <a-form :form="form">
      <!-- 商品名称 start -->
      <a-form-item label="商品名称" v-bind="formCol" required>
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input
              v-decorator="decorators.name"
              placeholder="请输入商品名称"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 商品名称 end -->

      <!-- 商品分类 start -->
      <a-form-item label="商品分类" v-bind="formCol" required>
        <a-row :gutter="8">
          <a-col :span="12">
            <a-cascader
              :options="categoryOptions"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              v-decorator="decorators.category_id"
              placeholder="请选择商品分类"
            />
          </a-col>
          <a-col :span="2">
            <a @click="onClickPsuhRouter('goods-types-list')">分类管理</a>
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 商品分类 end -->

      <!-- 供应商 start -->
      <a-form-item label="供应商" v-bind="formCol" required>
        <a-row :gutter="8">
          <a-col :span="12">
            <a-select
              v-decorator="decorators.supplier_id"
              :options="supplierOptions"
              placeholder="请选择供应商"
            />
          </a-col>
          <a-col :span="2">
            <a @click="onClickPsuhRouter('suppliers-list')">添加供应商</a>
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 供应商 end -->

      <!-- 商品图片 start -->
      <a-form-item label="商品图片" v-bind="formCol" required>
        <oa-image-upload
          isSaas
          v-decorator="decorators.goods_images"
          @change="onChangeGetImages"
          :numLimit="5"
        >
          <div class="image-action" slot="actions" slot-scope="item">
            <span class="cover" v-if="item.index === 0">主图</span>
            <span class="action" v-if="item.index !== 0" @click="onLeft(item)">
              左移
            </span>
            <span
              class="action"
              v-if="fileList.length - 1 > item.index"
              @click="onRignt(item)"
            >
              右移
            </span>
            <span class="action deldsfdsafdasfa" @click="e => onDel(item, e)">
              删除
            </span>
            <span
              v-if="item.index !== 0"
              class="action cover"
              @click.stop="e => onCover(item, e)"
            >
              设为主图
            </span>
          </div>
        </oa-image-upload>
      </a-form-item>
      <!-- 商品图片 end -->
      <!-- 轻嘤售卖 start -->
      <a-form-item label="售卖渠道" v-bind="formCol" required>
        <a-checkbox-group
          :options="qinYingOptions"
          v-decorator="decorators.channel"
          @change="onChangeIsBuy"
        ></a-checkbox-group>
      </a-form-item>
      <!-- 轻嘤售卖 end -->
      <!-- 规格 start -->
      <a-form-item label="规格" v-bind="formCol" required>
        <a-radio-group
          v-decorator="decorators.spec_type"
          @change="onChangeSpecType"
          :options="specOptions"
          :disabled="isEditMode"
        ></a-radio-group>
        <a-button
          v-if="specType === 2 && skuList.length < 3"
          @click="onClickAddSpec"
          :class="b('add-spec')"
          type="dashed"
        >
          <a-icon type="plus" :class="b('sku-add-icon')" />
          <span>添加规格项（{{ skuList.length }}/3）</span>
        </a-button>
        <template v-for="(item, key) in skuList">
          <div v-if="specType === 2" :key="key" :class="b('add-spec-item')">
            <div class="spec-form-item">
              <div class="spec-form-item__form">
                <a-form-item label="规格项名称" v-bind="specFormCol" required>
                  <a-input
                    v-model="item.spec_name"
                    placeholder="请输入规格项名称"
                  />
                </a-form-item>
                <a-form-item label="规格项设置" v-bind="specFormCol">
                  <template v-for="(spec, key1) in item.spec_item_name">
                    <a-tag
                      closable
                      @close="onClickDelSpec(item.spec_item_name, key1)"
                      :key="key1"
                    >
                      {{ spec }}
                    </a-tag>
                  </template>

                  <a
                    @click="onClickAddSpecItem(item)"
                    v-if="item.spec_item_name.length < 5"
                  >
                    添加规格
                  </a>
                </a-form-item>
              </div>
              <a @click="onClickDeleteSpec(key)">
                <a-icon type="delete"></a-icon>
                删除
              </a>
            </div>
          </div>
        </template>

        <a-form-item
          :help="tableTips"
          :validateStatus="tableErr ? 'error' : ''"
        >
          <!-- <a-alert message="价格从高到低填写" type="info" /> -->
          <a-table
            class="spec-form-item__table"
            :columns="skuColumns"
            :dataSource="tableData"
            key="id"
            :position="null"
          >
            <span slot="prime_cost_price">
              进货价(元)
            </span>
            <span slot="market_price">
              <i style="color: red">*</i>
              建议零售价(元)
            </span>
            <span slot="retail_price">
              <i style="color: red">*</i>
              零售价(元)
            </span>
            <span slot="delete_line_price">
              <i style="color: red">*</i>
              划线价(元)
            </span>
            <span slot="v1_price">
              <i style="color: red">*</i>
              v1拿货价(元)
            </span>
            <span slot="v2_price">
              <i style="color: red">*</i>
              v2拿货价(元)
            </span>
            <span slot="v3_price">
              <i style="color: red">*</i>
              v3拿货价(元)
            </span>
            <span slot="commission">
              <i style="color: red">*</i>
              商家分成(元)
            </span>
            <span slot="store_count">
              <i style="color: red">*</i>
              库存(件)
            </span>
            <span slot="weight">
              重量(kg)
            </span>
            <template
              v-for="col in [
                'prime_cost_price',
                'market_price',
                'cost_price',
                'retail_price',
                'delete_line_price',
                'v1_price',
                'v2_price',
                'v3_price',
                'commission',
                'store_count',
                'weight'
              ]"
              :slot="col"
              slot-scope="text, record"
            >
              <div
                :class="{
                  'spec-form-item__table-apply': true,
                  'spec-form-item__table-apply-active': tableData.length > 1
                }"
                :key="col"
              >
                <!-- width: tableData.length > 1 ? '80px' : '100%' -->
                <a-input
                  :style="{
                    margin: '-5px 8px 0 0'
                  }"
                  :value="text"
                  @change="
                    e => handleChangeSpec(e.target.value, record.key, col)
                  "
                />
                <a
                  class="apply__a"
                  v-if="tableData.length > 1"
                  @click="onClickApplictionValue(text, record.key, col)"
                >
                  批量应用
                </a>
              </div>
            </template>
          </a-table>
        </a-form-item>
      </a-form-item>
      <!-- 规格 end -->

      <!-- 运费 start -->
      <a-form-item label="运费" v-if="channel.includes(2)" v-bind="formCol">
        <a-radio-group
          v-decorator="decorators.is_free_shipping"
          @change="onChangeFreeShopping"
        >
          <a-radio :value="1">包邮</a-radio>
          <a-radio :value="0">
            固定运费

            <a-input v-model="shipping_price" v-if="!isFreeShopping"></a-input>
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <!-- 运费 end -->

      <!-- 商品详情 start -->
      <a-form-item label="商品详情" v-bind="formCol">
        <a-row :gutter="8">
          <a-col :span="16">
            <oa-editor v-decorator="decorators.content"></oa-editor>
          </a-col>
        </a-row>
      </a-form-item>
      <!-- 商品详情 end -->
      <!-- 销量 start -->
      <a-form-item label="销量" v-bind="formCol">
        <a-input-number v-decorator="decorators.order_count" />
      </a-form-item>
      <!-- 销量 end -->
      <!-- 排序 start -->
      <a-form-item label="排序" v-bind="formCol">
        <a-input-number v-decorator="decorators.sort_order" />
      </a-form-item>
      <!-- 排序 end -->

      <!-- 上架状态 start -->
      <a-form-item
        label="上架状态"
        v-if="!isEditMode"
        v-bind="formCol"
        required
      >
        <a-radio-group
          :options="statusOptions"
          v-decorator="decorators.status"
        ></a-radio-group>
      </a-form-item>
      <!-- 上架状态 end -->
      <a-form-item :wrapper-col="{ span: 4, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          保存
        </a-button>
      </a-form-item>
    </a-form>
  </oa-panel>
</template>
<script>
import { ruleOptions, skuColumns } from './add#config'
import { getCategoryOptions, add, update } from '@/api/goods'
import { getSelectList } from '@/api/suppliers'
import OaEditor from 'oa-core/views/components/editor#/editor.vue'
import { difference, cloneDeep } from 'lodash'
export default {
  name: 'GoodsForm',
  bem: {
    b: 'good-form'
  },
  props: {
    isEditMode: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    OaEditor
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      formCol: {
        'label-col': { span: 4 },
        'wrapper-col': { span: 20 }
      },
      specFormCol: {
        'label-col': { span: 2 },
        'wrapper-col': { span: 22 }
      },
      content: '',
      specType: 1,
      tableData: [
        {
          cost_price: '',
          store_count: '',
          key: parseInt(Math.random() * 999999).toString()
        }
      ],
      fileList: [],
      isFreeShopping: 1,
      categoryOptions: [],
      supplierOptions: [],
      specOptions: [
        { label: '单规格', value: 1 },
        { label: '多规格', value: 2 }
      ],
      freeShoppingOptions: [
        { label: '包邮', value: 1 },
        { label: '固定运费', value: 0 }
      ],
      qinYingOptions: [
        { label: '轻嘤商城', value: 1 },
        { label: '分销商城', value: 2 }
      ],
      statusOptions: [
        { label: '暂不上架', value: 0 },
        { label: '立即上架', value: 1 }
      ],
      tableTips: '',
      tableErr: false,
      skuList: [],
      // 邮费
      shipping_price: 15,
      channel: [1]
    }
  },
  computed: {
    skuColumns,
    sku() {
      return this.skuList.map((item, index) => {
        return {
          title: item.spec_name,
          width: 228,
          dataIndex: index
        }
      })
    }
  },
  mounted() {
    if (this.isEditMode) {
      this.initData()
    }
    this.getCategoryOptions()
    this.getSelectList()
  },
  async: {
    add(form) {
      return add(form).then(res => {
        this.success('添加商品成功')
      })
    },
    update(form) {
      return update(form).then(res => {
        this.success('更新商品成功')
      })
    },
    getCategoryOptions() {
      return getCategoryOptions().then(res => {
        this.categoryOptions = res.list
      })
    },
    getSelectList() {
      return getSelectList().then(res => {
        this.supplierOptions = res.list.map(item => {
          return {
            label: item.supplier_name,
            value: item.id
          }
        })
      })
    }
  },
  methods: {
    onChangeIsBuy(value) {
      this.$set(this, 'channel', value)
    },
    onClickPsuhRouter(name) {
      this.$router.push({ name })
    },
    success(message) {
      this.$router.push({ name: 'goods-list' })
      this.$message.success(message)
    },
    setMainImage() {
      const goodsImages = this.info.goods_images.filter(item => {
        return item.is_cover !== 1
      })
      const mainImage = this.info.goods_images.filter(item => {
        return item.is_cover === 1
      })
      this.$set(this, 'fileList', [...mainImage, ...goodsImages])
      this.setFileList()
    },
    initData() {
      // 初始化主图
      this.setMainImage()
      this.skuList = this.info.spec_all
      this.channel = this.info.channel
      // 初始化表格
      this.initTableData()
    },
    initTableData() {
      const goodsSku = cloneDeep(this.info.goods_sku)
      this.tableData = goodsSku.map(item => {
        item.spec_arr.forEach((ele, index) => {
          item[index] = ele.spec_item_name
        })
        item.key = item.id
        return item
      })
    },
    // 上传图片 fileList
    onChangeGetImages(fileList) {
      this.fileList = fileList
    },
    // 删除规格
    onClickDeleteSpec(index) {
      this.skuList.splice(index, 1)
      // 规格减少 表格改变
      this.changeTable()
    },
    setFileList() {
      this.$nextTick().then(() => {
        this.form.setFieldsValue({ goods_images: cloneDeep(this.fileList) })
      })
    },
    onLeft({ item, index }) {
      if (index != 0) {
        this.fileList[index] = this.fileList.splice(
          index - 1,
          1,
          this.fileList[index]
        )[0]
      } else {
        this.fileList.push(this.fileList.shift())
      }
      this.setFileList()
    },
    onRignt({ item, index }) {
      if (index != this.fileList.length - 1) {
        this.$set(
          this.fileList,
          index,
          this.fileList.splice(index + 1, 1, this.fileList[index])[0]
        )
      } else {
        this.fileList.unshift(this.fileList.splice(index, 1)[0])
      }
      this.setFileList()
    },
    onDel({ item, index }, e) {
      this.fileList.splice(index, 1)
      this.setFileList()
    },
    onCover({ item, index }, e) {
      if (index != 0) {
        const image = this.fileList.splice(index, 1)[0]
        this.fileList.unshift(image)
        this.setFileList()
      }
    },
    handleChangeSpec(value, key, column) {
      const newData = [...this.tableData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.tableData = newData
      }
    },
    changeTable() {
      let list = []
      let skuList = []
      let skuItem = {
        cost_price: '',
        store_count: ''
      }
      let templateObj = {}
      if (this.channel.length === 2) {
        templateObj = {
          cost_price: '',
          v1_price: '',
          v2_price: '',
          retail_price: '',
          delete_line_price: '',
          v3_price: '',
          commission: ''
        }
      } else if (this.channel.length === 1 && this.channel.includes(1)) {
        templateObj = {
          retail_price: '',
          delete_line_price: ''
        }
      } else if (this.channel.length === 1 && this.channel.includes(2)) {
        templateObj = {
          market_price: '',
          v1_price: '',
          v2_price: '',
          v3_price: '',
          commission: ''
        }
      }
      skuItem = { ...skuItem, ...templateObj }
      let isReturn = false
      this.skuList.forEach((item, index) => {
        if (item.spec_item_name.length !== 0) {
          skuList.push(item)
        } else {
          list.push(cloneDeep(skuItem))
          list.forEach(o => {
            o.key = parseInt(Math.random() * 999999).toString()
          })
          this.tableData = list
          isReturn = true
        }
      })
      if (!this.skuList.length) {
        list.push(cloneDeep(skuItem))
        list.forEach(o => {
          o.key = parseInt(Math.random() * 999999).toString()
        })
        this.tableData = list
        isReturn = true
      }
      if (isReturn) {
        return
      }
      skuList[0].spec_item_name.forEach((item, index) => {
        skuItem['0'] = item
        if (skuList[1] && skuList[1].spec_item_name.length) {
          skuList[1].spec_item_name.forEach((ite, inde) => {
            skuItem['1'] = ite
            if (skuList[2] && skuList[2].spec_item_name.length) {
              skuList[2].spec_item_name.forEach((it, ind) => {
                skuItem['2'] = it
                list.push(cloneDeep(skuItem))
              })
            } else {
              list.push(cloneDeep(skuItem))
            }
          })
        } else {
          list.push(cloneDeep(skuItem))
        }
      })
      list.forEach(o => {
        o.key = parseInt(Math.random() * 999999).toString()
      })
      this.tableData = list
    },
    // 是否包邮
    onChangeFreeShopping(e) {
      this.isFreeShopping = e.target.value
    },
    // 获取规格
    onChangeSpecType(val) {
      console.log(val)
      // 当选但规格清空skuList
      if (val === 1) this.$set(this, 'skuList', [])
      this.specType = val.target.value
    },
    // 批量应用
    onClickApplictionValue(value, key, col) {
      this.tableData = this.tableData.map(item => {
        item[col] = value
        return item
      })
    },
    // 添加规则
    onClickAddSpecItem(item) {
      const that = this
      this.$modalRouter.push({
        name: 'goods-spec-item',
        props: {
          item
        },
        on: {
          success(value) {
            item.spec_item_name.push(value)
            that.changeTable()
          }
        }
      })
    },
    // 删除规则
    onClickDelSpec(item, index) {
      item.splice(index, 1)
      this.changeTable()
    },
    // 添加新规格
    onClickAddSpec() {
      this.skuList.push({
        spec_name: '',
        spec_item_name: []
      })
    },
    updateData(values) {
      const goods_sku = this.tableData.map(item => {
        item.spec_arr.forEach((item, index) => {
          delete item[index]
        })
        return item
      })
      // sku规格不编辑 只编辑价格
      let form = {
        goods_sn: this.info.goods_sn,
        ...values,
        goods_sku: JSON.stringify(goods_sku)
      }
      this.update(form)
      return
    },
    addData(values) {
      const goods_sku = this.tableData.map(item => {
        const ite = cloneDeep(item)
        ite.spec = []
        this.skuList.forEach((ele, index) => {
          ite.spec.push({
            spec_name: ele.spec_name,
            spec_item_name: item[index]
          })
          delete ite[index]
        })
        return ite
      })
      let form = {
        ...values,
        goods_sku: JSON.stringify(goods_sku)
      }
      this.add(form)
    },
    formatData(values) {
      values.goods_images = values.goods_images.map((item, index) => {
        return {
          id: item.id || 0,
          image_key: item.key,
          is_cover: index === 0 ? 1 : 0
        }
      })
      values.shipping_price = this.shipping_price
      values.goods_images = JSON.stringify(values.goods_images)
      values.channel = JSON.stringify(values.channel)
      values.category_id = values.category_id[values.category_id.length - 1]
      return values
    },
    onSubmit() {
      let isReturn = false
      let tableError = false
      // 校验表格数字填写
      this.tableData.forEach(item => {
        const obj = cloneDeep(item)
        delete obj.cost_price

        const isPrice =
          Object.values(obj).length !==
          Object.values(obj).filter(item => item !== '').length
        tableError = isPrice
        this.tableTips = isPrice ? '请正确填写表格' : ''
        this.tableErr = isPrice
        isReturn = isPrice
      })
      this.form.validate().then(values => {
        if (isReturn) {
          return
        }
        this.isEditMode
          ? this.updateData(this.formatData(values))
          : this.addData(this.formatData(values))
      })
    }
  }
}
</script>
<style lang="less">
.good-form {
  &__add-spec {
    margin-top: 32px;
    width: 100%;
  }
  &__add-spec-item {
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #cdd4df;
    margin-top: 24px;
  }
  .image-action {
    display: flex;
    justify-content: space-between;
    .cover {
      font-size: 12px;
      color: #fff;
      font-weight: 600;
      line-height: 32px;
    }
  }
  .spec-form-item {
    display: flex;
    justify-content: space-between;
    &__form {
      flex: 1;
      margin-right: 32px;
    }
    &__table {
      margin-top: 32px;
    }

    &__table-apply {
      display: flex;
      flex-direction: column;
      align-items: center;
      &-active {
        min-height: 48px;
        .apply__a {
          display: none;
        }
        &:hover {
          .apply__a {
            display: inline;
          }
        }
      }
    }
  }
}
</style>
