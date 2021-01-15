<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑合伙人' : '邀请合伙人'"
    :confirmLoading="isEdit ? agentEdit$loading : agentInvite$loading"
    :okText="isEdit ? '确定' : '生成邀请链接'"
    @ok="submitHandler"
  >
    <a-form :form="form">
      <a-form-item label="合伙人姓名" v-bind="formCol">
        <a-input
          placeholder="请输入合伙人姓名"
          v-decorator="decorators.name"
        ></a-input>
      </a-form-item>
      <a-form-item label="选择等级" v-bind="formCol">
        <oa-select
          :options="levelOptions"
          v-decorator="decorators.level_id"
        ></oa-select>
      </a-form-item>
      <a-form-item label="所属品牌" v-bind="formCol">
        <a-input
          placeholder="请输入品牌"
          v-decorator="decorators.brand_name"
        ></a-input>
      </a-form-item>
      <a-form-item label="城市" v-bind="formCol">
        <crm-area-picker
          :province-id.sync="areaObj.province_id"
          :city-id.sync="areaObj.city_id"
          :area-id.sync="areaObj.district_id"
        ></crm-area-picker>
      </a-form-item>
      <a-form-item v-if="isEdit" label="绑定手机号" v-bind="formCol">
        <a-input v-decorator="decorators.mobile"></a-input>
      </a-form-item>
      <a-form-item label="备注" v-bind="formCol">
        <a-textarea
          placeholder="请输入备注信息"
          v-decorator="decorators.remark"
        ></a-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
import { rules } from './invite#config'
import { agentInvite, agentDetail, agentEdit, getLevelList } from '@/api/agent'
import { get, pick } from 'lodash-es'
export default {
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      show: true,
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      areaObj: {
        province_id: '',
        city_id: '',
        district_id: ''
      },
      levelOptions: []
    }
  },
  props: {
    isEdit: {
      type: Boolean
    },
    id: {
      type: [Number, String]
    }
  },
  computed: {
    rules
  },
  async: {
    //邀请
    agentInvite(data) {
      return agentInvite(data)
    },
    //编辑
    agentEdit(data) {
      return agentEdit(data)
    },
    //获取详情
    agentDetail() {
      return agentDetail({ id: this.id }).then(res => {
        this.levelOptions = get(res, 'level_map', [])
        this.form.setFieldsValue({
          name: get(res, 'name', ''),
          brand_name: get(res, 'brand_name', ''),
          remark: get(res, 'remark', ''),
          mobile: get(res, 'mobile', ''),
          level_id: get(res, 'level_id', '')
        })
        this.areaObj.province_id = get(res, 'province_id')
        this.areaObj.city_id = get(res, 'city_id')
        this.areaObj.district_id = get(res, 'district_id')
      })
    },
    //获取会员等级
    getLevelList() {
      return getLevelList().then(res => {
        this.levelOptions = get(res, 'list', [])
      })
    }
  },
  created() {
    if (this.isEdit) {
      this.agentDetail()
    } else {
      this.getLevelList()
    }
  },
  methods: {
    submitHandler() {
      this.form.validate().then(values => {
        if (this.isEdit) {
          this.agentEdit({ ...values, id: this.id, ...this.areaObj }).then(
            res => {
              this.$message.success('编辑成功')
              this.show = false
              this.$emit('done')
            }
          )
        } else {
          this.agentInvite({ ...values, ...this.areaObj }).then(res => {
            let id = get(res, 'id')
            this.show = false
            this.$emit('done')
            this.$modalRouter.push({
              name: 'distribution-agent-share',
              props: {
                id
              }
            })
          })
        }
      })
    }
  }
}
</script>
