<template>
  <div :class="b()">
    <oa-panel app>
      <div :class="b('content')">
        <a-form :form="form">
          <!-- 发送版本 -->
          <a-form-item label="发送版本" v-bind="formCol" required>
            <admin-checkbox-group
              :options="mapping.version_list"
              v-decorator="decorators.version_id"
              style="min-width: 350px"
            ></admin-checkbox-group>
          </a-form-item>
          <!-- 发送范围 -->
          <a-form-item label="发送范围" v-bind="formCol" required>
            <oa-radio-group
              v-decorator="decorators.range"
              :options="mapping.send_range"
              @change="e => (rangeType = e.target.value)"
              style="min-width: 350px"
            ></oa-radio-group>
          </a-form-item>
          <!-- 发送城市 -->
          <a-form-item
            label="    "
            v-bind="formCol"
            v-if="rangeType === RANG_TYPE.city"
          >
            <oa-area-select
              :options="regionTree"
              @ready="handleAreaReady"
              :area-ids="area_ids"
            ></oa-area-select>
          </a-form-item>
          <!-- 发送品牌 -->
          <a-form-item
            label="    "
            v-bind="formCol"
            v-if="rangeType === RANG_TYPE.brand"
          >
            <a-select
              showSearch
              mode="multiple"
              :notFoundContent="noticeGetBrands$loading ? undefined : null"
              :defaultActiveFirstOption="false"
              :filterOption="false"
              placeholder="请搜索品牌"
              @search="handleBrandSearch"
              @select="handleBrandSelect"
              @deselect="handleBrandDeSelect"
              v-model="brand_ids"
              :maxTagCount="2"
              style="width: 388px"
            >
              <a-spin
                v-if="noticeGetBrands$loading"
                slot="notFoundContent"
                size="small"
              />
              <a-select-option
                v-for="item in brand_searchresult"
                :key="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
            <a @click="handleScanBrandList">
              查看已选中{{ brand_ids.length }}家
            </a>
          </a-form-item>
          <!-- 触达位置 -->
          <a-form-item label="触达位置" v-bind="formCol" required>
            <a-checkbox-group
              v-decorator="decorators.target"
              @change="e => (targetType = e)"
            >
              <a-checkbox
                :value="sendTarget.id"
                :key="sendTarget.id"
                v-for="sendTarget in mapping.send_target"
              >
                {{ sendTarget.name }}
              </a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <!-- 发送类型 -->
          <a-form-item label="发送类型" v-bind="formCol" required>
            <oa-radio-group
              v-decorator="decorators.type"
              :options="mapping.send_type"
              @change="e => (sendType = e.target.value)"
            ></oa-radio-group>
          </a-form-item>
          <!-- 仅选择弹窗公告时展示 -->
          <div v-show="sendType === SEND_TYPE.popup">
            <!-- 弹窗有效期 -->
            <a-form-item label="弹窗有效期" v-bind="formCol" required>
              <oa-date-range-filter
                :disabledDate="disabledDate"
                :start.sync="start_at"
                :end.sync="end_at"
                formateFn="YYYY-MM-DD HH:mm"
                style="max-width: 388px"
              ></oa-date-range-filter>
            </a-form-item>
            <!-- PC弹窗 -->
            <div v-show="pcImageShow">
              <a-form-item label="PC弹窗底图" v-bind="formCol" required>
                <oa-radio-group
                  v-decorator="decorators.pc_default"
                  :options="imgUsetype"
                  @change="e => (pcType = e.target.value)"
                ></oa-radio-group>
              </a-form-item>
              <a-form-item label="    " v-bind="formCol" v-show="pcType === 0">
                <admin-template-image-group
                  :images="mapping.pc_default_image"
                  v-decorator="decorators.pc_default_basemap"
                ></admin-template-image-group>
              </a-form-item>
              <a-form-item label="    " v-bind="formCol" v-show="pcType === 1">
                <oa-image-upload
                  isSaas
                  v-decorator="decorators.pc_basemap"
                ></oa-image-upload>
              </a-form-item>
            </div>
            <!-- APP弹窗 -->
            <div v-show="appImageShow">
              <a-form-item label="APP弹窗底图" v-bind="formCol" required>
                <oa-radio-group
                  v-decorator="decorators.app_default"
                  :options="imgUsetype"
                  @change="e => (appType = e.target.value)"
                ></oa-radio-group>
              </a-form-item>
              <a-form-item label="    " v-bind="formCol" v-show="appType === 0">
                <admin-template-image-group
                  :images="mapping.app_default_image"
                  v-decorator="decorators.app_default_basemap"
                ></admin-template-image-group>
              </a-form-item>
              <a-form-item label="    " v-bind="formCol" v-show="appType === 1">
                <oa-image-upload
                  isSaas
                  v-decorator="decorators.app_basemap"
                ></oa-image-upload>
              </a-form-item>
            </div>
          </div>
          <!-- 公告标题 -->
          <a-form-item label="公告标题" v-bind="formCol" required>
            <a-input
              placeholder="设置公告标题"
              v-decorator="decorators.title"
              style="max-width: 388px"
            ></a-input>
          </a-form-item>
          <!-- 弹窗内容 -->
          <a-form-item
            label="弹窗内容"
            required
            v-bind="formCol"
            v-show="sendType === SEND_TYPE.popup"
          >
            <!-- <oa-textarea
              v-decorator="decorators.popup_content"
              placehloder="请输入弹窗内容"
              rows="3"
              style="max-width: 388px"
            ></oa-textarea> -->
            <editor
              v-decorator="decorators.popup_content"
              serviceType="SASS"
              v-if="!getSystemDetail$loading"
            />
          </a-form-item>
          <!-- 公告内容 -->
          <a-form-item label="公告内容" required v-bind="formCol">
            <editor
              v-decorator="decorators.content"
              serviceType="SASS"
              v-if="!getSystemDetail$loading"
            />
          </a-form-item>
          <a-form-item label="发送角色" required v-bind="formCol">
            <oa-radio-group
              v-decorator="decorators.roles"
              :options="mapping.send_role"
            ></oa-radio-group>
          </a-form-item>
        </a-form>
        <div :class="b('footer')">
          <oa-button
            type="primary"
            :loading="buttonLoading"
            @click="handleSendNotice"
            class="mg-r8"
          >
            保存草稿
          </oa-button>
          <oa-button @click="handlePreview">预览</oa-button>
        </div>
      </div>
      <admin-notice-preview
        :previewInfo="previewInfo"
        :show.sync="previewShow"
        from="system"
      ></admin-notice-preview>
    </oa-panel>
  </div>
