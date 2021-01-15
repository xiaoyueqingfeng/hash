<template>
  <oa-cascader
    changeOnSelect
    v-model="model"
    placeholder="请选择部门"
    :options="options"
  ></oa-cascader>
</template>

<script>
import { getOrganList } from '@/api/organ'
import { listToTree } from 'oa-core/utils/list-to-tree'
export default {
  props: {
    value: {
      type: null
    },
    dropRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(id) {
        this.$emit('input', id)
        this.$emit('change', id)
      }
    }
  },
  created() {
    getOrganList().then(res => {
      if (this.dropRoot) {
        this.options = listToTree(res.list.slice(1))
      } else {
        this.options = listToTree(res.list)
      }
    })
  }
}
</script>
