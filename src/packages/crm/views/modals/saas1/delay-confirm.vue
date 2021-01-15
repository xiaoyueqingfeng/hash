<template>
  <oa-modal title="信息确认" v-model="show" @ok="onSubmit">
    <a-form class="delay-confirm" :form="form">
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">客户ID</span>
            <span>{{ currentCustomer.id }}</span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">当前系统</span>
            <span>{{ currentCustomer.system_type_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">客户名称</span>
            <span>{{ currentCustomer.name }}</span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">当前版本</span>
            <span>{{ currentCustomer.system_version_id_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">原系统到期时间</span>
            <span class="warn-color">
              {{ currentCustomer.system_expired_time }}
            </span>
          </a-col>
          <a-col :span="12">
            <span class="mg-r8">运营模式</span>
            <span>{{ currentCustomer.work_model_tip }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">延期后到期时间</span>
            <span class="warn-color">{{ end_time }}</span>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-row>
          <a-col :span="12">
            <span class="mg-r8">备注说明</span>
            <span class="warn-color">{{ remark }}</span>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { calcExpiredTime, delaySystem } from '@/api/software'
import { get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    currentCustomer: {
      type: Object,
      default: () => {}
    },
    expired_time: {
      type: Array,
      default: () => []
    },
    system_day: {
      type: [Number, String]
    },
    remark: {
      type: String,
      default: ''
    }
  },

  data() {
    const form = this.$stForm.create()
    return {
      show: true,
      form,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      end_time: ''
    }
  },

  computed: {},

  async: {
    calcExpiredTime(data) {
      return calcExpiredTime(data).then(res => {
        let expired_time = get(res[0], 'end_time', '')
        this.end_time = expired_time
      })
    },
    delaySystem(data) {
      return delaySystem(data).then(res => {
        this.$message.success('系统延期成功')
        this.$emit('done')
        this.show = false
      })
    }
  },

  mounted() {
    this.calcExpiredTime({ expired_time: JSON.stringify(this.expired_time) })
  },

  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.delaySystem({
          leads_id: this.currentCustomer.id,
          remark: this.remark,
          system_day: this.system_day
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.delay-confirm {
  .ant-form-item {
    margin-bottom: 0;
  }
}
.warn-color {
  color: #ff6c7e;
}
</style>
