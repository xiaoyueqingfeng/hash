<template>
  <area-panel>
    <a-checkbox
      slot="header"
      v-for="nation in areaTree"
      :key="nation.id"
      :checked="nation.checked"
      :indeterminate="nation.indeterminate"
      @change="onNodeChange(nation, $event)"
    >
      选择省份
    </a-checkbox>
    <!-- 省份item -->
    <li
      v-for="province in areaTree[0] ? areaTree[0].children : []"
      :key="province.id"
      @mouseenter="onProvinceEnter(province)"
    >
      <a-checkbox
        :checked="province.checked"
        :indeterminate="province.indeterminate"
        @change="onNodeChange(province, $event)"
      >
        {{ province.name }}
      </a-checkbox>
      <area-panel absolute v-if="province.id === currentProvince">
        <a-checkbox
          slot="header"
          :checked="province.checked"
          :indeterminate="province.indeterminate"
          @change="onNodeChange(province, $event)"
        >
          选择城市
        </a-checkbox>
        <!-- 城市item -->
        <li
          v-for="city in province.children"
          :key="city.id"
          @mouseenter="onCityEnter(city)"
        >
          <a-checkbox
            :checked="city.checked"
            :indeterminate="city.indeterminate"
            @change="onNodeChange(city, $event)"
          >
            {{ city.name }}
          </a-checkbox>
          <area-panel absolute v-if="city.id === currentCity">
            <a-checkbox
              slot="header"
              :checked="city.checked"
              :indeterminate="city.indeterminate"
              @change="onNodeChange(city, $event)"
            >
              选择地区
            </a-checkbox>
            <!-- 地区item -->
            <li v-for="district in city.children" :key="district.id">
              <a-checkbox
                @change="onNodeChange(district, $event)"
                :checked="district.checked"
                :indeterminate="district.indeterminate"
              >
                {{ district.name }}
              </a-checkbox>
            </li>
          </area-panel>
        </li>
      </area-panel>
    </li>
  </area-panel>
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
    },
    useLocalData: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AreaPanel
  },
  data() {
    return {
      area_ids: [],
      areaTree: [],
      currentProvince: 0,
      currentCity: 0
    }
  },
  created() {
    this.$emit('ready', areaTreeSelect)
    //
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
      console.log('newVal', newVal)
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
