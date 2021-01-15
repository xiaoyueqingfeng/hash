<template>
  <div class="sg-section">
    <h4>oa-editor 需要手动引入 oa-core/views/components/editor#/.vue</h4>
    <oa-editor v-model="content"></oa-editor>
    {{ content }}
  </div>
</template>

<script>
import OaEditor from 'oa-core/views/components/editor#/editor.vue'
export default {
  components: {
    OaEditor
  },
  data() {
    return {
      content: ''
    }
  }
}
</script>
