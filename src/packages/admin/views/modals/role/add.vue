<template>
  <oa-modal
    title="新增角色"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="addRole$loading"
  >
    <a-form :form="form">
      <a-form-item :label="labels.version_id" v-bind="{ labelCol, wrapperCol }">
        {{ version_id | statusFilter(versionList) }}
      </a-form-item>
      <a-form-item
        required
        :label="labels.name"
        v-bind="{ labelCol, wrapperCol }"
      >
        <a-input
          :placeholder="placehoders.name"
          v-decorator="decorators.name"
        ></a-input>
      </a-form-item>
      <a-form-item
        required
        :label="labels.level_id"
        v-bind="{ labelCol, wrapperCol }"
      >
        <oa-select
          v-decorator="decorators.level_id"
          :options="levelList"
        ></oa-select>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { labels, placehoders, decorators } from './role#config'
import { addRole, getAuthLevelList } from '@/api/role'
import { mapGetters } from 'vuex'

export default {
  props: {
    version_id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      show: false,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      form: this.$form.createForm(this),
      labels,
      placehoders,
      levelList: [],
      decorators
    }
  },
  created() {
    this.initData()
  },
  computed: {
    ...mapGetters('admin', ['versionList'])
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.addRole(values).then(() => {
            this.$emit('done')
            this.$message.success('添加成功')
            this.show = false
          })
        }
      })
    }
  },
  async: {
    initData() {
      this.getAuthLevelList()
    },
    addRole({ name, level_id }) {
      return addRole({
        version_id: this.version_id,
        level_id,
        name
      })
    },
    getAuthLevelList() {
      return getAuthLevelList({
        version_id: this.version_id
      }).then(res => {
        this.levelList = res.list || []
      })
    }
  }
}
</script>
