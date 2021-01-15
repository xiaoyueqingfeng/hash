<template>
  <oa-modal
    v-model="show"
    title="添加POS机"
    :confirmLoading="addPos$loading"
    @ok="handlerSubmit"
  >
    <a-form :form="form">
      <a-form-item label="品牌" v-bind="formCol" required>
        <a-select
          showSearch
          placehoder="请选择品牌"
          v-decorator="decorators.leads_id"
          :filterOption="false"
          @search="handleBrandSearch"
          @select="handleBrandSelect"
        >
          <a-spin
            size="small"
            v-if="posGetBrandList$loading"
            slot="notFoundContent"
          ></a-spin>
          <span slot="notFoundContent" v-else>无搜索结果</span>
          <a-select-option
            v-for="item in brandList"
            :key="item.leads_id"
            :value="item.leads_id"
          >
            {{ item.brand_name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="商户号" v-bind="formCol">
        <a-input
          v-decorator="decorators.mch_id"
          size="large"
          autocomplete="off"
          :disabled="!mchIdCanEdit"
          placeholder="请输入商户号"
        ></a-input>
      </a-form-item>
      <pos-device
        v-for="(k, index) in form.getFieldValue('keys')"
        :key="index"
        :shopList="shopList"
        :k="k"
        :form="form"
      ></pos-device>
      <div class="operate-pos__add">
        <a-button type="dashed" style="width: 100%;" @click="handleAddPos">
          <a-icon type="plus" />
          增加POS机
        </a-button>
      </div>
    </a-form>
  </oa-modal>
</template>

<script>
import { posGetShopList, addPos, posGetBrandList, posGetMchid } from '@/api/pos'
import { get, debounce } from 'lodash-es'
import { ruleOptions } from './add-pos#config'
import posDevice from './components#/pos'
import checkboxGroupVue from 'oa-core/views/components/checkbox-group.vue'
export default {
  name: 'operate-pos',

  components: { posDevice },

  props: {},

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      show: false,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      shopList: [],
      brandList: [],
      id: 1,
      mchIdCanEdit: true
    }
  },

  computed: {
    ruleOptions
  },

  async: {
    //获取菜单
    posGetShopList(leads_id) {
      return posGetShopList({ leads_id }).then(res => {
        this.shopList = get(res, 'list', [])
      })
    },
    posGetBrandList(keywords) {
      return posGetBrandList({ keywords: keywords.trim() || '' }).then(res => {
        this.brandList = get(res, 'list', [])
      })
    },
    posGetMchid(leads_id) {
      return posGetMchid({ leads_id })
    },
    //获取菜单详情
    addPos(data) {
      return addPos(data)
    }
  },

  mounted() {
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },

  methods: {
    handleBrandSearch: debounce(function(keywords) {
      if (!keywords) return false
      this.posGetBrandList(keywords)
    }, 400),
    handleBrandSelect(leads_id, options) {
      console.log('leads_id options', leads_id, options)
      this.posGetShopList(leads_id)
      this.posGetMchid(leads_id).then(res => {
        this.form.setFieldsValue({ mch_id: res.info.mch_id })
        if (res.info.mch_id) this.mchIdCanEdit = false
        else this.mchIdCanEdit = true
      })
    },
    handlerSubmit() {
      this.form.validate().then(values => {
        if (!values.terminal_list || values.terminal_list.length === 0) {
          this.$message.error('请添加至少一台POS机')
          return false
        }

        values.terminal_list = values.terminal_list.map(shop => {
          let shop_name = this.shopList.find(s => s.shop_id === shop.shop_id)
            .shop_name
          shop.shop_name = shop_name
          return shop
        })
        this.addPos({
          leads_id: values.leads_id,
          mch_id: values.mch_id,
          terminal_list: values.terminal_list
        }).then(res => {
          this.$message.success('添加POS机成功')
          this.$emit('done')
          this.show = false
        })
      })
    },
    handleAddPos() {
      const { form } = this
      let keys = form.getFieldValue('keys')

      let nextKeys = keys.concat(this.id++)
      form.setFieldsValue({
        keys: nextKeys
      })
    },
    handleRemovePos(k) {
      const { form } = this
      const devices = form.getFieldValue('devices')
      if (devices.length === 1) {
        return
      }
      form.setFieldsValue({
        devices: devices.filter(key => key !== k)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.operate-pos {
  &__add {
    display: flex;
    justify-content: center;
  }
}
</style>
