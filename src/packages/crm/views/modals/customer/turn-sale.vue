<template>
  <oa-modal
    title="转面销"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="translateNormalSale$loading"
  >
    <a-row>
      <div class="tips">
        是否将客户
        <span>{{ customerName }}</span>
        {{ from === 'leads' ? '抛入公海' : '转面销' }}
      </div>
      <div class="discard_tags">
        <div class="discard_cause">
          <span class="lev">
            <i>*</i>
            <span class="lev_name">请选择原因</span>
          </span>
        </div>
        <a-spin :spinning="getTranslateNormalSaleReason$loading">
          <div class="tags">
            <a-tag
              v-for="item in reasons"
              :key="item.id"
              :color="item.id == reason_id ? 'blue' : ''"
              @click="setReason(item.id)"
            >
              {{ item.name }}
            </a-tag>
          </div>
        </a-spin>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import {
  getTranslateNormalSaleReason as getLeadsTranslateNormalSaleReason,
  translateNormalSale as translateLeadsNormalSale
} from '@/api/leads'

import {
  getTranslateNormalSaleReason as getPotentialTranslateNormalSaleReason,
  translateNormalSale as translatePotentialNormalSale
} from '@/api/potential'

import { get } from 'lodash-es'
export default {
  props: {
    customerIds: {
      type: Array,
      required: true,
      dafault: () => []
    },
    customerName: {
      type: String,
      required: true
    },
    from: {
      type: String,
      // 因为数据域不同 分配电销来源 可选 leads|potential
      required: true
    }
  },
  data() {
    return {
      show: true,
      reason_id: null,
      reasons: []
    }
  },
  created() {
    this.getTranslateNormalSaleReason()
  },
  async: {
    getTranslateNormalSaleReason() {
      let requestObj = {
        leads: getLeadsTranslateNormalSaleReason,
        potential: getPotentialTranslateNormalSaleReason
      }
      requestObj[this.from]().then(res => {
        this.reasons = get(res, 'reason', [])
      })
    },
    translateNormalSale(data) {
      switch (this.from) {
        case 'leads':
          return translateLeadsNormalSale(data)
        case 'potential':
          return translatePotentialNormalSale(data)
      }
    }
  },
  methods: {
    setReason(id) {
      this.reason_id = id
    },
    onSubmit() {
      const sendData = {
        reason_id: this.reason_id,
        leads_id: this.customerIds
      }
      this.translateNormalSale(sendData).then(() => {
        this.$message.success('转面销成功！')
        this.$emit('done')
        this.show = false
      })
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
.discard_tags {
  margin-top: 8px;
  margin-bottom: 16px;
  text-align: left;
  .tags {
    margin-left: 24px;
    display: inline-block;
    width: 300px;
    .ant-tag {
      margin-top: 16px;
    }
  }
  .discard_cause {
    float: left;
    margin-top: 24px;
    display: inline-block;
    width: 110px;
    i {
      display: inline-block;
      margin-right: 4px;
      color: red;
    }
  }
}
</style>
