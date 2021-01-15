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
            v-show="rangeType === RANG_TYPE.city"
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
            v-show="rangeType === RANG_TYPE.brand"
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
              style="width: 388px"
              :maxTagCount="2"
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
          <!-- 公告标题 -->
          <a-form-item label="公告标题" v-bind="formCol" required>
            <a-input
              placeholder="设置公告标题"
              v-decorator="decorators.title"
              style="max-width: 388px"
            ></a-input>
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
            <a-form-item
              label="PC弹窗"
              v-bind="formCol"
              v-show="pcImageShow"
              required
            >
              <oa-image-upload
                isSaas
                v-decorator="decorators.pc_basemap"
                :numLimit="3"
              ></oa-image-upload>
            </a-form-item>
            <!-- APP弹窗 -->
            <a-form-item
              label="APP弹窗"
              v-bind="formCol"
              v-show="appImageShow"
              required
            >
              <oa-image-upload
                isSaas
                v-decorator="decorators.app_basemap"
                :numLimit="3"
              ></oa-image-upload>
            </a-form-item>
            <!-- APP启动页弹窗 -->
            <a-form-item
              label="APP启动页弹窗"
              v-bind="formCol"
              v-show="appImageShow"
            >
              <oa-image-upload
                isSaas
                v-decorator="decorators.app_start_basemap"
                :numLimit="3"
              ></oa-image-upload>
            </a-form-item>
            <!-- 活动详情链接 -->
            <a-form-item label="活动详情链接" v-bind="formCol">
              <a-input
                placeholder="请输入活动详情链接"
                v-decorator="decorators.pic_links"
                style="max-width: 388px"
              ></a-input>
            </a-form-item>
          </div>
          <!-- 短信内容 -->
          <a-form-item label="是否发短信" required v-bind="formCol">
            <oa-switch
              v-decorator="decorators.is_sms"
              @change="handleSmsStatusChange"
            />
          </a-form-item>
          <!-- 短信内容 -->
          <a-form-item
            label="短信内容"
            required
            v-bind="formCol"
            v-show="smsStatus"
          >
            <oa-textarea
              v-decorator="decorators.sms_content"
              placehloder="请输入短信内容"
              rows="3"
              style="max-width: 388px"
            ></oa-textarea>
          </a-form-item>
          <!-- 公告内容 -->
          <a-form-item
            label="公告内容"
            required
            v-bind="formCol"
            v-show="sendType !== SEND_TYPE.popup"
          >
            <editor
              v-decorator="decorators.content"
              serviceType="SASS"
              v-if="!getActivityDetail$loading"
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
        from="activity"
      ></admin-notice-preview>
    </oa-panel>
  </div>
