<template>
  <oa-modal
    title="转主管"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="translateManager$loading"
  >
    <a-row>
      <div class="tips">
        将客户
        <span>{{ customerName }}</span>
        放弃并流转给主管？
      </div>
      <div class="discard_tags">
        <div class="discard_cause">
          <span class="lev">
            <i>*</i>
            <span class="lev_name">请选择放弃原因</span>
          </span>
        </div>
        <a-spin :spinning="getTranslateManagerReason$loading">
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
import { getTranslateManagerReason, translateManager } from '@/api/potential'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      show: true,
      reason_id: null,
      reasons: []
    }
  },
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
  created() {
    this.getTranslateManagerReason()
  },
  async: {
    getTranslateManagerReason() {
      return getTranslateManagerReason().then(res => {
        this.reasons = get(res, 'reason', [])
      })
    },
    translateManager(data) {
      return translateManager(data)
    }
  },
  methods: {
    setReason(id) {
      this.reason_id = id
    },
    onSubmit() {
      this.translateManager({
        leads_id: this.customerIds,
        reason_id: this.reason_id
      }).then(() => {
        this.$message.success('转主管成功')
        this.show = false
        this.$emit('done')
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
