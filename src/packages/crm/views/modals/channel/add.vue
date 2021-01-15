<template>
  <oa-modal title="新建渠道" v-model="show" @ok="onSubmit">
    <a-form :form="form">
      <a-form-item
        label="一级渠道来源"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-select
          v-decorator="[
            'channel_level1_id',
            { rules: [{ required: true, message: '请选择渠道来源' }] }
          ]"
          placeholder="请选择渠道来源"
        >
          <a-select-option v-for="item in channelLevel" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="二级渠道来源"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-input
          v-decorator="[
            'channel_level2_name',
            { rules: [{ required: true, message: '请输入二级渠道' }] }
          ]"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>
<script>
export default {
  name: 'AddChannel',
  data() {
    return {
      show: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  components: {},
  props: {
    channelLevel: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
        } else {
          this.$emit('emitAddChannel', fieldsValue)
          this.show = false
        }
      })
    }
  }
}
</script>
