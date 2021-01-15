<template>
  <div class="visit-item">
    <div class="content">
      <div class v-for="visit in visitInfo" :key="visit.id">
        <a-timeline-item>
          <div class="title">
            <span>{{ visit.name }}</span>
            <span class="date light-grey">{{ visit.visit_time }}</span>
          </div>
          <div class="tag">
            <a-tag>{{ visit.model_tip }}</a-tag>
            <a-tag>{{ visit.schedule_tip }}</a-tag>

            <a-tag
              :color="visit.type_tip === '有效拜访' ? 'green' : 'red'"
              class="pull-right"
            >
              {{ visit.type_tip }}
            </a-tag>
            <a-tag v-if="visit.hardware_tip" class="pull-right">
              {{ visit.hardware_tip }}
            </a-tag>
          </div>
          <div class="contact light-grey">
            <p>
              <span>联系人:</span>
              <span>{{ visit.contact.name }}</span>
            </p>
            <p>
              <span>职位:</span>
              <span>{{ visit.contact.job }}</span>
            </p>
          </div>
          <div class>{{ visit.detail }}</div>
          <div class="contact">
            <!-- <p>{{visit.detail}}</p> -->
          </div>
          <div class="contact light-grey" v-if="visit.duration">
            <p>
              <span>通话时长:</span>
              <span>{{ visit.duration }}</span>
            </p>
          </div>
          <div class="contact light-grey" v-if="visit.record_url">
            <p>
              <span>通话录音:</span>
              <audio :src="visit.record_url" controls></audio>
            </p>
          </div>
          <div class="record-list">
            <p class="sub-title" v-if="visit.accompany.length > 0">陪访记录</p>
            <div
              class="sub-content"
              v-for="item in visit.accompany"
              :key="item.created_time"
            >
              <span class="light-grey margin-r16 display-inlineblock">
                {{ item.name }}
              </span>
              <span class="light-grey">{{ item.created_time }}</span>
              <div class="margin-t8 margin-b8">{{ item.detail }}</div>
            </div>
            <p class="sub-title" v-if="visit.comment.length > 0">评论</p>
            <div
              class="sub-content"
              v-for="item in visit.comment"
              :key="item.created_time"
            >
              <span class="light-grey margin-r16 display-inlineblock">
                {{ item.name }}
              </span>
              <span class="light-grey">{{ item.created_time }}</span>
              <div class="margin-t8 margin-b8">{{ item.detail }}</div>
            </div>
          </div>
          <div class="light-blue margin-t8">
            <span
              v-show="visit.accompany.length < 10"
              class="pointer"
              @click="showTextarea({ label: 'accompany', id: visit.id })"
            >
              陪访
            </span>
            <span
              v-if="visit.accompany.length < 10 && visit.comment.length < 10"
              class="margin-l8 margin-r8"
              style="color:rgba(0,0,0,0.25)"
            >
              |
            </span>
            <span
              v-show="visit.comment.length < 10"
              class="pointer"
              @click="showTextarea({ label: 'comment', id: visit.id })"
            >
              评论
            </span>
          </div>
          <div v-if="curId === visit.id && isShowTextarea" class="text-right">
            <a-textarea
              :placeholder="
                curLabel === 'accompany' ? '请输入陪访内容' : '请输入评论'
              "
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
      <div class="text-center" v-if="visitInfo.length === 0">
        <oa-empty></oa-empty>
      </div>
    </div>
  </div>
</template>

<script>
import addVisitRecord from '@/views/fragments/visit-record'
export default {
  name: 'VisitItem',
  data() {
    return {
      isShowTextarea: true,
      curId: '', // 当前文本框id
      curLabel: '',
      textValue: '',
      formItemLayout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      }
    }
  },
  props: {
    visitInfo: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    addVisitRecord
  },
  created() {},
  computed: {
    isLoading: function() {
      if (this.visitInfo) {
        return false
      }
      return true
    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString)
    },
    showTextarea(para) {
      this.curId = para.id
      this.curLabel = para.label
      this.textValue = ''
    },
    emitTextArea() {
      if (!this.textValue) {
        this.$message.warning('请输入内容')
        return
      }
      let para = {
        visit_record_id: this.curId,
        detail: this.textValue,
        curLabel: this.curLabel
      }
      this.$emit('textValue', para)
      this.curId = ''
    }
  }
}
</script>
<style lang="less" scoped>
.visit-item {
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
