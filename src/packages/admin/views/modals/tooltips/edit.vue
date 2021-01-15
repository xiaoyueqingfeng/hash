<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑' : '新增'"
    :confirmLoading="onSubmit$loading"
    @ok="onSubmit"
  >
    <a-form :form="form">
      <a-form-item label="唯一标识" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          v-decorator="[
            'sn_code',
            {
              rules: [{ validator: checkSign }],
              initialValue: isEdit ? record.sn : ''
            }
          ]"
          placeholder="请输入唯一标识"
        />
      </a-form-item>
      <a-form-item label="标题" required v-bind="{ labelCol, wrapperCol }">
        <a-input
          placeholder="请输入标题"
          v-decorator="[
            'title',
            {
              rules: [{ validator: checkTitle }],
              initialValue: isEdit ? record.title : ''
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="说明" v-bind="{ labelCol, wrapperCol }">
        <a-input
          placeholder="请输入说明"
          v-decorator="[
            'description',
            {
              rules: [{ validator: checkDescription }],
              initialValue: isEdit ? record.description : ''
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="内容" required v-bind="{ labelCol, wrapperCol }">
        <a-textarea
          placeholder="请输入内容"
          v-decorator="[
            'content',
            {
              rules: [{ validator: checkContent }],
              initialValue: isEdit ? record.content : ''
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { addTooltips, editTooltips } from '@/api/tooltip'
import { NUMBERLETTER, NUMBERCHINALETTER } from 'oa-core/constants/regex'
export default {
  data() {
    return {
      show: true,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
      isEdit: false
    }
  },
  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    if (this.record) {
      this.isEdit = true
    }
  },
  async: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
        } else {
          if (this.isEdit) {
            fieldsValue.id = this.record.id
            editTooltips({ ...fieldsValue }).then(res => {
              this.$message.success('编辑成功')
              this.show = false
              this.$emit('success')
            })
          } else {
            addTooltips({ ...fieldsValue }).then(res => {
              this.$message.success('添加成功')
              this.show = false
              this.$emit('success')
            })
          }
        }
      })
    }
  },
  methods: {
    checkSign(rule, value, callback) {
      if (!value || value.length > 10) {
        /* eslint-disable */
        callback('请输入不超过10个字的唯一标识')
      } else if (!NUMBERLETTER.test(value)) {
        callback('请输入正确格式的唯一标识')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkTitle(rule, value, callback) {
      if (!value || value.length > 50) {
        /* eslint-disable */
        callback('请输入不超过50个英文字符的标题')
      } else if (!NUMBERCHINALETTER.test(value)) {
        callback('请输入正确格式的标题')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkDescription(rule, value, callback) {
      if (value.length > 10) {
        /* eslint-disable */
        callback('请输入不超过10个字符的说明')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkContent(rule, value, callback) {
      if (!value || value.length > 100) {
        /* eslint-disable */
        callback('请输入不超过100个字符的内容')
      }  else {
        /* eslint-disable */
        callback()
      }
    }
  }
}
</script>
