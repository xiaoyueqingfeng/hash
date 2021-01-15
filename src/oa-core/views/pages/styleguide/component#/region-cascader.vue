<template>
  <section class="sg-section">
    <h3>oa-region-cascader</h3>
    <p>城市级联选择器 默认为全量城市数据 并且默认只选叶子节点 {{ model }}</p>
    <oa-region-cascader
      @change="onRegionChange"
      v-model="model"
    ></oa-region-cascader>

    <p>使用自定义选项数据 {{ model2 }}</p>
    <oa-region-cascader
      v-model="model2"
      :options="cityTree"
    ></oa-region-cascader>
  </section>
</template>

<script>
import { last } from 'lodash-es'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      model: [],
      model2: []
    }
  },
  computed: {
    ...mapGetters('oa/base', ['cityTree'])
  },
  methods: {
    onRegionChange(newVal) {
      console.log(newVal)
      console.log('area_id is', last(newVal))
    }
  }
}
</script>
