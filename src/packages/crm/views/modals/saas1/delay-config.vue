<template>
  <oa-modal title="延期确认" v-model="show" @ok="onSubmit">
    <a-form class="delay-config" :form="form">
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">客户ID</span>
            <span>{{ leads_id }}</span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">当前系统</span>
            <span>{{ system_type_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">客户名称</span>
            <span>{{ leads_name }}</span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">当前版本</span>
            <span>{{ system_version_id_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">原系统到期时间</span>
            <span>{{ system_expired_time }}</span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">运营模式</span>
            <span>{{ work_model_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="延期时间" required class="mg-b8">
        <a-input
          id="success"
          type="number"
          min="1"
          v-decorator="decorators.system_day"
          style="width: 160px"
          placeholder="请输入时长"
        >
          <a-select slot="addonAfter" v-model="dateUnit" style="width: 58px">
            <a-select-option value="year">年</a-select-option>
            <a-select-option value="day">日</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item label="备注说明" required>
        <oa-textarea
          placeholder="请输入备注说明,不超过50个字"
          maxlength="50"
          v-decorator="decorators.remark"
          placehloder="请输入版本说明"
          rows="3"
        ></oa-textarea>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { delaySystemFormData } from '@/api/software'
import { get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    leads_id: {
      type: [Number, String]
    }
  },

  data(vm) {
    const form = this.$stForm.create()
    const decorators = form.decorators({
      system_day: {
        rules: [{ required: true, message: '请输入开通时长' }],
        initialValue: 1
      },
      remark: {
        rules: [{ required: true, message: '请输入备注说明' }]
      }
    })
    console.log(decorators)
    return {
      show: true,
      form,
      decorators,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      dateUnit: 'year',
      currentCustomer: {}
    }
  },

  computed: {
    system_expired_time() {
      return get(this.currentCustomer, 'system_expired_time', '')
    },
    system_type_tip() {
      return get(this.currentCustomer, 'system_type_tip', '')
    },
    system_version_id_tip() {
      return get(this.currentCustomer, 'system_version_id_tip', '')
    },
    leads_name() {
      return get(this.currentCustomer, 'name', '')
    },
    work_model_tip() {
      return get(this.currentCustomer, 'work_model_tip', '')
    }
  },

  async: {
    delaySystemFormData(data) {
      return delaySystemFormData(data).then(res => {
        this.currentCustomer = res
      })
    }
  },

  mounted() {
    this.delaySystemFormData({
      leads_id: this.leads_id
    })
  },

  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        let obj = {
          year: 365,
          day: 1
        }
        this.$modalRouter.push({
          name: 'saas1-delay-confirm',
          props: {
            currentCustomer: this.currentCustomer,
            remark: values.remark,
            system_day: values.system_day * obj[this.dateUnit],
            expired_time: [
              {
                start_time: this.system_expired_time,
                qty: values.system_day * obj[this.dateUnit]
              }
            ]
          },
          on: {
            done: this.isOk
          }
        })
      })
    },
    isOk() {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.delay-config {
  .ant-form-item {
    margin-bottom: 0;
  }
}
</style>
