<template>
  <section class="sg-section">
    <h4>crm-region-picker 列表地区筛选</h4>
    <p>默认使用城市数据</p>
    <crm-region-picker
      :province-id.sync="searchQuery.province_id"
      :city-id.sync="searchQuery.city_id"
    ></crm-region-picker>

    searchQuery => {{ searchQuery }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: {
        province_id: undefined,
        city_id: undefined
      }
    }
  }
}
</script>
