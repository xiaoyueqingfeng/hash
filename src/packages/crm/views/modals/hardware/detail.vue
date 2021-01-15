<template>
  <oa-modal v-model="show" title="查看硬件设备" :footer="null">
    <ul>
      <li>
        <span class="label">leadsID:</span>
        <span>{{ leads_id }}</span>
      </li>
      <li>
        <span class="label">场馆ID:</span>
        <span>{{ shop_id }}</span>
      </li>
      <li>
        <span class="label">品牌ID:</span>
        <span>{{ brand_id }}</span>
      </li>
      <li>
        <span class="label">场馆名称:</span>
        <span>{{ shop_name }}</span>
      </li>
      <li>
        <span class="label">设备ID:</span>
        <span>{{ device_id }}</span>
      </li>
      <li>
        <span class="label">设备名称:</span>
        <span>{{ device_name }}</span>
      </li>
      <li>
        <span class="label">自定义名称:</span>
        <span>{{ custom_name }}</span>
      </li>
      <li v-if="ins_and_out_status">
        <span class="label">进出门设置:</span>
        <span>{{ ins_and_out }}</span>
      </li>
      <li v-if="odd_even_status">
        <span class="label">鉴权方式:</span>
        <span>{{ odd_even }}</span>
      </li>
      <li v-if="shop_area_status">
        <span class="label">场地区域:</span>
        <span>{{ shop_area }}</span>
      </li>
      <li v-if="cabinet_status">
        <span class="label">储物柜区域:</span>
        <span>{{ cabinet_area_name }}</span>
      </li>
    </ul>
  </oa-modal>
</template>

<script>
import { hardwareDetail } from '@/api/hardware'
import { get } from 'lodash-es'

export default {
  name: 'hardware-detail',

  components: {},

  props: {
    // 硬件id
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
      device: {}
    }
  },

  computed: {
    leads_id() {
      return get(this.device, 'leads_id', '')
    },
    shop_id() {
      return get(this.device, 'shop_id', '')
    },
    brand_id() {
      return get(this.device, 'brand_id', '')
    },
    shop_name() {
      return get(this.device, 'shop_name', '')
    },
    shop_area() {
      return get(this.device, 'shop_area', '')
    },
    device_id() {
      return get(this.device, 'device_id', '')
    },
    device_name() {
      return get(this.device, 'device_name', '')
    },
    custom_name() {
      return get(this.device, 'custom_name', '')
    },
    odd_even_status() {
      return get(this.device, 'odd_even_status', 0)
    },
    ins_and_out_status() {
      return get(this.device, 'ins_and_out_status', 0)
    },
    shop_area_status() {
      return get(this.device, 'shop_area_status', 0)
    },
    cabinet_status() {
      return get(this.device, 'cabinet_status', 0)
    },
    cabinet_area_name() {
      return get(this.device, 'cabinet_area_name', '')
    },
    odd_even() {
      return get(this.device, 'odd_even_tip', '')
    },
    ins_and_out() {
      return get(this.device, 'ins_and_out_tip', '')
    }
  },

  mounted() {
    this.hardwareDetail({
      device_id: this.id
    }).then(res => {
      this.device = res.info
    })
  },

  async: {
    // 获取硬件详情
    hardwareDetail(data) {
      return hardwareDetail(data)
    }
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
