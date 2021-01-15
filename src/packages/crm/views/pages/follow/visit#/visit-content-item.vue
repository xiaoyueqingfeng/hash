<template>
  <div class="visit-item">
    <div class="visit-item__head">
      <div class="visit-item__head--column">
        <div>
          <span class="label">跟进销售:</span>
          <span class="val">{{ visitContentItem.name }}</span>
        </div>
        <div>
          <span class="label">运营模式:</span>
          <span class="val">{{ visitContentItem.work_model_tip }}</span>
        </div>
        <div>
          <span class="label">客户等级:</span>
          <span class="val">{{ visitContentItem.brand_level_tip }}</span>
        </div>
      </div>

      <div class="visit-item__head--column">
        <div>
          <span class="label">区域:</span>
          <span v-if="visitContentItem.id" class="val">{{ city }}</span>
        </div>
        <div>
          <span class="label">渠道来源:</span>
          <span class="val">{{ channel }}</span>
        </div>
        <div>
          <span class="label">创建时间:</span>
          <span class="val">{{ visitContentItem.brand_created_time }}</span>
        </div>
      </div>
    </div>
    <div class="visit-item__content">
      <div class="visit-item__content-title">
        <div>
          <span class="name">{{ visitContentItem.leads_name }}</span>
          <a-tag class="tag" v-if="visitContentItem.hardware_tip">
            {{ visitContentItem.hardware_tip }}
          </a-tag>
          <a-tag class="tag" v-if="visitContentItem.role_type === '11'">
            {{ visitContentItem.sale_type_tip }}
          </a-tag>
          <a-tag
            v-if="visitContentItem.type_tip"
            class="tag"
            :color="visitContentItem.type_tip === '有效拜访' ? 'green' : 'red'"
          >
            {{ visitContentItem.type_tip }}
          </a-tag>
          <span class="val">{{ visitContentItem.model_tip }}</span>
          <span class="divider">|</span>
          <span class="val">{{ visitContentItem.schedule_tip }}</span>
        </div>
        <!-- <span class="time">{{visitContentItem.created_time}}</span> -->
      </div>
      <div class="visit-item__content-contact" v-if="visitContentItem.contact">
        <span>联系人:</span>
        <span
          class="val"
          v-if="Object.keys(visitContentItem.contact).length > 0"
        >
          {{ visitContentItem.contact.name }}
        </span>
        <span>职位:</span>
        <span class="val">{{ visitContentItem.contact.job }}</span>
        <span>拜访时间:</span>
        <span>{{ visitContentItem.visit_time }}</span>
        <span>第{{ visitContentItem.visit_num }}次拜访</span>
        <a-tooltip placement="topLeft">
          <a-icon type="info-circle" />
          <template slot="title">
            <span>当前跟进人对该客户拜访跟进次数</span>
          </template>
        </a-tooltip>
      </div>
      <p class="margin-t8">{{ visitContentItem.detail }}</p>
      <p class="mg-t8 visitContentItem">
        <span class="mg-r8">通话时长:</span>
        <span>{{ visitContentItem.duration }}</span>
      </p>
      <p class="mg-t8 visitContentItem">
        <span class="mg-r8">通话录音:</span>
        <audio :src="visitContentItem.record_url" controls></audio>
      </p>
      <div class="visit-item__content-comment">
        <span
          class="title"
          :class="isShowAccompany ? 'active' : ''"
          @click="isShowAccompany = true"
        >
          陪访
        </span>
        <span
          class="title"
          :class="!isShowAccompany ? 'active' : ''"
          @click="isShowAccompany = false"
        >
          评论
        </span>
        <div v-if="isShowAccompany">
          <a-row
            :gutter="24"
            class="margin-b8"
            v-show="
              visitContentItem.accompany &&
                visitContentItem.accompany.length < 10
            "
          >
            <a-col :span="20">
              <a-input
                placeholder="请输入陪访内容"
                class="margin-t8"
                v-model="accompanyText"
              />
            </a-col>
            <a-col :span="3">
              <a-button
                type="primary"
                class="margin-t8"
                @click.native="addAccompanyData(visitContentItem.id)"
                :disabled="accompanyText.length === 0"
              >
                发布
              </a-button>
            </a-col>
          </a-row>
          <div
            v-for="item in visitContentItem.accompany"
            :key="item.id"
            class="margin-t16"
          >
            <accompany :accompanyInfo="item" />
          </div>
        </div>
        <div v-else>
          <a-row
            :gutter="24"
            class="margin-b8"
            v-show="
              visitContentItem.comment && visitContentItem.comment.length < 10
            "
          >
            <a-col :span="20">
              <a-input
                placeholder="请输入评论"
                class="margin-t8"
                v-model="commentText"
                val="visitContentItem.id"
              />
            </a-col>
            <a-col :span="3">
              <a-button
                type="primary"
                class="margin-t8"
                @click.native="addCommentData(visitContentItem.id)"
                :disabled="commentText.length === 0"
              >
                发布
              </a-button>
            </a-col>
          </a-row>
          <div
            v-for="item in visitContentItem.comment"
            :key="item.id"
            class="margin-t16"
          >
            <comment :commentInfo="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comment from '../follow#/comment'
