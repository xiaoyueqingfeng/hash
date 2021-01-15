<template>
  <oa-modal title="系统开通" v-model="show" @ok="setOpenSystem">
    <div class="item">
      <span class="label">客户ID:</span>
      <span class="val">{{ info.id }}</span>
    </div>
    <div class="item">
      <span class="label">客户名称:</span>
      <span class="val">{{ info.name }}</span>
      <span class="label">当前系统:</span>
      <span class="val">{{ info.system_type_tip }}</span>
    </div>
    <div class="item">
      <span class="label">模式:</span>
      <span class="val">{{ info.work_model_tip }}</span>
      <span class="label">当前版本:</span>
      <span class="val">{{ info.system_version }}</span>
    </div>
    <div class="item">
      <span class="label">原系统开通时间:</span>
      <span class="val">{{ info.system_open_time }}</span>
    </div>
    <div class="item">
      <a-date-picker
        style="width:200px"
        @change="onDateChange"
        placeholder="变更开通时间"
        format="YYYY-MM-DD"
      />
    </div>
  </oa-modal>
</template>
<script>
import { getSystemInfo, openSystem } from '@/api/pay'
export default {
  name: 'OpenSystem',
  data() {
    return {
      openTime: '',
      show: false,
      info: {}
    }
  },
  props: {
    id: {
      type: String
    }
  },
  created() {
    this.getSystemInfo()
  },
  async: {
    getSystemInfo() {
      if (this.id) {
        return getSystemInfo({ leads_id: this.id }).then(res => {
          this.info = res instanceof Object && res
        })
      }
    }
  },
  methods: {
    onDateChange(val, string) {
      this.openTime = string
    },
    setOpenSystem() {
      if (!this.openTime) {
        this.$message.error('请选择时间')
        return
      }
      return openSystem({
        leads_id: this.id,
        open_time: this.openTime
      }).then(res => {
        this.$message.success('操作成功')
        this.$emit('done')
        this.show = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  margin-bottom: 16px;
  line-height: 22px;
  .label {
    display: inline-block;
    min-width: 90px;
    // margin-right: 16px;
    color: rgba(0, 0, 0, 0.85);
  }
  .val {
    display: inline-block;
    min-width: 100px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
