<template>
  <div class="plugin-edit">
    <oa-panel app>
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              label="唯一标识"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-input
                placeholder="请输入唯一标识"
                v-decorator="[
                  'sn',
                  {
                    rules: [{ validator: checkSign }],
                    initialValue: isEdit ? formData.app_sn : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="插件名称"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-input
                placeholder="请输入插件名称"
                v-decorator="[
                  'name',
                  {
                    rules: [{ validator: checkName }],
                    initialValue: isEdit ? formData.app_name : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item
              label="插件类型"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <oa-select
                :options="formData.mapping.plugin_type"
                v-decorator="[
                  'plugin_type',
                  {
                    rules: [{ required: true, message: '请选择插件类型' }],
                    initialValue: isEdit ? formData.plugin_type : ''
                  }
                ]"
                placeholder="请选择插件类型"
              ></oa-select>
            </a-form-item>
            <a-form-item
              label="系统"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              saas2.0
            </a-form-item>
            <a-form-item
              label="支持版本"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <div v-show="!versionCheckVisible">
                <span
                  class="mg-r8"
                  v-for="item in selectVersionList"
                  :key="item.id"
                >
                  {{ item.name }}
                </span>
                <oa-button @click="onEditVersionHandle">编辑</oa-button>
              </div>
              <div v-show="versionCheckVisible">
                <admin-version-checkbox
                  @getVersionList="getVersionList"
                  v-decorator="[
                    'version_id',
                    {
                      rules: [{ validator: checkVersion }],
                      initialValue: []
                    }
                  ]"
                />
                <oa-button @click="onSubmitVersion">确定</oa-button>
              </div>
            </a-form-item>
            <a-form-item label="权限组" v-bind="{ labelCol, wrapperCol }">
              <oa-select
                v-decorator="[
                  'permission_group_id',
                  {
                    initialValue: []
                  }
                ]"
                mode="multiple"
                placeholder="请选择权限组"
                :options="permissionList"
                :needFilterOption="false"
                @search="handleSearchPermission"
              ></oa-select>
            </a-form-item>
            <!-- 标签 -->
            <a-form-item
              label="标签"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-radio-group
                v-decorator="[
                  'label',
                  {
                    rules: [{ required: true, message: '请选择标签' }],
                    initialValue: isEdit ? formData.tag : 1
                  }
                ]"
              >
                <a-radio
                  v-for="item in formData.mapping.label"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <!-- 是否免费 -->
            <a-form-item
              label="是否免费"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-radio-group
                v-decorator="[
                  'is_free',
                  {
                    rules: [{ required: true, message: '请选择是否免费' }],
                    initialValue: isEdit ? formData.is_free : 0
                  }
                ]"
              >
                <a-radio
                  v-for="item in formData.mapping.is_free"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <!-- 试用 -->
            <a-form-item
              label="试用"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-radio-group
                @change="onTryChange"
                v-decorator="[
                  'is_allow_try',
                  {
                    rules: [{ required: true, message: '请选择试用状态' }],
                    initialValue: isEdit ? formData.is_try : 0
                  }
                ]"
              >
                <a-radio
                  v-for="item in formData.mapping.is_allow_try"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-radio>
              </a-radio-group>
              <oa-select
                :options="formData.mapping.is_allow_try_day"
                v-if="isTry != 0"
                placeholder="选择天数"
                v-decorator="[
                  'try_day',
                  {
                    rules: [{ required: true, message: '请选择试用天数' }],
                    initialValue: isEdit ? formData.try_day : ''
                  }
                ]"
              ></oa-select>
            </a-form-item>
            <!-- <a-form-item
              label="收费方式"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-radio-group
                @change="onChange"
                v-decorator="[
                  'price_grad',
                  {
                    rules: [{ required: true, message: '请选择收费方式' }],
                    initialValue: isEdit
                      ? formData.price_grad
                      : formData.mapping.price_grad[0].id
                  }
                ]"
              >
                <a-radio
                  v-for="item in formData.mapping.price_grad"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-radio>
              </a-radio-group>
            </a-form-item> -->
            <a-form-item
              label="价格"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-input
                style="display: inline-block; width: 90%; margin-right: 5%"
                type="number"
                :min="0"
                placeholder="请输入价格"
                v-decorator="[
                  'price',
                  {
                    rules: [{ required: true, message: '请输入价格' }],
                    initialValue: isEdit ? pluginInitPrice : ''
                  }
                ]"
              />
              元
            </a-form-item>
            <a-form-item label="转跳链接" v-bind="{ labelCol, wrapperCol }">
              <a-input
                placeholder="请输入转跳链接"
                v-decorator="[
                  'redrect_url',
                  {
                    initialValue: isEdit ? formData.redrect_url : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="单店转跳链接" v-bind="{ labelCol, wrapperCol }">
              <a-input
                placeholder="请输入单店转跳链接"
                v-decorator="[
                  'single_jump_url',
                  {
                    initialValue: isEdit ? formData.single_jump_url : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="使用教程" v-bind="{ labelCol, wrapperCol }">
              <a-input
                placeholder="请输入使用教程链接"
                v-decorator="[
                  'usage_link',
                  {
                    rules: [{ validator: checkURL }],
                    initialValue: isEdit ? formData.usage_link : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="活动案例" v-bind="{ labelCol, wrapperCol }">
              <a-input
                placeholder="请输入活动案例链接"
                v-decorator="[
                  'case_link',
                  {
                    rules: [{ validator: checkURL }],
                    initialValue: isEdit ? formData.case_link : ''
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="权重" v-bind="{ labelCol, wrapperCol }">
              <a-input
                type="number"
                :min="0"
                placeholder="数值越大越靠前，最大值999"
                v-decorator="[
                  'sort',
                  { rules: [], initialValue: isEdit ? formData.sort : '' }
                ]"
              />
            </a-form-item>
            <a-form-item label="功能介绍" v-bind="{ labelCol, wrapperCol }">
              <a-textarea
                placeholder="请输入功能介绍"
                v-decorator="[
                  'introduction',
                  {
                    rules: [],
                    initialValue: isEdit ? formData.description : ''
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- 推荐 -->
            <a-form-item
              label="推荐"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <a-radio-group
                @change="onRecommendChange"
                v-decorator="[
                  'is_recommend',
                  {
                    rules: [{ required: true, message: '请选择' }],
                    initialValue: isEdit ? formData.is_recommend : 0
                  }
                ]"
              >
                <a-radio
                  v-for="item in formData.mapping.is_recommend"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ item.name }}
                </a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              label="推荐图"
              v-bind="{ labelCol, wrapperCol }"
              v-if="isRecommend"
            >
              <oa-image-upload
                isSaas
                v-decorator="[
                  'recommend_img',
                  {
                    rules: [],
                    initialValue: isEdit ? formData.recommend_img : []
                  }
                ]"
              ></oa-image-upload>
            </a-form-item>
            <a-form-item
              label="插件ICON"
              required
              v-bind="{ labelCol, wrapperCol }"
            >
              <oa-image-upload
                isSaas
                v-decorator="[
                  'icon',
                  { rules: [], initialValue: isEdit ? formData.icon : [] }
                ]"
              ></oa-image-upload>
            </a-form-item>
            <a-form-item label="预览图片" v-bind="{ labelCol, wrapperCol }">
              <oa-image-upload
                isSaas
                v-decorator="[
                  'picture',
                  { rules: [], initialValue: isEdit ? formData.images : [] }
                ]"
                :numLimit="4"
              ></oa-image-upload>
            </a-form-item>
            <a-form-item label="规则说明" v-bind="{ labelCol, wrapperCol }">
              <editor
                v-model="rule_description"
                v-if="!getPluginEditFormData$loading"
              />
              <!-- <a-textarea
                placeholder="请输入规则说明"
                v-decorator="[
                  'rule_description',
                  {rules: [],  initialValue: isEdit?formData.rule_description:''}
                ]"
              />-->
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" :offset="2">
            <a-form-item>
              <a-button type="primary" @click="onSubmit">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </oa-panel>
  </div>
