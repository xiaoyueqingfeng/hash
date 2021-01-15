<template>
  <oa-cascader
    multiple-model
    class="crm-area-picker"
    :options="regionTree"
    changeOnSelect
    placeholder="选择城市"
    :level1.sync="provinceIdModel"
    :level2.sync="cityIdModel"
    :level3.sync="areaIdModel"
  ></oa-cascader>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    provinceId: {
      type: null
    },
    cityId: {
      type: null
    },
    areaId: {
      type: null
    }
  },
  computed: {
    ...mapGetters('oa/base', ['regionTree']),
    provinceIdModel: {
      get() {
        return this.provinceId
      },
      set(id) {
        this.$emit('update:provinceId', id)
      }
    },
    cityIdModel: {
      get() {
        return this.cityId
      },
      set(id) {
        this.$emit('update:cityId', id)
      }
    },
    areaIdModel: {
      get() {
        return this.areaId
      },
      set(id) {
        this.$emit('update:areaId', id)
      }
    }
  }
}
</script>

<style lang="less">
.crm-region-picker {
}
</style>
