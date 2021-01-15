<template>
  <section class="sg-section">
    <h4>crm-region-picker 列表地区筛选</h4>
    <p>依赖于远端数据</p>
    <crm-channel-picker
      :level1.sync="searchQuery.channel_level1_id"
      :level2.sync="searchQuery.channel_level2_id"
    ></crm-channel-picker>
    searchQuery => {{ searchQuery }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: {
        channel_level1_id: undefined,
        channel_level2_id: undefined
      }
    }
  }
}
</script>
