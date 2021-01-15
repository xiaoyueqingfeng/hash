<template>
  <oa-cascader
    multiple-model
    class="crm-region-picker"
    :options="cityTree"
    changeOnSelect
    placeholder="选择城市"
    :level1.sync="provinceIdModel"
    :level2.sync="cityIdModel"
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
    }
  },
  computed: {
    ...mapGetters('oa/base', ['cityTree']),
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
    }
  }
}
</script>

<style lang="less">
.crm-region-picker {
}
</style>
