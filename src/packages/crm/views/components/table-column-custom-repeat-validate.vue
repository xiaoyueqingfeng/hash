<template>
  <span>
    <a-popover
      title=""
      trigger="hover"
      placement="bottomLeft"
      @visibleChange="handleHoverChange"
    >
      <div slot="content">
        <div v-if="mobile_repeat_leads">
          手机号重复,重复leads: {{ mobile_repeat_leads }}
        </div>
        <div v-if="brand_repeat_leads">
          品牌重复,重复leads: {{ brand_repeat_leads }}
        </div>
        <div v-if="address_repeat_leads">
          地址重复,重复leads: {{ address_repeat_leads }}
        </div>
      </div>
      <div class="mg-r8">
        {{ record.repeat_desc }}
      </div>
    </a-popover>
  </span>
</template>

<script>
import { get } from 'lodash-es'
import { getRepeatInfo } from '@/api/invite'
export default {
  name: 'table-column-custom-repeat-validate',

  components: {},

  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      mobile_repeat_leads: '',
      brand_repeat_leads: '',
      address_repeat_leads: ''
    }
  },

  computed: {},

  async: {
    getRepeatInfo(data) {
      return getRepeatInfo(data)
    }
  },

  mounted() {},

  methods: {
    handleHoverChange() {
      this.getRepeatInfo({
        id: this.record.id
      }).then(res => {
        this.mobile_repeat_leads = get(res, 'mobile_repeat_leads', []).join(',')
        this.brand_repeat_leads = get(res, 'brand_repeat_leads', []).join(',')
        this.address_repeat_leads = get(res, 'address_repeat_leads', []).join(
          ','
        )
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