import accompany from '../follow#/accompany'
export default {
  name: 'VisitContentItem',
  data() {
    return {
      accompanyText: '',
      commentText: '', // 评论内容
      isShowAccompany: true
    }
  },
  props: {
    visitContentItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    comment,
    accompany
  },
  computed: {
    channel() {
      if (!this.visitContentItem.id) return ''
      return `${this.visitContentItem.channel_level1_tip} - ${
        this.visitContentItem.channel_level2_tip
      }`
    },
    city() {
      if (!this.visitContentItem.id) return ''
      return `${this.visitContentItem.province_tip}-${
        this.visitContentItem.city_tip
      }-${this.visitContentItem.area_tip}`
    }
  },
  created() {},
  methods: {
    addAccompanyData(val) {
      if (!this.accompanyText) {
        this.$message.warning('请输入陪访记录')
        return
      }
      let params = {
        visit_record_id: val,
        detail: this.accompanyText
      }
      this.$emit('sendAccompany', params)
      this.accompanyText = ''
    },
    addCommentData(val) {
      if (!this.commentText) {
        this.$message.warning('请输入评论')
        return
      }
      let params = {
        visit_record_id: val,
        detail: this.commentText
      }
      this.$emit('sendComment', params)
      this.commentText = ''
    },
    callback() {}
  }
}
</script>
<style lang="less">
.visit-item {
  &__head {
    padding: 24px;
    &--column {
      width: 100%;
      display: flex;
      &:first-child {
        .mg-b(16px);
      }
      div {
        width: 33%;
        display: inline-block;
        .label {
          display: inline-block;
          margin-right: 8px;
          color: rgba(0, 0, 0, 0.65);
        }
        .val {
          color: #000;
        }
      }
    }
    border: 1px solid #f5f5f5;
  }
  &__content {
    padding: 15px 24px;
    &-title {
      display: flex;
      justify-content: space-between;
      .mg-b(16px);
      .name {
        display: inline-block;
        .mg-r(16px);
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
      .divider {
        display: inline-block;
        margin: 0 4px;
      }
      .tag {
        position: relative;
        top: -3px;
        margin: 0 24px 0 0;
      }
      .time {
        font-size: 14px;
        font-family: HelveticaNeue;
        color: rgba(0, 0, 0, 0.25);
      }
      .val {
        color: rgba(0, 0, 0, 0.45);
      }
    }
    &-comment {
      padding: 16px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      .title {
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.45);
        &:first-child {
          margin-right: 32px;
        }
      }
      .active {
        color: rgba(0, 0, 0, 0.85);
        position: relative;
        margin-bottom: 8px;
        &:after {
          content: ' ';
          width: 20px;
          height: 3px;
          background: #1890ff;
          position: absolute;
          border-radius: 2px;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%); //居中处理
        }
      }
    }
    &-contact {
      span {
        display: inline-block;
        margin-right: 8px;
        color: rgba(0, 0, 0, 0.45);
      }
      .val {
        .mg-r(16px);
      }
    }
  }
}

.visitContentItem {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
}
</style>
