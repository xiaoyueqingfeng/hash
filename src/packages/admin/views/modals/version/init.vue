<template>
  <oa-modal
    title="初始化配置"
    v-model="show"
    @ok="handlerSubmit"
    :confirmLoading="setInitConfig$loading"
  >
    <div class="header">当前版本：{{ version_name }}</div>
    <oa-hr />
    <div class="content">
      <a-form :form="form">
        <init-form-item
          v-for="item in formOptions"
          :options="item"
          :key="item.id"
        ></init-form-item>
      </a-form>
    </div>
  </oa-modal>
</template>

<script>
import {
  getInitConfig,
  setInitConfig,
  getInitConfigTemplate,
  getInitConfigInfo
} from '@/api/version'
import InitFormItem from './init-form-item'
import { typeMap } from '@/constants/version/init-config'
export default {
  name: 'version-init',
  components: {
    InitFormItem
  },
  props: {
    version_id: {
      type: Number
    },
    version_name: {
      type: String
    }
  },
  data() {
    return {
      show: true,
      form: this.$stForm.create(),
      formOptions: [],
      idMap: {},
      postForm: [],
      typeMap
    }
  },
  created() {
    this.initData()
  },
  async: {
    initData() {
      Promise.all([this.getInitConfigTemplate(), this.getInitConfig()]).then(
        () => {
          this.flatTree(this.formOptions)
          this.setForm()
        }
      )
    },
    getInitConfig() {
      return getInitConfig({ version_id: this.version_id }).then(res => {
        this.postForm = res.version_config
      })
    },
    getInitConfigTemplate() {
      return getInitConfigTemplate().then(res => {
        this.formOptions = res.list
      })
    },
    getInitConfigInfo() {
      return getInitConfigInfo().then(res => {})
    },
    setInitConfig(values) {
      return setInitConfig(values)
    }
  },
  mounted() {},
  methods: {
    handlerSubmit() {
      this.form.validate().then(fieldsValue => {
        const data = {
          version_config: this.getForm(fieldsValue),
          version_id: this.version_id
        }
        this.setInitConfig(data).then(res => {
          this.show = false
          this.$message.success('保存成功')
        })
      })
    },
    getForm(fieldsValue) {
      let postForm = []
      let idMap = this.idMap
      for (let field in fieldsValue) {
        let item = idMap[field]
        switch (this.typeMap[item.type]) {
          case 'input': {
            postForm.push({
              id: item.id,
              value: fieldsValue[item.id]
            })
            if (item.parents) {
              item.parents.split(',').forEach(i => {
                postForm.push({
                  id: i,
                  value: ''
                })
              })
            }
            break
          }
          case 'radio': {
            postForm.push({
              id: item.id,
              value: ''
            })
            postForm.push({
              id: fieldsValue[item.id],
              value: ''
            })
            if (item.parents) {
              item.parents.split(',').forEach(i => {
                postForm.push({
                  id: i,
                  value: ''
                })
              })
            }
            break
          }
          case 'checkbox': {
            postForm.push({
              id: item.id,
              value: ''
            })
            fieldsValue[item.id].forEach(i => {
              postForm.push({
                id: i,
                value: ''
              })
            })
            if (item.parents) {
              item.parents.split(',').forEach(i => {
                postForm.push({
                  id: i,
                  value: ''
                })
              })
            }
            break
          }
        }
      }
      return postForm
    },
    setForm() {
      let fieldsValue = this.form.getFieldsValue()
      let idMap = this.idMap
      let postForm = this.postForm
      for (let field in fieldsValue) {
        let item = idMap[field],
          postItem
        switch (this.typeMap[item.type]) {
          case 'input': {
            postItem = postForm.find(el => el.id == item.id)
            if (postItem) {
              let blankObj = {}
              blankObj[field] = postItem.value
              this.form.setFieldsValue(blankObj)
              break
            }
            break
          }
          case 'radio': {
            postItem = postForm.find(el => {
              return item.children.some(child => child.id == el.id)
            })
            if (postItem) {
              let blankObj = {}
              blankObj[field] = postItem.id
              this.form.setFieldsValue(blankObj)
              break
            }
            break
          }
          case 'checkbox': {
            let value = []
            postForm.forEach(el => {
              if (item.children.some(child => child.id == el.id)) {
                value.push(el.id)
              }
            })
            let blankObj = {}
            blankObj[field] = value
            this.form.setFieldsValue(blankObj)
          }
        }
      }
    },
    flatTree(tree) {
      const map = {}
      const flat = function(tree) {
        tree.forEach(item => {
          map[item.id] = item
          if (item.pid != 0) {
            map[item.id].parents = item.pid + ''
            if (map[item.pid].parents) {
              map[item.id].parents =
                map[item.id].parents + ',' + map[item.pid].parents
            }
          }
          if (item.children.length) flat(item.children)
        })
      }
      flat(tree)
      this.idMap = map
    }
  }
}
</script>
