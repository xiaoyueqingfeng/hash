<template>
  <oa-modal
    title="修改客户名称"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="changeUserName$loading"
  >
    <a-form :form="form">
      <a-form-item label="客户ID" v-bind="formCol">
        <span>{{ userInfo.id }}</span>
      </a-form-item>
      <a-form-item label="当前客户名称" v-bind="formCol">
        <span>{{ userInfo.name }}</span>
      </a-form-item>
      <a-form-item label="新的客户名称" v-bind="formCol">
        <a-input
          placeholder="请输入客户名称"
          v-decorator="decorators.name"
        ></a-input>
        <div class="tips">注：客户签约后不可修改客户名称，需仔细确认。</div>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { getUserName, changeUserName } from '@/api/potential'
export default {
  name: '',

  components: {},

  props: {
    leads_id: {
      required: true
    }
  },

  data() {
    const ruleOptions = vm => {
      return {
        name: {
          rules: [
            {
              required: true,
              message: '请输入客户名称'
            },
            {
              min: 1,
              max: 20,
              message: '请输入小于等于20字的名称'
            }
          ]
        }
      }
    }
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)
    return {
      form,
      decorators,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      show: true,
      userInfo: {
        id: '',
        name: ''
      }
    }
  },

  computed: {},

  async: {
    getUserName(data) {
      return getUserName(data)
    },
    changeUserName(data) {
      return changeUserName(data)
    }
  },

  mounted() {
    this.getUserName({
      leads_id: this.leads_id
    }).then(res => {
      this.userInfo = res
    })
  },

  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        const data = {
          leads_id: this.leads_id,
          name: values.name
        }
        this.changeUserName(data).then(res => {
          this.$message.success('修改成功')
          this.$emit('done')
          this.show = false
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  color: rgba(251, 163, 90, 1);
}
</style>
