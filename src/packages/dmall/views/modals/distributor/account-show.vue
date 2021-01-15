<template>
  <oa-modal v-model="show" title="查看账户" :footer="null">
    <div class="account">
      <ul>
        <li v-for="(item, key) in distributionShow" :key="key">
          <span class="label">{{ item.label }}:</span>
          <span class="value">{{ item.value }}</span>
        </li>
      </ul>
      <a-button @click="onClickEdit" type="primary">编辑</a-button>
    </div>
  </oa-modal>
</template>

<script>
import { getBank } from '@/api/distributor'
import { get } from 'lodash-es'

export default {
  name: 'DistributorAccountShow',

  components: {},

  props: {
    // 账号id
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      show: true,
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      account: {}
    }
  },

  computed: {
    distributionShow() {
      return [
        {
          label: '姓名',
          value: get(this.account, 'distributor_name', '')
        },
        {
          label: '所属品牌',
          value: get(this.account, 'brand_name', '')
        },
        {
          label: '帐户名',
          value: get(this.account, 'bank_user_name', '')
        },
        {
          label: '银行',
          value: get(this.account, 'bank_name', '')
        },
        {
          label: '支行名称',
          value: get(this.account, 'bank_subbranch_name', '')
        },
        {
          label: '银行卡号',
          value: get(this.account, 'bank_card_number', '')
        }
      ]
    }
  },

  mounted() {
    this.getBank({
      distributor_id: this.id || 0
    })
  },

  async: {
    // 获取分销商账号详情
    getBank(data) {
      return getBank(data).then(res => {
        this.account = res
      })
    }
  },
  methods: {
    onClickEdit() {
      this.show = false
      this.$modalRouter.push({
        name: 'distributor-account-edit',
        props: {
          account: this.account
        },
        on: {
          success: () => {
            this.$message.success('编辑成功')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.account {
  margin-left: 80px;
}
ul > li {
  line-height: 22px;
  font-size: 14px;
  margin-bottom: 16px;
  display: flex;
  .label {
    min-width: 100px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  span {
    color: rgba(0, 0, 0, 0.65);
    word-break: break-all;
  }
}
</style>
