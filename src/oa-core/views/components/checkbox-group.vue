<template>
  <div class="oa-checkbox-group">
    <a-row>
      <a-col :span="8">
        <a-checkbox
          @change="onCheckAllChange"
          :checked="checkAll"
          :indeterminate="indeterminate"
        >
          全选
        </a-checkbox>
      </a-col>
    </a-row>
    <a-checkbox-group v-model="checkedList" @change="onChange">
      <a-row>
        <a-col :span="8" v-for="option in checkOptions" :key="option.value">
          <a-checkbox :value="option.value">{{ option.label }}</a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: null
    }
  },

  data() {
    return {
      indeterminate: false,
      checkAll: false
    }
  },

  computed: {
    checkOptions() {
      return this.options.map(item => {
        item.value = item.id
        item.label = item.name
        return item
      })
    },
    checkedList: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    }
  },

  watch: {
    value(val) {
      this.onChange(val)
    }
  },

  created() {
    this.onChange(this.value)
  },

  methods: {
    onChange(checkedList) {
      if (!Array.isArray(checkedList)) return
      this.indeterminate =
        !!checkedList.length && checkedList.length < this.options.length
      this.checkAll = checkedList.length === this.options.length
    },
    // 监听全选按钮状态变更
    onCheckAllChange(e) {
      let checkedList = this.options.map(item => item.id)
      Object.assign(this, {
        checkedList: e.target.checked ? checkedList : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
  }
}
</script>