</template>
<script>
import { systemRules, SEND_TYPE, RANG_TYPE } from './system-edit#config'
import {
  getFormData,
  getSystemDetail,
  noticeAddSystem,
  noticeEditSystem,
  noticeGetBrands,
  noticeSendSystem
} from '@/api/notice'
import { get, map, debounce } from 'lodash-es'
import editor from 'oa-core/views/components/editor#/editor.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'system-edit',
  components: { editor },
  bem: {
    b: 'system-edit'
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(systemRules)
    return {
      form,
      decorators,
      formCol: {
        'label-col': { span: 6 },
        'wrapper-col': { span: 18 }
      },
      mapping: {
        version_list: [],
        send_range: [],
        send_role: [],
        send_type: [],
        send_target: [],
        pc_default_image: [],
        app_default_image: [],
        app_start_image: []
      },
      imgUsetype: [
        {
          id: 0,
          name: '默认'
        },
        {
          id: 1,
          name: '自定义'
        }
      ],
      brand_ids: [],
      brand_result: [],
      brand_searchresult: [],
      area_ids: [],
      areaTreeSelect: [],
      fetching: false,
      id: '',
      isEdit: 0,
      content: '', // 公告内容
      is_all_version: 0, // 是否发送全版本
      rangeType: 1, // 发送范围 1.区域 2.品牌 3.全部品牌
      sendType: 2, // 发送类型 1 弹窗公告 2 系统公告
      pcType: 0, // 展示类型 0 默认 1 自定义
      appType: 0, // 展示类型 0 默认 1 自定义
      targetType: [1], // 触达位置: 1 SaasPro 2 三体云管家
      start_at: '', // 弹窗有效期开始
      end_at: '', // 弹窗有效期截止
      pc_default: [],
      app_default: [],
      systemList: [],
      SEND_TYPE,
      RANG_TYPE,
      previewShow: false,
      previewInfo: {}
    }
  },
  computed: {
    pcImageShow() {
      return this.targetType.includes(1)
    },
    appImageShow() {
      return this.targetType.includes(2)
    },
    buttonLoading() {
      if (this.isEdit) return this.noticeEditSystem$loading
      else return this.noticeAddSystem$loading
    },
    ...mapGetters('oa/base', ['regionTree'])
  },
  async: {
    getFormData() {
      return getFormData().then(res => {
        this.mapping = get(res, 'mapping')
      })
    },
    getSystemDetail(data) {
      return getSystemDetail(data)
    },
    noticeGetBrands(data) {
      return noticeGetBrands(data).then(res => {
        let list = res.list
        this.brand_searchresult = list
      })
    },
    noticeEditSystem(data) {
      return noticeEditSystem(data)
    },
    noticeAddSystem(data) {
      return noticeAddSystem(data)
    },
    noticeSendSystem(data) {
      return noticeSendSystem(data)
    },
    init() {
      return Promise.all([this.getFormData()])
    }
  },
  created() {
    this.id = this.$searchQuery.id
    this.isEdit = this.$searchQuery.isEdit
  },
  mounted() {
    this.init().then(res => {
      if (this.isEdit) {
        this.getSystemDetail({
          id: this.id
        }).then(res => {
          this.form.setFieldsValue({
            version_id: res.version_ids,
            range: res.range,
            target: res.target,
            type: res.type,
            title: res.title,
            roles: res.role_level_ids,
            content: res.content
          })
          // 其他表单字段依赖这些属性来展示隐藏
          this.rangeType = res.range
          this.sendType = res.type
          this.targetType = res.target
          this.pcType = res.is_pc_default_basemap
          this.appType = res.is_app_default_basemap
          // 判断发送范围
          if (this.rangeType === RANG_TYPE.city) {
            this.area_ids = res.range_data.zones
          }
          // 判断发送范围
          if (this.rangeType === RANG_TYPE.brand) {
            this.brand_result = res.range_data.brand_ids
            this.brand_searchresult = res.range_data.brand_ids
            this.brand_ids = map(res.range_data.brand_ids, 'id')
          }
          // 判断发送类型
          if (this.sendType === SEND_TYPE.popup) {
            this.start_at = get(res.expire, 'start')
            this.end_at = get(res.expire, 'end')
            let pc_basemap = res.pc_basemap
            let app_basemap = res.app_basemap
            let pc_default_basemap = res.pc_basemap.concat()
            let app_default_basemap = res.app_basemap.concat()
            if (!this.pcType && !pc_default_basemap) {
              pc_default_basemap = this.handleGetPcDefault()
            }
            if (!this.appType && !app_default_basemap) {
              app_default_basemap = this.handleGetAppDefault()
            }
            this.form.setFieldsValue({
              pc_basemap,
              pc_default_basemap,
              app_basemap,
              app_default_basemap,
              pc_default: res.is_pc_default_basemap,
              app_default: res.is_app_default_basemap,
              popup_content: res.popup_content
            })
          }
        })
      } else {
        let pc_default_basemap = this.handleGetPcDefault()
        let app_default_basemap = this.handleGetAppDefault()
        this.form.setFieldsValue({
          version_id: map(this.mapping.version_list, 'id'),
          range: 1,
          type: 2,
          target: [1],
          roles: 1,
          pc_default_basemap,
          app_default_basemap,
          content: ''
        })
      }
    })
  },
  methods: {
    handleBrandSelect(e) {
      let result = this.brand_searchresult.filter(brand => brand.id === e)[0]
      if (this.brand_ids.includes(result.id)) return false
      this.brand_result.push(result)
    },
    handleBrandDeSelect(e) {
      this.brand_result = this.brand_result.filter(brand => brand.id !== e)
    },
    handleGetPcDefault() {
      let pc_default_image = this.mapping.pc_default_image
      let pc_default = []
      if (pc_default_image && pc_default_image.length) {
        pc_default = [pc_default_image[0]]
      }
      return pc_default
    },
    handleGetAppDefault() {
      let app_default_image = this.mapping.app_default_image
      let app_default = []
      if (app_default_image && app_default_image.length) {
        app_default = [app_default_image[0]]
      }
      return app_default
    },
    disabledDate(current) {
      return current && current < moment().add(-1, 'days')
    },
    handleSendNotice() {
      let forceFields = []
      if (this.sendType === 1) {
        if (!this.start_at || !this.end_at) {
          this.$message.error('请选择弹窗有效期')
          return false
        }
        if (this.pcImageShow && this.pcType) {
          forceFields.push('pc_basemap')
        }
        if (this.appImageShow && this.appType) {
          forceFields.push('app_basemap')
        }
      }

      this.form.validate().then(values => {
        let formData = {
          is_all_version: this.is_all_version,
          version_id: values.version_id, // 发送版本
          range: values.range, // 发送范围
          target: values.target, // 触达位置
          type: values.type, // 发送类型
          title: values.title, // 公告标题
          roles: values.roles, // 发送角色
          action: 1,
          content: values.content
        }
        if (this.isEdit) {
          formData = Object.assign(formData, {
            id: this.id
          })
        }
        // 判断发送范围
        if (this.rangeType === RANG_TYPE.city) {
          let area_id = this.getAreaIds()
          formData = Object.assign(formData, {
            area_id: area_id || []
          })
        }
        // 判断发送范围
        if (this.rangeType === RANG_TYPE.brand) {
          formData = Object.assign(formData, {
            brand_id: this.brand_ids
          })
        }
        // 判断发送类型
        if (this.sendType === SEND_TYPE.popup) {
          let pc_basemap
          let app_basemap
          if (this.pcType) {
            pc_basemap = map(values.pc_basemap, 'key')
          } else {
            pc_basemap = map(values.pc_default_basemap, 'key')
          }
          if (this.appType) {
            app_basemap = map(values.app_basemap, 'key')
          } else {
            app_basemap = map(values.app_default_basemap, 'key')
          }
          formData = Object.assign(formData, {
            start_at: this.start_at,
            end_at: this.end_at,
            pc_default: values.pc_default,
            app_default: values.app_default,
            pc_basemap,
            app_basemap,
            popup_content: values.popup_content
          })
        }
        this.handleSubmit(formData).then(res => {
          let noticeId = res.id
          this.$message.success('公告保存成功')
          this.$modalRouter.push({
            name: 'notice-publish',
            props: { id: noticeId, from: 'system' },
            on: {
              done: () => {
                this.CLOSE_TAB(this.$route.name)
                this.$router.replace({
                  name: 'notice-list-system'
                })
              },
              cancel: () => {
                this.CLOSE_TAB(this.$route.name)
                this.$router.replace({
                  name: 'notice-list-system'
                })
              }
            }
          })
        })
      })
    },
    handleSubmit(formData) {
      if (this.isEdit) {
        return this.noticeEditSystem(formData)
      } else {
        return this.noticeAddSystem(formData)
      }
    },
    handlePreview() {
      // 常规公告
      if (this.sendType === 2) {
        this.previewInfo = {
          version_id: this.form.getFieldValue('version_id'),
          roles: this.form.getFieldValue('roles'),
          title: this.form.getFieldValue('title'),
          content: this.form.getFieldValue('content')
        }
        this.$modalRouter.push({
          name: 'notice-scan',
          props: {
            previewInfo: this.previewInfo
          }
        })
      } else {
        // 弹窗公告
        let pc_basemap = []
        let app_basemap = []
        if (this.pcImageShow) {
          if (this.pcType) {
            pc_basemap = this.form.getFieldValue('pc_basemap')
          } else {
            pc_basemap = this.form.getFieldValue('pc_default_basemap')
          }
        }
        if (this.appImageShow) {
          if (this.appType) {
            app_basemap = this.form.getFieldValue('app_basemap')
          } else {
            app_basemap = this.form.getFieldValue('app_default_basemap')
          }
        }

        this.previewInfo = {
          pc_basemap,
          app_basemap,
          title: this.form.getFieldValue('title'),
          popup_content: this.form.getFieldValue('popup_content')
        }
        this.previewShow = true
      }
    },
    handleBrandSearch: debounce(function(keywords) {
      this.noticeGetBrands({
        keywords: keywords.trim() || ''
      })
    }, 100),
    handleAreaReady(areaTreeSelect) {
      this.areaTreeSelect = areaTreeSelect
    },
    getAreaIds() {
      const area_ids = this.areaTreeSelect.calcCheckedIds()
      return area_ids.join(',')
    },
    handleScanBrandList() {
      this.$modalRouter.push({
        name: 'notice-brandList',
        props: {
          info: this.brand_result
        },
        on: {
          changeBrandSearchList: list => {
            this.brand_ids = map(list, 'id')
            this.brand_result = this.brand_result.filter(brand =>
              this.brand_ids.includes(brand.id)
            )
            this.brand_searchresult = list
          }
        }
      })
    },
    ...mapMutations('oa/base', ['CLOSE_TAB'])
  }
}
</script>
<style lang="less">
.system-edit {
  .oa-panel__body {
    // padding: 72px 40px;
  }
  .ant-form-item-label {
    line-height: normal;
  }
  .ant-form-item-control {
    line-height: normal;
  }
}
</style>
<style lang="less" scoped>
.system-edit {
  &__content {
    padding-top: 54px;

    margin: 0 auto;
  }
  &__footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
