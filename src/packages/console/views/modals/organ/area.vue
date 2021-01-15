<template>
  <oa-modal
    width="800px"
    v-model="show"
    title="关联区域"
    @ok="onOk"
    :confirmLoading="setOrganArea$loading"
  >
    <oa-alert-intro>
      <p class="mg-b0">
        1、部门的区域，会影响该部门所有成员可跟进&分配的客户范围
      </p>
      <!-- <p class="mg-b0">2、子部门只能选择父部门区域范围内的省／市／区</p> -->
    </oa-alert-intro>
    <a-form class="mg-t24">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="当前部门"
      >
        <span>{{ info.path }}</span>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="关联区域"
      >
        <oa-area-select
          @ready="onAreaSelectReady"
          :options="regionTree"
          :area-ids="area_ids"
        ></oa-area-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { labelCol, wrapperCol } from './area#config'
import { mapGetters } from 'vuex'
import { setOrganArea, getOrganAreaInfo } from '@/api/organ'

export default {
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      labelCol,
      wrapperCol,
      area_ids: [],
      show: true,
      treeSelect: null
    }
  },
  computed: {
    ...mapGetters('oa/base', ['regionTree'])
  },
  created() {
    this.getOrganAreaInfo()
  },
  methods: {
    onAreaSelectReady(treeSelect) {
      this.treeSelect = treeSelect
    },
    onOk() {
      this.setOrganArea().then(() => {
        this.$message.success('设定部门区域成功！')
        this.show = false
      })
    }
  },
  async: {
    getOrganAreaInfo() {
      return getOrganAreaInfo({
        organ_id: this.id
      }).then(res => {
        this.area_ids = res.area_ids.map(id => +id)
      })
    },
    setOrganArea() {
      const area_ids = this.treeSelect.calcCheckedIds()
      return setOrganArea({
        organ_id: this.id,
        area_ids: area_ids.join(',')
      })
    }
  }
}
</script>
