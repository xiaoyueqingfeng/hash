<template>
  <oa-modal
    v-model="show"
    title="更新子部门"
    width="600px"
    :confirmLoading="updateOrgan$loading"
    @ok="onOk"
  >
    <a-form :form="form">
      <a-form-item
        label="所属部门"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <console-organ-cascader
          v-decorator="decorators.parent_id"
        ></console-organ-cascader>
      </a-form-item>
      <a-form-item
        label="部门名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input
          v-decorator="decorators.name"
          placeholder="请填写部门名称"
        ></a-input>
      </a-form-item>
      <a-form-item label="排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-input
          v-decorator="decorators.list_order"
          placeholder="请填写排序权重"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="团队属性"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <!-- <a-radio-group v-decorator="decorators.team_id">
          <a-radio v-for="(tname, tid) in teamMap" :value="tid" :key="tid">
            {{ tname }}
          </a-radio>
        </a-radio-group> -->
        <oa-cascader
          v-decorator="decorators.team_id"
          placeholder="请选择团队属性"
          :options="teamMap"
          change-on-select
        ></oa-cascader>
      </a-form-item>
      <a-form-item
        label="所属大区"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group v-decorator="decorators.area_id">
          <a-radio v-for="(aname, aid) in areaMap" :value="aid" :key="aid">
            {{ aname }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { labelCol, wrapperCol, decorators } from './organ#config'
import { updateOrgan } from '@/api/organ'
import { pick } from 'lodash-es'

export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    teamMap: {
      type: Array,
      required: true
    },
    areaMap: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false,
      form: this.$form.createForm(this),
      labelCol,
      wrapperCol
    }
  },
  computed: {
    decorators
  },
  methods: {
    onOk() {
      this.form.validateFields((err, values) => {
        if (err) return
        const sendData = {
          id: this.info.id,
          status: this.info.status,
          ...values
        }
        this.updateOrgan(sendData).then(() => {
          this.$message.success('更新子部门成功！')
          this.show = false
          this.$emit('done')
        })
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({
        ...pick(this.info, [
          'parent_id',
          'list_order',
          'name',
          'team_id',
          'area_id'
        ])
      })
    }, 200)
  },
  async: {
    updateOrgan
  }
}
</script>
