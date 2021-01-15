<template>
  <oa-modal v-model="show" title="功能设置" @ok="onSubmit" width="550px">
    <div class="device-info mg-b32">
      <oa-t3 class="mg-b16">设备信息</oa-t3>
      <div class="device-row mg-b8">
        <span>设备信息：</span>
        <span>{{ category_name }}</span>
      </div>
      <div class="device-row">
        <span>场馆名称：</span>
        <span>{{ shop_name }}</span>
      </div>
    </div>
    <div class="interface-setting mg-b32" v-if="app_id === 10001">
      <oa-t3 class="mg-b16">界面设置</oa-t3>
      <oa-t4 class="mg-b8 inline-block">
        首页功能展示顺序
      </oa-t4>
      <span class="tips">
        (拖动定义首页展示顺序，点击切换是否隐藏)
      </span>
      <draggable v-model="homeOptions" class="drag-box mg-b8">
        <div
          class="drag-item"
          :class="{
            actived: li.status
          }"
          v-for="(li, index) in homeOptions"
          :key="li.type"
          @click="clickItem(li, index)"
        >
          {{ li.alias }}
        </div>
      </draggable>
      <oa-t4 class="mg-b8 inline-block">入离场功能选择优先级</oa-t4>
      <span class="tips">
        (拖动定义页面展示顺序，不可隐藏）
      </span>
      <draggable v-model="authOptions" class="drag-box mg-b8">
        <div class="drag-item actived" v-for="li in authOptions" :key="li.type">
          {{ li.alias }}
        </div>
      </draggable>
    </div>
    <div class="temperature-setting mg-32" v-if="isFace">
      <oa-t3 class="mg-b16">体温配置</oa-t3>
      <a-form :form="tempForm">
        <a-form-item label="体温模块开关" v-bind="formCol" required>
          <oa-radio-group
            :options="radioOptions"
            v-decorator="tempDecorators.open"
          ></oa-radio-group>
        </a-form-item>
        <a-form-item label="设置正常体温阈值" v-bind="formCol" required>
          <a-input-number
            :min="36.0"
            :max="37.8"
            step="0.1"
            v-decorator="tempDecorators.auth_temperature"
          />
          <span class="tips">默认 37.3°（范围 36.0° ~ 37.8°）</span>
        </a-form-item>
        <a-form-item label="设置体温补偿值" v-bind="formCol" required>
          <a-input-number
            :min="-0.5"
            :max="0.5"
            step="0.1"
            v-decorator="tempDecorators.corrected_temperature"
          />
          <span class="tips">（范围 -0.5 ~ +0.5°）</span>
        </a-form-item>
        <a-form-item label="测温模块有效值" v-bind="formCol" required>
          <a-input-number
            :min="25.0"
            :max="40.0"
            step="0.1"
            v-decorator="tempDecorators.trigger_temperature"
          />
          <span class="tips">（范围：25.0° ~ 40.0°）</span>
        </a-form-item>
        <a-form-item label="高温是否允许通行" v-bind="formCol" required>
          <oa-radio-group
            :options="allowOptions"
            v-decorator="tempDecorators.allow_temperature"
          ></oa-radio-group>
        </a-form-item>
      </a-form>
    </div>
    <div class="ai-setting">
      <oa-t3 class="mg-b16">算法配置</oa-t3>
      <a-form :form="form">
        <a-form-item label="口罩识别开关" v-bind="formCol" required>
          <oa-radio-group
            :options="radioOptions"
            v-decorator="faceDecorators.mask_open"
          ></oa-radio-group>
        </a-form-item>
        <a-form-item label="口罩识别阈值" v-bind="formCol" required>
          <a-input-number
            :min="70"
            :max="100"
            v-decorator="faceDecorators.mask_threshold"
            :precision="0"
          />
          <span class="tips">默认 70（建议 70 ~ 100）</span>
        </a-form-item>
        <a-form-item label="人脸识别阈值" v-bind="formCol" required>
          <a-input-number
            :min="70"
            :max="100"
            v-decorator="faceDecorators.face_threshold"
            :precision="0"
          />
          <span class="tips">默认 80（建议70 ~ 100）</span>
        </a-form-item>
        <a-form-item label="识别人脸大小" v-bind="formCol" required>
          <a-input-number
            :min="30"
            :max="80"
            v-decorator="faceDecorators.face_size"
            :precision="0"
          />
          <span class="tips">默认 80（需大于30）</span>
        </a-form-item>
        <a-form-item label="活体检测方式" v-bind="formCol" required>
          <oa-select
            :options="selectOptions"
            v-decorator="faceDecorators.living_type"
          ></oa-select>
        </a-form-item>
        <a-form-item label="RGB活体阈值" v-bind="formCol" required>
          <a-input-number
            :min="50"
            :max="100"
            v-decorator="faceDecorators.rgb_threshold"
            :precision="0"
          />
          <span class="tips">默认 80</span>
        </a-form-item>
        <a-form-item label="NIR活体阈值" v-bind="formCol" required>
          <a-input-number
            :min="50"
            :max="100"
            v-decorator="faceDecorators.nir_threshold"
            :precision="0"
          />
          <span class="tips">默认 80</span>
        </a-form-item>
      </a-form>
    </div>
  </oa-modal>
</template>
<script>
import draggable from 'vuedraggable'
import { configGet, configSave } from '@/api/hardware'
import { get, sortBy } from 'lodash-es'
import { tempRules, faceRules } from './setting#config'
export default {
  data() {
    const form = this.$stForm.create()
    const faceDecorators = form.decorators(faceRules)
    const tempForm = this.$stForm.create()
    const tempDecorators = tempForm.decorators(tempRules)
    return {
      show: false,
      faceAppIdList: [10002, 10006, 10007, 10011],
      deviceConfig: {},
      homeOptions: [],
      authOptions: [],
      form,
      faceDecorators,
      tempForm,
      tempDecorators,
      formCol: {
        'label-col': { span: 8 },
        'wrapper-col': { span: 16 }
      },
      radioOptions: [
        {
          id: 1,
          name: '打开'
        },
        {
          id: 0,
          name: '关闭'
        }
      ],
      allowOptions: [
        {
          id: 0,
          name: '不允许'
        },
        {
          id: 1,
          name: '允许'
        }
      ],
      selectOptions: []
    }
  },
  props: {
    device_id: {
      type: String,
      required: true
    },
    app_id: {
      type: Number,
      required: true
    },
    shop_name: {
      type: String,
      required: true
    },
    category_name: {
      type: String,
      required: true
    }
  },
  async: {
    deviceConfigGet(data) {
      return configGet(data)
    },
    deviceConfigSave(data) {
      return configSave(data)
    }
  },
  computed: {
    isFace() {
      return this.faceAppIdList.includes(this.app_id)
    }
  },
  mounted() {
    this.getDeviceConfig()
  },
  methods: {
    getDeviceConfig() {
      this.deviceConfigGet({
        device_id: this.device_id,
        app_id: this.app_id
      }).then(res => {
        this.deviceConfig = get(res, 'config', {})
        let selectData = get(res, 'form_items.living_type.items', [])
        this.selectOptions = selectData.map(item => {
          return { id: item.value, name: item.text }
        })
        let faceData = get(this.deviceConfig, 'face.data', {})
        this.form.setFieldsValue({ ...faceData })
        if (this.app_id === 10001) {
          // 智慧前台
          let homeArry = get(this.deviceConfig, 'home_func.data', [])
          this.homeOptions = sortBy(homeArry, ['order'])
          let authArry = get(this.deviceConfig, 'auth_type.data', [])
          this.authOptions = sortBy(authArry, ['order'])
        }
        if (this.isFace) {
          // 人脸识别
          let tempData = get(this.deviceConfig, 'temperature.data', {})
          this.tempForm.setFieldsValue({ ...tempData })
        }
      })
    },
    clickItem(li, index) {
      let status = !li.status
      if (status) {
        this.homeOptions[index].status = 1
      } else {
        this.homeOptions[index].status = 0
      }
    },
    onSubmit() {
      // TODO:暂时循环对象处理字符串转成数字，后期扩展stForm
      this.form.validate().then(values => {
        if (this.isFace) {
          this.tempForm.validate().then(tempValues => {
            this.deviceConfig.temperature.data = tempValues
          })
        }
        if (this.app_id === 10001) {
          let homeData = this.homeOptions.map((item, index) => {
            return {
              ...item,
              order: index
            }
          })
          let authData = this.authOptions.map((item, index) => {
            return {
              ...item,
              order: index
            }
          })
          this.deviceConfig.home_func.data = homeData
          this.deviceConfig.auth_type.data = authData
        }
        this.deviceConfig.face.data = values
        this.$confirm({
          title: '修改提示',
          content: '功能设置修改，需要重启设备后生效',
          onOk: () => {
            return this.deviceConfigSave({
              device_id: this.device_id,
              app_id: this.app_id,
              config: JSON.stringify(this.deviceConfig)
            }).then(res => {
              this.show = false
              this.$message.success('修改成功')
            })
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.inline-block {
  display: inline-block;
}
.drag-item {
  text-align: center;
  width: 90px;
  height: 50px;
  line-height: 50px;
  border: 1px solid @text-light;
  color: @text-light;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: move;
  background: @white;
  &.actived {
    border: 1px solid @primary-color;
    color: @primary-color;
  }
}
.tips {
  color: @text-light;
  font-size: 12px;
  margin-left: 8px;
}
.ant-input {
  width: 80px;
}
</style>
