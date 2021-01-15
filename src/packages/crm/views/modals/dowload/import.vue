<template>
  <oa-modal title="leads导入" v-model="show" @ok="onSubmit">
    <a-form :form="form">
      <a-form-item
        label="leads模板"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
      >
        <a href="javascript:;" @click="downloadLeadsDemo">下载leads模板</a>
      </a-form-item>
      <a-form-item
        label="上传文件"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 17 }"
        required
      >
        <oa-file-upload
          :sizeLimit="1"
          :tips="'允许上传文件格式为: .xls和.xlsx'"
          fileType="xlsx,xls"
          @upload="getFileKey"
          v-decorator="['upload', { rules: [{ validator: uploadValidate }] }]"
        ></oa-file-upload>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { getImportDemoExcel } from '@/api/import'
import { importLeads } from '@/api/leads'

export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
      form: this.$form.createForm(this),
      fileKey: '',
      show: true
    }
  },

  computed: {},

  async: {
    getImportDemoExcel() {
      return getImportDemoExcel()
    },
    importLeads(query) {
      return importLeads(query)
    }
  },

  methods: {
    uploadValidate(rule, value, callback) {
      if (!value) {
        // eslint-disable-next-line
        callback('请上传文件')
      } else {
        // eslint-disable-next-line
        callback()
      }
    },
    getFileKey(key) {
      this.fileKey = key
      console.log('fileKey', this.fileKey)
    },
    downloadLeadsDemo() {
      this.getImportDemoExcel().then(res => {
        let dom = document.createElement('a')
        dom.href = res
        dom.target = '_blank'
        dom.click()
      })
    },
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (err) return
        this.importLeads({
          oss_key: this.fileKey
        }).then(res => {
          let content
          if (res) {
            content = '文件上传成功'
          } else {
            content = '文件上传失败'
          }
          this.modal = this.$info({
            title: 'leads导入',
            content,
            onOk: () => {
              this.show = false
              this.$emit('done')
            }
          })
        })
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
