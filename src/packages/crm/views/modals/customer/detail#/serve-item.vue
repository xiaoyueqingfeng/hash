<template>
  <div class="serve-item">
    <div class="content">
      <div class="" v-for="serve in serveInfo" :key="serve.id">
        <a-timeline-item>
          <div class="title">
            <span>{{ serve.name }}</span>
            <span class="date light-grey">{{ serve.created_time }}</span>
          </div>
          <div class="contact light-grey">
            <p>
              <span>联系人:</span>
              <span>{{ serve.contact.name }}</span>
            </p>
            <p>
              <span>职位:</span>
              <span>{{ serve.contact.job }}</span>
            </p>
          </div>
          <div class="contact light-grey">
            <p>
              <span>服务时间:</span>
              <span>{{ serve.service_time }}</span>
            </p>
          </div>
          <div class="contact light-grey">
            <p>
              <span>服务类别:</span>
              <span>{{ serve.service_category_tip }}</span>
            </p>
          </div>
          <div class="contact light-grey" v-if="serve.duration">
            <p>
              <span>通话时长:</span>
              <span>{{ serve.duration }}</span>
            </p>
          </div>
          <div class="contact light-grey" v-if="serve.record_url">
            <p class="contact__row">
              <span>通话录音:</span>
              <audio :src="serve.record_url" controls></audio>
            </p>
          </div>
          <div class="contact">
            <div>{{ serve.detail }}</div>
          </div>
          <div class="record-list" v-if="serve.comment.length > 0">
            <p class="sub-title">评论</p>
            <div
              class="sub-content"
              v-for="item in serve.comment"
              :key="item.created_time"
            >
              <span class="light-grey margin-r16 display-inlineblock">
                {{ item.name }}
              </span>
              <span class="light-grey">{{ item.created_time }}</span>
              <div class="margin-t8 margin-b8">{{ item.detail }}</div>
            </div>
          </div>
          <div class="light-blue margin-t8" v-show="serve.comment.length < 10">
            <span class="pointer" @click="showTextarea(serve)">评论</span>
          </div>
          <div v-if="curId === serve.id" class="text-right">
            <a-textarea
              placeholder="请输入评论"
              class="margin-t8"
              v-model="textValue"
              :rows="4"
            />
            <a-button
              type="primary"
              class="margin-t8"
              @click.native="emitTextArea"
            >
              发布
            </a-button>
          </div>
        </a-timeline-item>
      </div>
      <div class="loading">
        <a-spin :spinning="isLoading" />
      </div>
      <div class="text-center" v-if="serveInfo.length === 0">
        <oa-empty></oa-empty>
      </div>
    </div>
  </div>
</template>

<script>
import addserveRecord from '@/views/fragments/serve-record'
export default {
  name: 'ServeItem',
  data() {
    return {
      isShowTextarea: false,
      curId: '', // 当前文本框id
      textValue: '',
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      }
    }
  },
  props: {
    serveInfo: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isLoading: function() {
      if (this.serveInfo) {
        return false
      }
      return true
    }
  },
  components: {
    addserveRecord
  },
  methods: {
    onChange(date, dateString) {},
    showTextarea(para) {
      this.curId = para.id
      this.textValue = ''
    },
    emitTextArea() {
      if (!this.textValue) {
        this.$message.warning('请输入评论内容')
        return
      }
      let para = {
        id: this.curId,
        detail: this.textValue
      }
      this.$emit('textValue', para)
      this.curId = ''
    }
  }
}
</script>
<style lang="less" scoped>
.serve-item {
  position: relative;
  .content {
    position: relative;
    .loading {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -14px;
      margin-left: -14px;
    }
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 14px;
      line-height: 1.5;
      color: #000;
      font-weight: 500;
      span {
        display: inline-block;
        margin-right: 5px;
      }
      .date {
      }
    }
    .tag {
      margin: 12px 0;
    }
    .record-list {
      p {
        margin: 0;
        padding: 0;
      }
      .sub-title {
        margin: 13px auto 13px 0;
        font-weight: 600;
        line-height: 22px;
      }
      .sub-content {
        span {
          line-height: 22px;
        }
      }
    }
    .contact {
      margin-top: 6px;
      &__row {
        width: 100% !important;
        display: flex !important;
        align-items: center;
      }
      p {
        margin: 0;
        padding: 0;
        width: 50%;
        display: inline-block;
        span {
          font-size: 14px;
          line-height: 22px;
        }
        span:first-child {
          margin-right: 8px;
        }
      }
    }
    .text-left {
      text-align: left;
    }
  }
}
</style>
