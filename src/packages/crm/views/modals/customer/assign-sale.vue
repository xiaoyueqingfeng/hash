<template>
  <oa-modal
    title="分配销售"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="assignSale$loading"
  >
    <a-row>
      <div class="tips">
        将
        <span v-html="names"></span>
        分配给
      </div>
      <div class="form_">
        <a-form :form="form">
          <a-form-item
            label="选择部门"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <oa-cascader
              change-on-select
              @change="onChangeOrgan"
              placeholder="选择部门"
              :options="organOptions"
              v-decorator="[
                'organIds',
                { rules: [{ required: true, message: '请选择部门' }] }
              ]"
            ></oa-cascader>
          </a-form-item>
          <a-form-item
            label="选择销售"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <oa-select
              :options="saleList"
              v-decorator="[
                'sale_id',
                {
                  rules: [{ required: true, message: '销售必选' }]
                }
              ]"
            ></oa-select>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import {
  getOrganList as getLeadsOrganList,
  assignSale as leadsAssignSale,
  getSaleList as getLeadsSaleList
} from '@/api/leads'

import {
  getOrganList as getPotentialOrganList,
  assignSale as potentialAssignSale,
  getSaleList as getPotentialSaleList
} from '@/api/potential'

import {
  getOrganList as getPayOrganList,
  getSaleList as getPaySaleList,
  assignSale as payAssignSale
} from '@/api/pay'

import { listToTree } from 'oa-core/utils/list-to-tree'

export default {
  props: {
    customerIds: {
      type: Array,
      required: true,
      default: () => []
    },
    customerNames: {
      type: Array,
      required: true,
      default: () => []
    },
    from: {
      type: String,
      // 因为数据域不同 分配销售来源 可选 leads|potential
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: false,
      saleList: [],
      organOptions: []
    }
  },
  created() {
    this.getOrganList()
  },
  computed: {
    names() {
      const len = this.customerIds.length
      return len < 5 ? this.customerNames.toString() : `<a>${len}</a>个客户`
    }
  },
  async: {
    getOrganList() {
      switch (this.from) {
        case 'leads':
          return getLeadsOrganList().then(res => {
            this.organOptions = listToTree(
              res.list.filter(item => item.id !== '1')
            )
          })
        case 'potential':
          return getPotentialOrganList().then(res => {
            this.organOptions = listToTree(
              res.list.filter(item => item.id !== '1')
            )
          })
        case 'pay':
          return getPayOrganList().then(res => {
            this.organOptions = listToTree(
              res.list.filter(item => item.id !== '1')
            )
          })
      }
    },
    getSaleList(query) {
      switch (this.from) {
        case 'leads':
          return getLeadsSaleList(query).then(res => {
            this.saleList = res.list
          })
        case 'potential': {
          return getPotentialSaleList(query).then(res => {
            this.saleList = res.list
          })
        }
        case 'pay': {
          return getPaySaleList(query).then(res => {
            this.saleList = res.list
          })
        }
      }
    },
    assignSale(data) {
      switch (this.from) {
        case 'leads':
          return leadsAssignSale(data)
        case 'potential':
          return potentialAssignSale(data)
        case 'pay':
          return payAssignSale(data)
      }
    }
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          const sendData = {
            sale_id: fieldsValue.sale_id,
            leads_id: this.customerIds
          }
          this.assignSale(sendData).then(() => {
            this.$message.success('分配销售成功！')
            this.$emit('done')
            this.show = false
          })
        }
      })
    },
    onChangeOrgan(organId) {
      this.form.setFieldsValue({
        sale_id: undefined
      })
      if (organId) {
        this.getSaleList({
          organ_id: organId
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.tips {
  text-align: center;
  span {
    font-weight: 600;
  }
}
.form_ {
  position: relative;
  top: 24px;
  left: 30px;
}
</style>
