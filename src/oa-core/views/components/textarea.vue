<template>
  <div :class="b()">
    <a-textarea
      v-bind="attrs"
      v-model="content"
      @change="onChange"
    ></a-textarea>
    <div :class="b('count')">{{ currentLength }}/{{ maxlength }}</div>
  </div>
</template>

<script>
export default {
  bem: {
    b: 'oa-textarea'
  },
  props: {
    value: {
      type: String
    },
    maxlength: {
      type: [Number, String],
      default: 500
    }
  },
  data() {
    return {
      content: '',
      attrs: {
        autosize: {
          minRows: 3,
          maxRow: 20
        },
        ...this.$attrs
      }
    }
  },
  watch: {
    value() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  computed: {
    currentLength() {
      return this.content.length
    }
  },
  methods: {
    init() {
      this.content = this.value || ''
    },
    onChange(e) {
      const { maxlength } = this
      const content = e.target.value.substr(0, maxlength)
      this.content = content
      this.$emit('input', content)
      this.$emit('change', content)
    }
  }
}
</script>

<style lang="less">
.oa-textarea {
  .pos-r;
  &__count {
    .pos-a;
    right: 12px;
    bottom: 5px;
    .c(@text-light);
  }
}
</style>
