<template>
  <oa-modal v-model="show" title="提示" @ok="onSubmit">
    <p>删除此柜组会导致绑定关系清除，您确定删除吗？</p>
  </oa-modal>
</template>

<script>
import { deleteCabinetGroup } from '@/api/cabinet'
export default {
  name: 'hardware-locker-delete',

  components: {},

  props: {
    group_id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      show: true
    }
  },

  computed: {},

  async: {
    deleteCabinetGroup(data) {
      return deleteCabinetGroup(data)
    }
  },

  mounted() {},

  methods: {
    onSubmit() {
      this.deleteCabinetGroup({
        group_id: this.group_id
      }).then(() => {
        this.show = false
        this.$message.success('删除柜组成功')
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
