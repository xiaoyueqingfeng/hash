<template>
  <a-cascader
    v-if="mode === 'SINGLE'"
    v-model="singleModel"
    :showSearch="{ filter }"
    :options="optionsLocal"
    @change="onSingleChange"
    @focus="handleFocus"
    :placeholder="placeholder"
    :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
    v-bind="$attrs"
  ></a-cascader>
  <a-cascader
    v-else-if="mode === 'SINGLE_ARRAY'"
    v-model="singleArrayModel"
    :showSearch="{ filter }"
    :options="optionsLocal"
    @change="onSingleArrayChange"
    @focus="handleFocus"
    :placeholder="placeholder"
    :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
    v-bind="$attrs"
  ></a-cascader>
  <a-cascader
    v-else-if="mode === 'MULTIPLE'"
    v-model="levelModel"
    :showSearch="{ filter }"
    :options="optionsLocal"
    @change="onLevelChange"
    @focus="handleFocus"
    :placeholder="placeholder"
    v-bind="$attrs"
    :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
  ></a-cascader>
</template>

<script>
import { cloneDeep, last } from 'lodash-es'
import { walkTree } from 'oa-core/utils/walk-tree'
import { findPathWithTree } from 'oa-core/utils/find-path-with-tree'

export default {
  props: {
    value: {
      type: null
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    multipleModel: {
      type: Boolean,
      default: false
    },
    // 限制树深度
    depth: {
      type: Number,
      default: 99
    },
    level1: {
      type: null
    },
    level2: {
      type: null
    },
    level3: {
      type: null
    },
    level4: {
      type: null
    },
    level5: {
      type: null
    }
  },
  computed: {
    singleModel: {
      get() {
        if (!this.value && this.value !== 0) {
          return []
        }
        return findPathWithTree(this.value, this.optionsLocal)
      },
      set(ids) {
        const _id = last(ids)
        this.$emit('input', _id)
      }
    },
    singleArrayModel: {
      get() {
        return this.value
      },
      set(ids) {
        this.$emit('input', ids)
      }
    },
    levelModel: {
      get() {
        const _model = [
          this.level1,
          this.level2,
          this.level3,
          this.level4,
          this.level5
        ]
        if (_model.every(id => id === undefined)) {
          return []
        }
        return _model
      },
      set(ids) {
        for (let i = 0; i < 5; i++) {
          this.$emit(`update:level${i + 1}`, ids[i])
        }
      }
    },
    optionsLocal() {
      const clonedOptions = cloneDeep(this.options)
      walkTree(clonedOptions, (node, { depth }) => {
        if (node.children && !node.children.length) {
          delete node.children
        }
        // 通过父亲节点删除超过深度的子节点
        if (depth + 2 > this.depth) {
          delete node.children
        }
      })
      return clonedOptions
    }
  },
  data() {
    return {
      mode: 'SINGLE'
    }
  },
  methods: {
    onSingleChange(ids, nodes) {
      this.$emit('change', last(ids), last(nodes))
    },
    onSingleArrayChange(ids, nodes) {
      this.$emit('change', ids, nodes || [], last(nodes))
    },
    onLevelChange(ids, nodes) {
      this.$emit('change', ids, nodes || [], last(nodes))
    },
    handleFocus() {
      this.$emit('cascaderFocus')
    },
    filter(keyword, path) {
      return path.some(
        option =>
          option.name.toLowerCase().indexOf(keyword.toLowerCase().trim()) > -1
      )
    }
  },
  created() {
    if (this.multipleModel) {
      this.mode = 'MULTIPLE'
    } else if (Array.isArray(this.value)) {
      this.mode = 'SINGLE_ARRAY'
    }
  }
}
</script>
