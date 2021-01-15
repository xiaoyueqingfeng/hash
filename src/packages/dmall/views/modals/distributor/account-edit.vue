<template>
  <oa-modal title="编辑分销商账号" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item label="分销商名称" v-bind="formCol">
            {{ account.distributor_name }}
          </a-form-item>
          <a-form-item label="帐户名" v-bind="formCol">
            <a-input
              placeholder="请输入账户名"
              v-decorator="decorators.bank_user_name"
            ></a-input>
          </a-form-item>
          <a-form-item label="银行" v-bind="formCol">
            <oa-select
              placeholder="请选择银行"
              v-decorator="decorators.bank_id"
              :options="bankOptions"
            ></oa-select>
          </a-form-item>
          <a-form-item label="支行名称" v-bind="formCol">
            <a-input
              placeholder="请选择支行名称"
              v-decorator="decorators.bank_subbranch_name"
            ></a-input>
          </a-form-item>
          <a-form-item label="银行卡号" v-bind="formCol">
            <a-input
              placeholder="请输入银行卡号"
              v-decorator="decorators.bank_card_number"
            ></a-input>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { updateBank } from '@/api/distributor'
import { rules } from './account-edit#config'
import { mapGetters } from 'vuex'
export default {
  name: 'DistributorAccountEdit',
  props: {
    account: {
      type: Object,
      default: () => {
        return {
          bank_id: '',
          bank_user_name: '',
          bank_card_number: ''
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
      show: false,
      saleList: []
    }
  },
  created() {
    this.$store.dispatch('dmall/getBankOptions')
  },
  computed: {
    formCol() {
      return {
        'label-col': { span: 5 },
        'wrapper-col': { span: 16 }
      }
    },
    ...mapGetters('dmall', ['bankOptions'])
  },
  async: {
    updateBank(data) {
      return updateBank(data).then(res => {
        this.$emit('success')
      })
    }
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        const form = {
          distributor_id: this.account.id,
          ...values
        }
        this.show = false
        this.updateBank(form)
      })
    }
  }
}
</script>
