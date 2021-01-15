<template>
  <oa-modal v-model="show" title="下发debug更新任务" :footer="null">
    <a-form :form="form">
      <a-form-item label="设备类型：" v-bind="formCol">
        <span>{{ device_type }}</span>
      </a-form-item>
      <a-form-item label="产品名称：" v-bind="formCol">
        <span>{{ app_name }}</span>
      </a-form-item>
      <a-form-item label="更新包类型：" v-bind="formCol">
        <oa-select
          :options="appVersionType"
          v-decorator="decorators.category_id"
          @change="selectApkType"
          placeholder="选择更新包类型"
        ></oa-select>
      </a-form-item>
      <a-form-item label="更新包：" v-bind="formCol">
        <oa-select
          :disabled="appVersionDisabled"
          :options="appVersion"
          v-decorator="decorators.app_version_id"
          placeholder="选择更新包"
        ></oa-select>
      </a-form-item>
    </a-form>
    <div class="issue-btn">
      <oa-button
        type="primary"
        style="width: 180px"
        :disabled="!canIssue"
        @click="issueDebug"
      >
        立即更新
      </oa-button>
    </div>
  </oa-modal>
</template>

<script>
import { getApkType, getVersion } from '@/api/hardware'
import { get } from 'lodash-es'

export default {
  components: {},

  props: {
    //场馆id
    device_ids: {
      type: Array,
      required: true
    },
    //设备类型
    device_type: {
      type: String,
      required: true
    },
    //产品名称
    app_name: {
      type: String,
      required: true
    },
    //产品id
    app_id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      show: true,
      form: this.$stForm.create(),
      appVersionType: [],
      appVersion: [],
      canIssue: true,
      app_version_id: undefined,
      appVersionDisabled: true,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      decorators: {
        category_id: [
          'category_id',
          {
            rules: [{ required: true, message: '更新包类型必选' }]
          }
        ],
        app_version_id: [
          'app_version_id',
          {
            rules: [{ required: true, message: '更新包必选' }]
          }
        ]
      }
    }
  },

  async: {
    getApkType() {
      return getApkType().then(res => {
        this.appVersionType = get(res, 'apk_type', [])
      })
    }
  },

  mounted() {
    this.getApkType()
  },
  methods: {
    selectApkType(category_id) {
      getVersion({ apk_type: category_id, app_id: this.app_id }).then(res => {
        this.appVersionDisabled = false
        this.form.setFieldsValue({
          app_version_id: undefined
        })
        this.appVersion = get(res, 'list', []).map(item => {
          return {
            id: item.app_version_id,
            name: item.apk_name
          }
        })
      })
    },
    issueDebug() {
      this.form.validate((err, values) => {
        if (!err) {
          let category_name = this.appVersionType.find(item => {
            return values.category_id === item.id
          }).name

          let apk_name = this.appVersion.find(item => {
            return values.app_version_id === item.id
          }).name

          this.$modalRouter.push({
            name: 'device-debug-info',
            props: {
              device_ids: this.device_ids,
              device_type: this.device_type,
              app_name: this.app_name,
              apk_name: apk_name,
              category_name: category_name,
              app_version_id: values.app_version_id
            },
            on: { done: this.emit }
          })
        }
      })
    },

    emit() {
      this.show = false
      this.$emit('done')
    }
  }
}
</script>

<style lang="less" scoped>
.issue-btn {
  text-align: center;
  .mg-t(16px);
}
</style>
