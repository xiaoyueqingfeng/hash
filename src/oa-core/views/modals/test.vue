<template>
  <oa-modal title="账单来看" confirmLoading @ok="onSubmit" v-model="show">
    <a-row>
      <a-col :span="16" :offset="4">
        Hello world this is modal from oa-core
      </a-col>
    </a-row>
  </oa-modal>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    onSubmit() {
      console.log('ok')
    }
  }
}
</script>
