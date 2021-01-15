<template>
  <oa-modal
    title="转公海"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="translatePublicSea$loading"
  >
    <a-row>
      <div class="tips">
        是否将客户
        <span>{{ customerName }}</span>
        转公海
      </div>
      <div class="discard_tags">
        <div class="discard_cause">
          <span class="lev">
            <i>*</i>
            <span class="lev_name">请选择原因</span>
          </span>
        </div>
        <a-spin :spinning="getTranslatePublicSeaReason$loading">
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
  getTranslatePublicSeaReason,
  translatePublicSea
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
    this.getTranslatePublicSeaReason()
  },
  async: {
    getTranslatePublicSeaReason() {
      return getTranslatePublicSeaReason().then(res => {
        this.reasons = get(res, 'reason', [])
        if (this.reasons.length) {
          this.setReason(this.reasons[0].id)
        }
      })
    },
    translatePublicSea(data) {
      return translatePublicSea(data)
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
      this.translatePublicSea(sendData).then(() => {
        this.$message.success('转公海成功！')
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
      margin-top: 24px;
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
