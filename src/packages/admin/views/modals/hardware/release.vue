<template>
  <oa-modal
    v-model="show"
    title="发布提示"
    :confirmLoading="confirmLoading"
    @ok="onSubmit"
  >
    <div class="info">
      <div class="info-title">更新信息：</div>
      <ul class="info-content">
        <li>
          <span class="label">产品名称:</span>
          <span>{{ app_name }}</span>
        </li>
        <li>
          <span class="label">设备类型:</span>
          <span>{{ category_name }}</span>
        </li>
        <li>
          <span class="label">更新包类型:</span>
          <span>{{ apk_type }}</span>
        </li>
        <li>
          <span class="label">更新包名称:</span>
          <span>{{ apk_name }}</span>
        </li>
        <li>
          <span class="label">version_code:</span>
          <span>{{ app_ver }}</span>
        </li>
      </ul>
    </div>
    <div class="warn">
      <div class="release-title">更新影响：</div>
      <div class="release--warn">
        即将进行下发全国更新操作，执行后所有在离线设备重启后主动更新
      </div>
    </div>
  </oa-modal>
</template>

<script>
import { getIotDetail, pushApk } from '@/api/iot'
import { get } from 'lodash-es'

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    pushed: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      show: true,
      detail: {},
      confirmLoading: false
    }
  },

  computed: {
    //更新包类型
    apk_type() {
      return get(this.detail, 'apk_type_tips', '')
    },
    //更新包名称
    apk_name() {
      return get(this.detail, 'apk_name', '')
    },
    //版本号
    app_ver() {
      return get(this.detail, 'app_ver', '')
    },
    //设备类型
    category_name() {
      return get(this.detail, 'category_name', '')
    },
    //产品名称
    app_name() {
      return get(this.detail, 'app_name', '')
    },
    //version_code
    version_name() {
      return get(this.detail, 'version_name', '')
    }
  },

  async: {
    /**
     * @description 获取当前更新包的详细信息
     */
    getIotDetail(data) {
      return getIotDetail(data).then(res => {
        this.detail = res.app_version_detail
        this.mapping = res.mapping
      })
    }
  },

  mounted() {
    this.getIotDetail({
      id: this.id
    })
  },
  methods: {
    onSubmit() {
      this.confirmLoading = true
      let pushApkData = {
        id: this.id,
        pushed: this.pushed
      }
      pushApk(pushApkData).then(() => {
        this.confirmLoading = false
        this.show = false
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  display: flex;
  margin-bottom: 16px;
  &-title {
    min-width: 100px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  &-content {
    border-left: 1px solid @border-color;
    border-bottom: 1px solid @border-color;
  }
  li {
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    display: flex;
    border-top: 1px solid @border-color;
    border-right: 1px solid @border-color;
    .label {
      min-width: 130px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      border-right: 1px solid @border-color;
    }
    span {
      color: rgba(0, 0, 0, 0.65);
      word-break: break-all;
      padding: 0 16px;
    }
  }
}
.warn {
  display: flex;
  .release-title {
    min-width: 100px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .release--warn {
    color: (@error-color);
    word-break: break-all;
  }
}
</style>