</template>
<script>
import { systemRules, SEND_TYPE, RANG_TYPE } from './activity-edit#config'
import {
  getFormData,
  getActivityDetail,
  noticeAddActivity,
  noticeEditActivity,
  noticeGetBrands,
  noticeSendActivity
} from '@/api/notice'
import { get, map, debounce } from 'lodash-es'
import editor from 'oa-core/views/components/editor#/editor.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'activity-edit',
  components: { editor },
  bem: {
    b: 'activity-edit'
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
        pc_basemap: [],
        app_basemap: []
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
      id: '',
      isEdit: 0,
      fetching: false,
      is_all_version: 0, // 是否发送全版本
      rangeType: 1, // 发送范围 1.区域 2.品牌 3.全部品牌
      sendType: 2, // 发送类型 1 弹窗公告 2 系统公告
      targetType: [1], // 触达位置: 1 SaasPro 2 三体云管家
      start_at: '', // 弹窗有效期开始
      end_at: '', // 弹窗有效期截止
      smsStatus: 0, // 是否发送短信
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
      if (this.isEdit) return this.noticeEditActivity$loading
      else return this.noticeAddActivity$loading
    },
    systemRules,
    ...mapGetters('oa/base', ['regionTree'])
  },
  async: {
    getFormData() {
      return getFormData().then(res => {
        this.mapping = get(res, 'mapping')
      })
    },
    getActivityDetail(data) {
      return getActivityDetail(data)
    },
    noticeGetBrands(data) {
      return noticeGetBrands(data).then(res => {
        let list = res.list
        this.brand_searchresult = list
      })
    },
    noticeEditActivity(data) {
      return noticeEditActivity(data)
    },
    noticeAddActivity(data) {
      return noticeAddActivity(data)
    },
    noticeSendActivity(data) {
      return noticeSendActivity(data)
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
        this.getActivityDetail({
          id: this.id
        }).then(res => {
          this.form.setFieldsValue({
            version_id: res.version_ids,
            range: res.range,
            type: res.type,
            target: res.target,
            title: res.title,
            roles: res.role_level_ids,
            is_sms: res.is_sms
          })
          this.rangeType = res.range
          this.sendType = res.type
          this.targetType = res.target
          this.smsStatus = res.is_sms

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

          if (res.is_sms) {
            setTimeout(() => {
              this.form.setFieldsValue({
                sms_content: res.sms_content
              })
            }, 0)
          }
          // 判断发送类型
          if (this.sendType === SEND_TYPE.popup) {
            this.start_at = get(res.expire, 'start')
            this.end_at = get(res.expire, 'end')
            this.$nextTick(() => {
              this.form.setFieldsValue({
                pc_basemap: res.pc_basemap,
                app_basemap: res.app_basemap,
                app_start_basemap: res.app_start_basemap,
                pic_links: res.pic_links
              })
            })
          } else {
            this.form.setFieldsValue({
              content: res.content
            })
          }
        })
      } else {
        this.form.setFieldsValue({
          version_id: map(this.mapping.version_list, 'id'),
          range: 1,
          type: 2,
          target: [1],
          roles: 1,
          is_sms: 0
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
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().add(-1, 'days')
    },
    handleSendNotice() {
      let forceFields = []
      if (this.sendType === 1) {
        if (!this.start_at || !this.end_at) {
          this.$message.error('请选择弹窗有效期')
          return false
        }
        if (this.pcImageShow) {
          forceFields.push('pc_basemap')
        }
        if (this.appImageShow) {
          forceFields.push('app_basemap')
        }
      }
      this.form
        .validate({
          forceFields
        })
        .then(values => {
          console.log('handleSendNotice', values)
          let formData = {
            is_all_version: this.is_all_version,
            version_id: values.version_id, // 发送版本
            range: values.range, // 发送范围
            target: values.target, // 触达位置
            type: values.type, // 发送类型
            title: values.title, // 公告标题
            roles: values.roles, // 发送角色
            is_sms: values.is_sms,
            action: 1
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
            let pc_basemap = map(values.pc_basemap, 'key')
            let app_basemap = map(values.app_basemap, 'key')
            let app_start_basemap = map(values.app_start_basemap, 'key')
            formData = Object.assign(formData, {
              start_at: this.start_at,
              end_at: this.end_at,
              pc_basemap: pc_basemap,
              app_basemap: app_basemap,
              app_start_basemap: app_start_basemap,
              pic_links: values.pic_links
            })
          } else {
            formData = Object.assign(formData, {
              content: values.content
            })
          }
          if (this.smsStatus) {
            formData = Object.assign(formData, {
              sms_content: values.sms_content
            })
          }
          this.handleSubmit(formData).then(res => {
            let noticeId = res.id
            this.$message.success('公告保存成功')
            this.$modalRouter.push({
              name: 'notice-publish',
              props: { id: noticeId, from: 'activity' },
              on: {
                done: () => {
                  this.CLOSE_TAB(this.$route.name)
                  this.$router.replace({
                    name: 'notice-list-activity'
                  })
                },
                cancel: () => {
                  this.CLOSE_TAB(this.$route.name)
                  this.$router.replace({
                    name: 'notice-list-activity'
                  })
                }
              }
            })
          })
        })
    },
    handleSubmit(formData) {
      if (this.isEdit) {
        return this.noticeEditActivity(formData)
      } else {
        return this.noticeAddActivity(formData)
      }
    },
    handlePreview() {
      if (this.sendType === 2) {
        this.previewInfo = {
          version_id: this.form.getFieldValue('version_id'),
          brand_ids: this.brand_ids,
          roles: this.form.getFieldValue('roles'),
          content: this.form.getFieldValue('content')
        }
        this.$modalRouter.push({
          name: 'notice-scan',
          props: {
            previewInfo: this.previewInfo
          }
        })
      } else {
        this.previewInfo = {
          pc_basemap: this.form.getFieldValue('pc_basemap'),
          app_basemap: this.form.getFieldValue('app_basemap'),
          app_start_basemap: this.form.getFieldValue('app_start_basemap')
        }
        this.previewShow = true
      }
    },
    handleSmsStatusChange(e) {
      this.smsStatus = e
    },
    handleBrandSearch(keywords) {
      this.noticeGetBrands({
        keywords: keywords.trim() || ''
      })
    },
    handleBrandChange(brand_ids) {
      this.brand_ids = brand_ids
    },
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
  .ant-form-item-label {
    line-height: normal;
  }
  .ant-form-item-control {
    line-height: normal;
  }
}
</style>
<style lang="less" scoped>
.activity-edit {
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
