<template>
  <div class="serve-item">
    <div class="serve-item__head">
      <div class="serve-item__head--column">
        <div>
          <span class="label">跟进客运:</span>
          <span class="val">
            {{ serveContentItem.custom_operation_server_name }}
          </span>
        </div>
        <div>
          <span class="label">跟进客续:</span>
          <span class="val">
            {{ serveContentItem.custom_renew_server_name }}
          </span>
        </div>
        <div>
          <span class="label">客户等级:</span>
          <span class="val">{{ serveContentItem.brand_level_tip }}</span>
        </div>
      </div>

      <div class="serve-item__head--column">
        <div>
          <span class="label">区域:</span>
          <span class="val">{{ city }}</span>
        </div>
        <div>
          <span class="label">渠道来源:</span>
          <span class="val">{{ channel }}</span>
        </div>
        <div>
          <span class="label">运营模式:</span>
          <span class="val">{{ serveContentItem.work_model_tip }}</span>
        </div>
      </div>

      <div class="serve-item__head--column">
        <div>
          <span class="label">创建时间:</span>
          <span class="val">{{ serveContentItem.brand_created_time }}</span>
        </div>
      </div>
    </div>
    <div class="serve-item__content">
      <div class="serve-item__content-title">
        <span class="name">
          {{ serveContentItem.leads_name }}
          <a-tag class="margin-l8">
            {{ serveContentItem.service_type_tip }}
          </a-tag>
        </span>
        <!-- <span class="time">{{serveContentItem.created_time}}</span> -->
      </div>
      <div class="serve-item__content-contact" v-if="serveContentItem.contact">
        <span>联系人:</span>
        <span
          class="val"
          v-if="Object.keys(serveContentItem.contact).length > 0"
        >
          {{ serveContentItem.contact.name }}
        </span>
        <span>服务类别:</span>
        <!-- 字段有修改service_category_tip -->
        <span class="val">{{ serveContentItem.service_category_tip }}</span>
        <span>服务时间:</span>
        <span class="val">{{ serveContentItem.service_time }}</span>
      </div>
      <p class="mg-t8 serveContentItem">
        <span class="mg-r8">通话时长:</span>
        <span>{{ serveContentItem.duration }}</span>
      </p>
      <p class="mg-t8 serveContentItem">
        <span class="mg-r8">通话录音:</span>
        <audio :src="serveContentItem.record_url" controls></audio>
      </p>
      <p class="mg-t8">{{ serveContentItem.detail }}</p>
      <p>
        <span>附件:</span>
        <a
          class="mg-l8"
          target="_blank"
          style="word-break: break-all;"
          :href="serveContentItem.enclosure"
        >
          {{
            serveContentItem.enclosure &&
              serveContentItem.enclosure
                | enclosureFilter(serveContentItem.enclosure)
          }}
        </a>
      </p>
      <div class="serve-item__content-comment">
        <div class="title">评论</div>
        <a-row
          :gutter="24"
          class="margin-b8"
          v-show="
            serveContentItem.comment && serveContentItem.comment.length < 10
          "
        >
          <a-col :span="21">
            <a-input
              placeholder="请输入评论"
              class="margin-t8"
              v-model="commentText"
              val="serveContentItem.id"
            />
          </a-col>
          <a-col :span="3">
            <a-button
              type="primary"
              class="margin-t8"
              @click.native="addCommentData(serveContentItem.id)"
              :disabled="commentText.length === 0"
            >
              评论
            </a-button>
          </a-col>
        </a-row>
        <div
          v-for="item in serveContentItem.comment"
          :key="item.id"
          class="margin-t16"
        >
          <comment :commentInfo="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comment from '../follow#/comment'
import accompany from '../follow#/accompany'
import { enclosureFilter } from 'oa-core/filters/resource.filters'
export default {
  name: 'ServeContentItem',
  data() {
    return {
      accompanyText: '',
      commentText: '' // 评论内容
    }
  },
  props: {
    serveContentItem: {
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
      if (!this.serveContentItem.id) return ''
      return `${this.serveContentItem.channel_level1_tip} - ${
        this.serveContentItem.channel_level2_tip
      }`
    },
    city() {
      if (!this.serveContentItem.id) return ''
      return `${this.serveContentItem.province_tip}-${
        this.serveContentItem.city_tip
      }-${this.serveContentItem.area_tip}`
    }
  },
  created() {},
  methods: {
    addCommentData(val) {
      if (!this.commentText) {
        this.$message.warning('请输入评论')
        return
      }
      let params = {
        service_record_id: val,
        detail: this.commentText
      }
      this.$emit('sendComment', params)
      this.commentText = ''
    },
    enclosureFilter(val) {
      return enclosureFilter(val)
    }
  }
}
</script>
<style lang="less" scoped>
.serve-item {
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
        .mg-r(14px);
        font-size: 20px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 28px;
      }
      .time {
        font-size: 14px;
        font-family: HelveticaNeue;
        color: rgba(0, 0, 0, 0.25);
      }
    }
    &-comment {
      padding: 16px 16px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 4px;
      .title {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
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
.serveContentItem {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
}
</style>
