<template>
  <oa-modal
    title="编辑角色"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="updateRole$loading"
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
import { updateRole, getAuthLevelList } from '@/api/role'
import { mapGetters } from 'vuex'
export default {
  props: {
    version_id: {
      type: [String, Number],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    level_id: {
      type: Number,
      required: true
    },
    role_id: {
      type: [Number, String],
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
  mounted() {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        name: this.name,
        level_id: this.level_id
      })
    })
  },
  methods: {
    onSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.updateRole(values).then(() => {
            this.$emit('done')
            this.$message.success('编辑成功')
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
    updateRole({ name, level_id }) {
      return updateRole({
        version_id: this.version_id,
        role_id: this.role_id,
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
