<template>
  <div>
    <a-checkbox :checked="checkAll" @change="setAll" class="mg-r8">
      全选
    </a-checkbox>
    <a-checkbox-group v-model="model">
      <a-checkbox v-for="item in list" :value="item.id" :key="item.id">
        {{ item.name }}
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>

<script>
import { getOtherVersionList } from '@/api/version'
export default {
  data() {
    return {
      list: [],
      checkAll: false,
      allIds: []
    }
  },
  // 此处需要 外界的值是通过这里传进来的
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.getOtherVersionList()
  },
  computed: {
    model: {
      set(newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      },
      get() {
        return this.value || []
      }
    }
  },
  watch: {
    model(value) {
      if (this.list.length !== value.length) {
        this.checkAll = false
      } else {
        this.checkAll = true
      }
    }
  },
  methods: {
    setAll(e) {
      this.checkAll = e.target.checked
      this.$emit('input', e.target.checked ? this.allIds : [])
      this.$emit('change', e.target.checked ? this.allIds : [])
    }
  },
  async: {
    getOtherVersionList() {
      return getOtherVersionList().then(res => {
        this.list = res || []
        if (this.list.length !== this.model.length) {
          this.checkAll = false
        } else {
          this.checkAll = true
        }
        this.allIds = res.map(({ id }) => id)
        this.$emit('getVersionList', this.list)
      })
    }
  }
}
</script>
