<template>
  <a-tabs>
    <a-tab-pane tab="省" key="1">
      <li v-for="province in provinces" :key="province.id">
        <a-checkbox
          :checked="province.checked"
          :indeterminate="province.indeterminate"
          @change="onNodeChange(province, $event)"
        >
          {{ province.name }}
        </a-checkbox>
      </li>
    </a-tab-pane>
    <a-tab-pane tab="市" key="2" :disabled="!citys.length">
      <li v-for="city in citys" :key="city.id">
        <a-checkbox
          :checked="city.checked"
          :indeterminate="city.indeterminate"
          @change="onNodeChange(city, $event)"
        >
          {{ city.name }}
        </a-checkbox>
      </li>
    </a-tab-pane>
    <a-tab-pane tab="区" key="3" :disabled="!districts.length">
      <li v-for="district in districts" :key="district.id">
        <a-checkbox
          @change="onNodeChange(district, $event)"
          :checked="district.checked"
          :indeterminate="district.indeterminate"
        >
          {{ district.name }}
        </a-checkbox>
      </li>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { cloneDeep } from 'lodash-es'
import { TreeSelect, LEAF_ONLY } from 'oa-core/utils/tree-select'
import AreaPanel from './area-select/area-panel.vue'

const areaTreeSelect = new TreeSelect([], {
  mode: LEAF_ONLY
})

export default {
  props: {
    /**
     * 城市树选项 [{id:1,name:'北京',children:[{id:2,name:'通州',children:[]}]}]
     */
    options: {
      type: Array,
      default: () => []
    },
    /**
     * 初始选中id数组，仅包含叶子节点
     */
    areaIds: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AreaPanel
  },
  data() {
    return {
      area_ids: [],
      areaTree: [],
      provinces: [],
      citys: [],
      districts: []
    }
  },
  created() {
    this.$emit('ready', areaTreeSelect)
    areaTreeSelect.setTreeOptions([
      {
        id: 0,
        name: '选择省份',
        children: cloneDeep(this.options)
      }
    ])
    areaTreeSelect.setCheckedIds(this.areaIds)
    this.areaTree = areaTreeSelect.tree
  },
  watch: {
    options(newVal) {
      areaTreeSelect.setTreeOptions([
        {
          id: 0,
          name: '选择省份',
          children: cloneDeep(this.options)
        }
      ])
      this.areaTree = areaTreeSelect.tree
    },
    areaIds(newVal) {
      areaTreeSelect.setCheckedIds(newVal)
    }
  },
  methods: {
    onNodeChange(node, e) {
      node.handleChange(e.target.checked)
    },
    onProvinceEnter(province) {
      this.currentProvince = province.id
    },
    onCityEnter(city) {
      this.currentCity = city.id
    }
  }
}
</script>
