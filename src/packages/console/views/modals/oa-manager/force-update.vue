<template>
  <oa-modal
    v-model="show"
    title="强更版本"
    :confirmLoading="updateAppVersionStatus$loading"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item label="设备类型:" v-bind="formCol">
        {{ device_id_tip }}
      </a-form-item>
      <a-form-item label="版本号:" v-bind="formCol">
        {{ version }}
      </a-form-item>
      <a-form-item label="推送类型:" required v-bind="formCol">
        <a-radio-group v-decorator="decorators.push_status">
          <a-radio
            :value="item.id"
            v-for="item in pushStatusOptions"
            :key="item.id"
          >
            {{ item.name }}
          </a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </oa-modal>
</template>

<script>
import { ruleOptions } from './force-update#config'
import { getUpdateFormData, updateAppVersionStatus } from '@/api/appversion'
import { get } from 'lodash-es'
export default {
  name: 'oa-manager-force-update',

  components: {},

  props: {
    versionInfo: {
      type: Object,
      default: null,
      required: true
    }
  },

  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(ruleOptions)

    return {
      form,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      decorators,
      show: false,
      pushStatusOptions: []
    }
  },

  computed: {
    device_id_tip() {
      return get(this.versionInfo, 'device_id_tip')
    },
    version() {
      return get(this.versionInfo, 'version')
    },
    versionId() {
      return get(this.versionInfo, 'id')
    }
  },

  async: {
    updateAppVersionStatus(queryOptions) {
      return updateAppVersionStatus(queryOptions).then(res => {
        this.$message.success('版本推送成功')
        this.show = false
        this.$emit('done')
      })
    },
    getUpdateFormData(version_id) {
      return getUpdateFormData({
        version_id
      }).then(res => {
        this.pushStatusOptions = res.push_status
      })
    }
  },

  mounted() {
    this.getUpdateFormData(this.versionId)
  },

  methods: {
    handleSubmit() {
      this.form.validate().then(values => {
        console.log(values)
        let queryOptions = {
          version_id: this.versionId,
          push_status: values.push_status
        }
        this.updateAppVersionStatus(queryOptions)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
