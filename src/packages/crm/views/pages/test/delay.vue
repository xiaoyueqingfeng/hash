<template>
  <div class="content">
    <oa-button class="mg-r8" @click="jumpToSass1">
      签约客户新增延期操作1.0
    </oa-button>
    <oa-button @click="jumpToSass2">签约客户新增延期操作2.0</oa-button>
  </div>
</template>

<script>
import { pick } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  async: {},

  mounted() {
    let a = pick(
      [
        {
          end_time: '12:00'
        },
        {
          end_time: '12:00'
        }
      ],
      'end_time'
    )
    console.log(a)
  },

  methods: {
    jumpToSass1() {
      this.$modalRouter.push({
        name: 'saas1-delay-config',
        props: {},
        on: {
          done: this.isOk
        }
      })
    },
    jumpToSass2() {
      this.$modalRouter.push({
        name: 'saas2-delay-config',
        props: {},
        on: {
          done: this.isOk
        }
      })
    },
    isOk() {}
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 24px;
}
</style>
