<template>
  <oa-modal title="信息确认" v-model="show" @ok="onSubmit" width="600px">
    <a-form class="delay-confirm" :form="form">
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
      <div>
        <a-form-item v-for="shop in shops" :key="shop.id">
          <a-row>
            <a-col :span="12">
              <span class="mg-r8">{{ shop.shop_name }}原到期时间</span>
              <span class="warn-color">{{ shop.expire_time }}</span>
            </a-col>
            <a-col :span="12" v-if="shop.id">
              <span class="mg-r8">延期后到期时间</span>
              <span class="warn-color">{{ shop.end_time }}</span>
            </a-col>
          </a-row>
        </a-form-item>
      </div>
      <a-form-item>
        <a-row>
          <a-col :span="24">
            <span class="mg-r8">备注说明</span>
            <span class="warn-color">{{ remark }}</span>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { delaySystem } from '@/api/software'
import { get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {
    currentCustomer: {
      type: Object,
      default: () => {}
    },
    shops: {
      type: Array,
      default: () => []
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
      }
    }
  },

  computed: {
    leads_id() {
      return get(this.currentCustomer, 'id', '')
    },
    system_type_tip() {
      return get(this.currentCustomer, 'system_type_tip', '')
    },
    system_version_id_tip() {
      return get(this.currentCustomer, 'system_version_id_tip', '')
    },
    work_model_tip() {
      return get(this.currentCustomer, 'work_model_tip', '')
    },
    leads_name() {
      return get(this.currentCustomer, 'name', '')
    }
  },

  async: {
    delaySystem(data) {
      console.log(data)
      return delaySystem(data).then(res => {
        this.$message.success('系统延期成功')
        this.$emit('done')
        this.show = false
      })
    }
  },

  mounted() {},

  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        let shop = []
        this.shops.map(s => {
          shop[s.id] = {
            qty: s.expire_day
          }
        })
        this.delaySystem({
          leads_id: this.leads_id,
          remark: this.remark,
          shop: shop
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
