<template>
  <div class="sg-section">
    <h4>oa-checkbox-group</h4>
    <oa-checkbox-group
      :options="plainOptions"
      v-model="checkedList"
    ></oa-checkbox-group>
    {{ checkedList }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedList: [],
      plainOptions: [
        {
          id: 1,
          name: '苹果'
        },
        {
          id: 2,
          name: '香蕉'
        },
        {
          id: 3,
          name: '梨子'
        }
      ]
    }
  }
}
</script>