</template>
<script>
import {
  getPluginAddFormData,
  getPluginEditFormData,
  editPlugin,
  addPlugin,
  getPermissionGroup
} from '@/api/plugin'
import { URL } from 'oa-core/constants/regex'
import editor from 'oa-core/views/components/editor#/editor.vue'
import { get, debounce, map } from 'lodash-es'
export default {
  name: 'PluginAdd',
  data() {
    return {
      value1: 'Apple',
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      form: (this.form = this.$form.createForm(this)),
      formData: {
        icon: [],
        plugin_type: '',
        mapping: { plugin_type: [] }
      },
      isEdit: false,
      isRecommend: false,
      iconKey: [],
      previewImgKey: [],
      isTry: 0,
      introduction: '',
      rule_description: '',
      pluginInitPrice: 0,
      versionCheckVisible: true,
      versionList: [],
      permissionList: [],
      selectVersionList: []
    }
  },
  components: {
    editor
  },
  async: {
    getPermissionGroup(query) {
      return getPermissionGroup(query).then(res => {
        let permissionList = get(res, 'list', [])
        this.permissionList = permissionList.map(item => {
          return {
            id: item.permission_group_id,
            name: item.permission_group_name,
            disabled: Boolean(item.is_disabled)
          }
        })
      })
    },
    getPluginEditFormData(data) {
      return getPluginEditFormData(data)
    },
    getPluginAddFormData() {
      return getPluginAddFormData().then(res => {
        this.formData = res instanceof Object && res
      })
    }
  },
  mounted() {
    /* eslint-disable */
    if (this.$route.query.id != 0) {
      // 编辑
      this.handleGetEditData()
      this.isEdit = true
    } else {
      this.handleGetAddData()
    }
  },
  methods: {
    getVersionList(list) {
      this.versionList = list
    },
    handleSearchPermission: debounce(function (keywords) {
      if (!this.selectVersionList.length || this.versionCheckVisible) {
        return this.$message.error('请先选择确认版本')
      }
      if (!keywords) return false
      let params = {
        keywords: keywords,
        plugin_id: this.isEdit ? this.$route.query.id : undefined,
        version_id: map(this.selectVersionList, 'id')
      }
      if (!this.getPermissionGroup$loading) this.getPermissionGroup(params)
    }, 300),
    onRecommendChange(e) {
      this.isRecommend = e.target.value
    },
    checkURL(rule, value, callback) {
      if (value && !URL.test(value)) {
        callback('请输入正确格式的链接')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkSign(rule, value, callback) {
      if (!value || value.length > 50) {
        /* eslint-disable */
        callback('请输入不超过50个字的唯一标识')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkName(rule, value, callback) {
      if (!value || value.length > 10) {
        /* eslint-disable */
        callback('请输入不超过10个字符的插件名称')
      } else {
        /* eslint-disable */
        callback()
      }
    },
    checkVersion(rule, value, callback) {
      if (!value || !value.length) {
        callback('请选择版本')
      } else if (this.versionCheckVisible) {
        callback('请确认版本选择')
      } else {
        callback()
      }
    },
    // checkPerm(rule, value, callback) {
    //   if (!value || !value.length) {
    //     callback('请选择权限组')
    //   } else {
    //     callback()
    //   }
    // },
    handleGetAddData() {
      this.getPluginAddFormData()
    },
    handleGetEditData() {
      this.getPluginEditFormData({
        id: this.$route.query.id
      }).then(res => {
        this.formData = res instanceof Object && res
        this.isTry = res.is_try
        this.isRecommend = res.is_recommend
        this.rule_description = res.regulation
        this.pluginInitPrice =
          res.app_info && res.app_info.length ? res.app_info[0]['price'] : 0

        this.versionCheckVisible = false
        let selectVersionList = get(res, 'versions', [])
        this.selectVersionList = selectVersionList.map(item => {
          return {
            id: item.id,
            name: item.version_name
          }
        })
        let permissionList = get(res, 'permission_group_list', [])
        this.permissionList = permissionList.map(item => {
          return {
            id: item.permission_group_id,
            name: item.permission_group_name
          }
        })
        this.form.setFieldsValue({
          version_id: map(selectVersionList, 'id'),
          permission_group_id: map(permissionList, 'permission_group_id')
        })
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        console.log('err', 111)
        if (err) {
          console.log(err)
        } else {
          fieldsValue.rule_description = this.rule_description
          if (this.isEdit) {
            fieldsValue.id = this.$route.query.id
            editPlugin({ ...fieldsValue }).then(res => {
              this.$message.success('编辑成功')
              this.$router.push({
                path: '/plugin/list'
              })
            })
          } else {
            addPlugin({ ...fieldsValue }).then(res => {
              this.$message.success('添加成功')
              this.$router.push({
                path: '/plugin/list'
              })
            })
          }
        }
      })
    },
    onTryChange(e) {
      this.isTry = e.target.value
      console.log('isTry', e)
    },
    onEditVersionHandle() {
      this.versionCheckVisible = true
      this.form.validateFields(['version_id'])
    },
    onSubmitVersion() {
      this.versionCheckVisible = false
      let versions = this.form.getFieldValue('version_id')
      this.form.setFieldsValue({
        version_id: versions,
        permission_group_id: []
      })
      this.permissionList = []
      this.selectVersionList = []
      this.versionList.forEach(version => {
        versions.forEach(id => {
          if (id === version.id) {
            this.selectVersionList.push(version)
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.plugin-edit {
  height: 100%;
}
</style>
