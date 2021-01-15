<template>
  <div class="form-tree">
    <a-form>
      <!-- 表单项 -->
      <a-form-item
        v-for="formItem in formItems"
        :required="formItem.required"
        :label="formItem.name"
        :key="formItem.id"
      >
        <!-- 子项 -->
        <a-row v-for="child in formItem" :key="child.id">
          <!-- 子项name -->
          <a-col>
            <span>{{ child.name }}</span>
          </a-col>
          <!-- 子项child -->
          <a-col>
            <!-- <oa-form-item-component></a-form-item-component> -->
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
      formItems: []
    }
  },

  computed: {},

  async: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less" scoped></style>
