<template>
  <oa-modal title="编辑分销商" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item label="分销商名称" v-bind="formCol">
            {{ distributor.distributor_name }}
          </a-form-item>
          <a-form-item label="到期时间" v-bind="formCol">
            <a-date-picker
              placeholder="请选择到期时间"
              v-decorator="decorators.valid_to"
            />
          </a-form-item>
          <a-form-item label="等级" v-bind="formCol">
            <oa-select
              placeholder="请选择等级"
              :options="distributorLevel"
              v-decorator="decorators.level"
            ></oa-select>
          </a-form-item>
          <a-form-item label="备注" v-bind="formCol">
            <a-textarea
              placeholder="请输入备注信息"
              v-decorator="decorators.remark"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { rules } from './edit#config'
import { update } from '@/api/distributor'
import { mapGetters } from 'vuex'
export default {
  name: 'DistributorEdit',
  props: {
    distributor: {
      type: Object,
      default: () => {
        return {
          level: '',
          valid_to: moment(),
          remark: ''
        }
      }
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false
    }
  },
  created() {},
  computed: {
    formCol() {
      return {
        'label-col': { span: 5 },
        'wrapper-col': { span: 16 }
      }
    },
    ...mapGetters('dmall', ['distributorLevel'])
  },
  async: {
    update(data) {
      return update(data).then(res => {
        this.show = false
        this.$emit('success')
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        values.distributor_id = this.distributor.id
        values.valid_to = moment(values.valid_to).format('YYYY-MM-DD')
        this.update(values)
      })
    }
  }
}
</script>
