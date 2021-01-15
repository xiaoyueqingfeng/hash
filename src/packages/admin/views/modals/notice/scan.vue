<template>
  <oa-modal v-model="show" title="查看公告" :class="b()" :footer="null">
    <div :class="b('info')">
      <div class="item">
        <span class="label">发送版本:</span>
        <span>{{ version_str }}</span>
      </div>
      <!-- <div class="item">
        <span class="label">发送品牌:</span>
        <span>共{{ brand_str }}家</span>
      </div> -->
      <div class="item">
        <span class="label">发送角色:</span>
        <span>{{ role_str }}</span>
      </div>
    </div>
    <!-- <div :class="b('detail')" v-html="content"></div> -->
    <div :class="b('detail')">
      <div class="mg-b16" :class="b('detail-title')">{{ title }}</div>
      <!-- <div class="mg-b24" :class="b('detail-img')">
        <img :src="info.full_path" alt="" />
      </div> -->
      <div :class="b('detail-content')" v-html="content"></div>
    </div>
  </oa-modal>
</template>

<script>
import { getFormData, getSystemDetail, getActivityDetail } from '@/api/notice'
import { get } from 'lodash-es'
export default {
  data() {
    return {
      mapping: {},
      show: true,
      title: '',
      content: '',
      version_str: '',
      // brand_str: '',
      role_str: ''
    }
  },
  bem: {
    b: 'notice-scan'
  },
  props: {
    id: {
      type: Number
    },
    from: {
      type: String //数据域不同，分为系统公告和活动公告
    },
    previewInfo: {
      type: Object,
      default: () => {}
    }
  },
  async: {
    getFormData() {
      return getFormData().then(res => {
        console.log('getFormData', res)
        this.mapping = res.mapping
      })
    },
    getDeatail() {
      let data = {
        id: this.id
      }
      switch (this.from) {
        case 'system':
          return getSystemDetail(data)
        case 'activity':
          return getActivityDetail(data)
      }
    }
  },
  computed: {
    version_list() {
      return get(this.mapping, 'version_list', [])
    },
    send_role() {
      return get(this.mapping, 'send_role', [])
    }
  },
  created() {
    this.getFormData().then(res => {
      console.log('this.id', this.id)
      if (this.id) {
        this.getDeatail().then(res => {
          // let brand_ids = get(res.range_data, 'brand_ids', [])
          // this.brand_str = brand_ids.length
          this.title = res.title
          this.content = res.content
          this.handleTransformVersion(res.version_ids)
          this.handleTransformRole(res.role_level_ids)
        })
      } else {
        // let brand_ids = get(this.previewInfo, 'brand_ids', [])
        // this.brand_str = brand_ids && brand_ids.length

        let version_id = get(this.previewInfo, 'version_id', [])
        let roles = get(this.previewInfo, 'roles', [])

        this.title = get(this.previewInfo, 'title')
        this.content = get(this.previewInfo, 'content')
        this.handleTransformVersion(version_id)
        this.handleTransformRole(roles)
      }
    })
  },
  methods: {
    handleTransformVersion(version_id) {
      let version_str = []
      version_id.map(id => {
        let version = this.version_list.filter(version => version.id === id)
        if (version.length) version_str.push(version[0]['name'])
      })
      this.version_str = version_str.join(',')
    },
    handleTransformRole(role_level_ids) {
      let role = this.send_role.filter(r => r.id === role_level_ids)
      let roleName = role.length ? role[0]['name'] : ''
      this.role_str = roleName
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  height: 22px;
  line-height: 22px;
  font-size: 14px;
  margin-bottom: 16px;
  .label {
    display: inline-block;
    margin-right: 8px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .val {
    color: rgba(0, 0, 0, 0.65);
  }
}
.notice-scan {
  &__detail {
    padding: 16px;
    height: 398px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  &__detail-title {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    text-align: center;
  }
  &__detail-content {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 20px;
  }
}
</style>
