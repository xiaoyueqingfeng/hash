<template>
  <oa-modal v-model="show" title="查看分销商客户" :footer="null">
    <ul>
      <li v-for="(item, key) in distributionShow" :key="key">
        <span class="label">{{ item.label }}:</span>
        <span class="value">{{ item.value }}</span>
      </li>
    </ul>
  </oa-modal>
</template>

<script>
import { getInfo } from '@/api/distributor'
import { get } from 'lodash-es'

export default {
  name: 'DistributorShow',

  components: {},

  props: {
    // 账号id
    id: {
      type: [Number, String],
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
      distributor: {}
    }
  },

  computed: {
    distributionShow() {
      return [
        {
          label: '分销商',
          value: get(this.distributor, 'distributor_name', '')
        },
        {
          label: '等级',
          value: get(this.distributor, 'level_name', '')
        },
        {
          label: '所属品牌',
          value: get(this.distributor, 'brand_name', '')
        },
        {
          label: '所属品牌leads',
          value: get(this.distributor, 'leads_id', '')
        },
        {
          label: '绑定手机',
          value: get(this.distributor, 'mobile', '')
        },
        {
          label: '来源',
          value: get(this.distributor, 'join_source', '')
        },
        {
          label: '到期时间',
          value: get(this.distributor, 'valid_to', '')
        },
        {
          label: '首次成为分销商时间',
          value: get(this.distributor, 'first_become_time', '')
        },
        {
          label: '备注',
          value: get(this.distributor, 'remark', '')
        }
      ]
    }
  },

  mounted() {
    this.getInfo({
      distributor_id: this.id
    }).then(res => {
      this.distributor = res
    })
  },

  async: {
    // 获取硬件详情
    getInfo(data) {
      return getInfo(data)
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
