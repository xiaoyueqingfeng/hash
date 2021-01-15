<template>
  <oa-modal
    title="放弃客户"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="giveUp$loading"
  >
    <a-row>
      <!-- <div>
        是否将客户
        <span class="customer-name">{{customerName}}</span> 抛入公海
      </div>
      <a-form>
        <a-form-item label='请选择放弃原因'></a-form-item>
      </a-form> -->
      <div class="discard_customre_con">
        <div class="discard_tips">
          是否将客户
          <span class="discard_customer_name">{{ customerName }}</span>
          抛入公海?
        </div>
        <div class="discard_tags">
          <div class="discard_cause">
            <span class="lev">
              <i>*</i>
              <span class="lev_name">请选择放弃原因</span>
            </span>
          </div>
          <a-spin :spinning="getGiveUpReason$loading">
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
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { getGiveUpReason, giveUp as leadsGiveUp } from '@/api/leads'
import { giveUp as potentialGiveUp } from '@/api/potential'

export default {
  props: {
    customerId: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      required: true
    },
    from: {
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
    this.getGiveUpReason()
  },
  methods: {
    setReason(id) {
      this.reason_id = id
    },
    onSubmit() {
      this.giveUp().then(() => {
        this.$message.success('操作成功', 2)
        this.show = false
        this.$emit('done')
      })
    }
  },
  async: {
    getGiveUpReason() {
      return getGiveUpReason().then(res => [(this.reasons = res.reason)])
    },
    giveUp() {
      const sendData = {
        leads_id: [this.customerId],
        reason_id: this.reason_id
      }
      switch (this.from) {
        case 'leads':
          return leadsGiveUp(sendData)
        case 'potential':
          return potentialGiveUp(sendData)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.customer-name {
  font-weight: 600;
  margin: 0 3px;
}
.discard_customre_con {
  .discard_tips {
    text-align: left;
    height: 22px;
    .discard_customer_name {
      display: inline-block;
      margin: 0 3px;
      font-weight: 600;
    }
  }
  .discard_tags {
    margin-top: 8px;
    margin-bottom: 16px;
    text-align: left;
    .tags {
      margin-left: 22px;
      display: inline-block;
      width: 300px;
      .ant-tag {
        margin-top: 16px;
      }
    }
    .discard_cause {
      float: left;
      margin-top: 20px;
      display: inline-block;
      width: 110px;
      i {
        display: inline-block;
        margin-right: 4px;
        color: red;
      }
    }
  }
  text-align: center;
  .customerName {
    display: inline-block;
    margin: 0 3px;
    font-weight: 600;
  }
}
</style>
