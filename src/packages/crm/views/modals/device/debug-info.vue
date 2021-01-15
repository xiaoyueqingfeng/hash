<template>
  <oa-modal
    v-model="show"
    title="下发更新提示"
    @ok="issue"
    :confirmLoading="createTask$loading"
  >
    <div class="debug-info">
      <span class="label">更新信息：</span>
      <ul class="debug-info-content">
        <li>
          <span class="label">产品名称</span>
          <span>{{ app_name }}</span>
        </li>
        <li>
          <span class="label">设备类型</span>
          <span>{{ device_type }}</span>
        </li>
        <li>
          <span class="label">更新包类型</span>
          <span>{{ category_name }}</span>
        </li>
        <li>
          <span class="label">更新包</span>
          <span>{{ apk_name }}</span>
        </li>
      </ul>
    </div>
    <div class="debug-warn">
      <span class="label">更新影响：</span>
      <div class="warn-text">
        即将进行下发强制更新操作，执行后所有在线设备将进行更新
      </div>
    </div>
  </oa-modal>
</template>

<script>
import { createTask } from '@/api/hardware'
export default {
  data() {
    return {
      show: true
    }
  },
  props: {
    //设备id
    device_ids: {
      type: Array,
      required: true
    },
    //设备类型
    device_type: {
      type: String,
      required: true
    },
    //产品名称
    app_name: {
      type: String,
      required: true
    },
    //更新包类型
    category_name: {
      type: String,
      required: true
    },
    //更新包
    apk_name: {
      type: String,
      required: true
    },
    //更新包id
    app_version_id: {
      type: Number,
      required: true
    }
  },
  async: {
    createTask(data) {
      return createTask(data).then(() => {
        this.show = false
        this.$message.success('更新成功')
        this.$emit('done')
      })
    }
  },
  methods: {
    issue() {
      let issueData = {
        app_version_id: this.app_version_id,
        device_ids: this.device_ids
      }
      this.createTask(issueData)
    }
  }
}
</script>
<style lang="less" scoped>
.label {
  min-width: 110px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.debug-info {
  display: flex;
  margin-bottom: 16px;
  .label {
    border-right: 1px solid @border-color;
  }
  &-content {
    border-left: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
    li {
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      display: flex;
      border-top: 1px solid @border-color;
      border-right: 1px solid @border-color;
      span {
        padding: 0 16px;
        color: rgba(0, 0, 0, 0.65);
        word-break: break-all;
      }
    }
  }
}
.debug-warn {
  display: flex;
  .warn-text {
    color: (@error-color);
  }
}
</style>
