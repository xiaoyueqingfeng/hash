<template>
  <div>
    <h3 class="mg-t24">CRM 组件</h3>
    <div class="sg">
      <div class="sg__sider">
        <a-anchor :offsetTop="160">
          <a-anchor-link
            v-for="demo in demos"
            :key="demo.id"
            :href="'#' + demo.id"
            :title="demo.id + ' ' + demo.title"
          ></a-anchor-link>
        </a-anchor>
      </div>
      <div class="sg__main">
        <component
          v-for="demo in demos"
          :key="demo.id"
          :id="demo.id"
          :is="'demo-' + demo.id"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import demoComponents from './crm#/index.js'
export default {
  components: demoComponents,
  computed: {
    demos() {
      return [
        { id: 'region-picker', title: '列表地区筛选' },
        { id: 'channel-picker', title: '列表渠道筛选' }
      ]
    }
  }
}
</script>
