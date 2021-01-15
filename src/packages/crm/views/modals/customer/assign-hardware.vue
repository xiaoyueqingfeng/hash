<template>
  <oa-modal
    title="分配硬件销售"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="assignHardwareSale$loading"
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
              placeholder="选择部门"
              :options="organOptions"
              @change="onChangeOrgan"
              v-decorator="[
                'organIds',
                { rules: [{ required: true, message: '请选择部门' }] }
              ]"
            ></oa-cascader>
          </a-form-item>
          <a-form-item
            label="选择员工"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 16 }"
          >
            <oa-select
              :options="serverList"
              v-decorator="[
                'sale_id',
                {
                  rules: [{ required: true, message: '员工必选' }]
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
  getOrganList as getPayOrganList,
  getHarwareList as getPayHarwareList,
  assignHardwareSale as payAssignHardwareSale
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
      // 因为数据域不同 分配销售来源 可选 pay
      required: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      show: true,
      serverList: [],
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
    getHarwareList(query) {
      switch (this.from) {
        case 'pay': {
          return getPayHarwareList(query).then(res => {
            this.serverList = res.list
          })
        }
      }
    },
    getOrganList() {
      return getPayOrganList().then(res => {
        this.organOptions = listToTree(res.list.filter(item => item.id !== '1'))
      })
    },
    assignHardwareSale(data) {
      switch (this.from) {
        case 'pay':
          return payAssignHardwareSale(data)
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
          this.assignHardwareSale(sendData).then(() => {
            this.$message.success('分配硬件成功！')
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
        this.getHarwareList({
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
