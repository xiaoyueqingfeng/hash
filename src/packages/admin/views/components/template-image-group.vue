<template>
  <div :class="b()">
    <div
      v-for="image in images"
      :key="image.key"
      :class="[b('box'), image.key === activeKey ? 'active' : '']"
      @click="handleSelectImage(image)"
    >
      <img :src="image.url" alt="" />
    </div>
  </div>
</template>
<script>
import { get } from 'lodash-es'
export default {
  name: '',

  bem: {
    b: 'template-image'
  },

  components: {},

  props: {
    images: {
      type: Array,
      default: () => []
    },
    value: {
      type: null
    }
  },

  data() {
    return {
      activeKey: ''
    }
  },

  computed: {
    checked: {
      get() {
        return this.value
      },
      set(newVal) {
        console.log('newVal', newVal)
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      }
    }
  },

  watch: {
    images(values) {
      let obj = this.values && this.values[0]
      if (!obj) return ''
      return get(obj, 'key')
    },
    checked: {
      handler(value) {
        console.log(value)
        let base_default = Array.isArray(value) ? value[0] : {}
        this.activeKey = get(base_default, 'key')
      },
      immediate: true
    }
  },

  async: {},

  methods: {
    handleSelectImage(image) {
      if (this.activeKey === image.key) {
        this.activeKey = ''
        this.checked = []
      } else {
        this.activeKey = image.key
        this.checked = [image]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.template-image {
  display: flex;
  flex-wrap: wrap;
  &__box {
    margin-right: 24px;
    padding: 8px;
    width: 182px;
    height: 114px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    &.active {
      border-color: #1890ff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
