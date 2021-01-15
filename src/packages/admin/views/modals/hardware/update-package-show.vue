<template>
  <oa-modal v-model="show" title="查看更新包" :footer="null">
    <ul>
      <li>
        <span class="label">更新包名称:</span>
        <span>{{ apk_name }}</span>
      </li>
      <li>
        <span class="label">更新包类型:</span>
        <span>{{ apk_type }}</span>
      </li>
      <li>
        <span class="label">应用版本号:</span>
        <span>{{ version_name }}</span>
      </li>
      <li>
        <span class="label">设备类型:</span>
        <span>{{ category_name }}</span>
      </li>
      <li>
        <span class="label">设备名称:</span>
        <span>{{ app_name }}</span>
      </li>
      <li>
        <span class="label">version_code:</span>
        <span>{{ app_ver }}</span>
      </li>
      <li>
        <span class="label">加密密钥:</span>
        <span>{{ cipher }}</span>
      </li>
      <li>
        <span class="label">签名密钥:</span>
        <span>{{ signer }}</span>
      </li>
      <li>
        <span class="label">更新包地址:</span>
        <span>{{ url }}</span>
      </li>
      <li>
        <span class="label">更新说明:</span>
        <span>{{ description }}</span>
      </li>
      <li>
        <span class="label">创建时间:</span>
        <span>{{ created_time }}</span>
      </li>
      <li>
        <span class="label">更新时间:</span>
        <span>{{ updated_time }}</span>
      </li>
      <li>
        <span class="label">操作人:</span>
        <span>{{ operator_name }}</span>
      </li>
    </ul>
  </oa-modal>
</template>

<script>
import { getIotDetail } from '@/api/iot'
import { get } from 'lodash-es'

export default {
  name: 'update-package-show',

  components: {},

  props: {
    id: {
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
      mapping: {}
    }
  },

  computed: {
    apk_type() {
      return get(this.detail, 'apk_type_tips', '')
    },
    apk_name() {
      return get(this.detail, 'apk_name', '')
    },
    app_ver() {
      return get(this.detail, 'app_ver', '')
    },
    category_name() {
      return get(this.detail, 'category_name', '')
    },
    app_name() {
      return get(this.detail, 'app_name', '')
    },
    version_name() {
      return get(this.detail, 'version_name', '')
    },
    url() {
      return get(this.detail, 'url', '')
    },
    description() {
      return get(this.detail, 'description', '')
    },
    created_time() {
      return get(this.detail, 'created_time', '')
    },
    updated_time() {
      return get(this.detail, 'updated_time', '')
    },
    operator_name() {
      return get(this.detail, 'operator_name', '')
    },
    cipher() {
      return get(this.detail, 'cipher', '')
    },
    signer() {
      return get(this.detail, 'signer', '')
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
  }
}
</script>

<style lang="less" scoped>
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
