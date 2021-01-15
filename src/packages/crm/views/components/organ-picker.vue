<template>
  <oa-cascader
    class="crm-organ-picker"
    v-model="model"
    changeOnSelect
    :placeholder="placeholder"
    :options="organOptions"
    @cascaderFocus="handleFocus"
  ></oa-cascader>
</template>

<script>
import { getOrganList } from '@/api/user'
import { walkTree } from 'oa-core/utils/walk-tree'
export default {
  props: {
    value: {
      type: null,
      required: true
    },
    placeholder: {
      type: String,
      default: '选择部门'
    }
  },
  data() {
    return {
      organOptions: []
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        const _value = newVal
        this.$emit('input', _value)
        this.$emit('change', _value)
      }
    }
  },
  async: {
    getOrganList() {
      return getOrganList().then(res => {
        // 不需要顶级节点
        const options = res[0].children
        walkTree(options, node => {
          if (!node.children.length) {
            delete node.children
          }
        })
        this.organOptions = options
      })
    }
  },
  // mounted() {
  //   this.getOrganList()
  // },
  methods: {
    onOrganChange(organId) {
      this.$emit('update:organId', organId)
      console.log('organId', organId)
    },
    handleFocus() {
      if (this.organOptions && this.organOptions.length) return false
      this.getOrganList()
    }
  }
}
</script>

<style lang="less">
.crm-organ-picker {
}
</style>
