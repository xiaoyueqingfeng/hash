<template>
  <oa-modal
    title="分配电销"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="assignTelSale$loading"
  >
    <a-row>
      <div class="tips">
        将
        <span v-html="names"></span>
        分配给
      </div>
      <a-form :form="form" class="mg-t16">
        <a-form-item label="选择部门" v-bind="formCol">
          <oa-cascader
            change-on-select
            @change="onChangeOrgan"
            placeholder="选择部门"
            :options="organOptions"
            v-decorator="decorators.organIds"
          ></oa-cascader>
        </a-form-item>
        <a-form-item label="选择员工" v-bind="formCol">
          <oa-select
            :disabled="!organId"
            :options="saleList"
            v-decorator="decorators.sale_id"
            placeholder="选择员工"
          ></oa-select>
        </a-form-item>
      </a-form>
    </a-row>
  </oa-modal>
</template>

<script>
import {
  getOrganList as getLeadsOrganList,
  assignTelSale as leadsAssignTelSale,
  getTelSaleList as getLeadsTelSaleList
} from '@/api/leads'

import {
  getOrganList as getPotentialOrganList,
  assignTelSale as potentialAssignTelSale,
  getTelSaleList as getPotentialTelSaleList
} from '@/api/potential'

import {
  getOrganList as getPayOrganList,
  getTelSaleList as getPayTelSaleList,
  assignTelSale as payAssignTelSale
} from '@/api/pay'

import { listToTree } from 'oa-core/utils/list-to-tree'
import { rules } from './assign-tel-sale#config'
import { get } from 'lodash-es'
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
      // 因为数据域不同 分配电销来源 可选 leads|potential
      required: true
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false,
      saleList: [],
      organOptions: [],
      organId: null,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      }
    }
  },
  created() {
    this.getOrganList()
  },
  computed: {
    rules,
    names() {
      const len = this.customerIds.length
      return len < 5 ? this.customerNames.toString() : `<a>${len}</a>个客户`
    }
  },
  async: {
    getOrganList() {
      const requestObj = {
        leads: getLeadsOrganList,
        potential: getPotentialOrganList,
        pay: getPayOrganList
      }
      requestObj[this.from]().then(res => {
        this.organOptions = listToTree(res.list.filter(item => item.id !== '1'))
      })
    },
    getTelSaleList(query) {
      const requestObj = {
        leads: getLeadsTelSaleList,
        potential: getPotentialTelSaleList,
        pay: getPayTelSaleList
      }
      requestObj[this.from](query).then(res => {
        this.saleList = get(res, 'list', [])
      })
    },
    assignTelSale(data) {
      switch (this.from) {
        case 'leads':
          return leadsAssignTelSale(data)
        case 'potential':
          return potentialAssignTelSale(data)
        case 'pay':
          return payAssignTelSale(data)
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
          this.assignTelSale(sendData).then(() => {
            this.$message.success('分配电销成功！')
            this.$emit('done')
            this.show = false
          })
        }
      })
    },
    onChangeOrgan(organId) {
      this.organId = organId
      this.form.setFieldsValue({
        sale_id: undefined
      })
      if (organId) {
        this.getTelSaleList({
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
</style>
