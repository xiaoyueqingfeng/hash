<template>
  <section class="sg-section">
    <h3>oa-area-select 区域选择器</h3>
    <oa-area-select
      :options="regionTree"
      @ready="onReady"
      :area-ids="areaIds"
    ></oa-area-select>
    <button @click="onClick">submit</button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('oa/base', ['regionTree'])
  },
  data() {
    return {
      /**
       * treeSelect实例
       */
      areaTreeSelect: null,
      areaIds: [110000]
    }
  },
  methods: {
    onReady(areaTreeSelect) {
      this.areaTreeSelect = areaTreeSelect
    },
    onClick() {
      const area_ids = this.areaTreeSelect.calcCheckedIds()
    }
  }
}
</script>
