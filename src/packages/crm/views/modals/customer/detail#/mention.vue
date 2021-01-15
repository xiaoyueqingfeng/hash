<template>
  <div class="mention">
    <div
      class="text-right pointer"
      v-if="detail_auth['web/leads/detail_attention_add']"
    >
      <p
        class="light-blue "
        @click="isAddMentionVisible = !isAddMentionVisible"
      >
        {{ !isAddMentionVisible ? '添加注意事项' : '取消添加' }}
      </p>
    </div>
    <div v-if="isAddMentionVisible">
      <a-row>
        <a-form :form="form" @submit="onSubmit">
          <a-form-item
            label="注意事项"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            required
          >
            <a-textarea
              v-decorator="[
                'remark',
                { rules: [{ validator: checkDetailText }] }
              ]"
              placeholder="请输入不超过30字注意事项"
            ></a-textarea>
          </a-form-item>
          <a-form-item class="text-right">
            <a-button
              type="primary"
              class="margin-t8"
              @click="onSubmit"
              :loading="addDetailMentionInfo$loading"
            >
              发布
            </a-button>
          </a-form-item>
        </a-form>
      </a-row>
    </div>
    <detailMentionItem :mentionInfo="mentionData" />
    <div class="text-right margin-t16" v-if="mentionData.length > 0">
      <a-pagination
        simple
        :defaultCurrent="pagination.current"
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        @change="pageChange"
      />
    </div>
  </div>
</template>
<script>
import detailMentionItem from './mention-item'
import { getDetailMentionInfo, addDetailMentionInfo } from '@/api/leads'
export default {
  name: 'Mention',
  data() {
    return {
      mentionData: [],
      isAddMentionVisible: false,
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 5 // 每页数量
      },
      remark: '',
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }
    }
  },
  components: {
    detailMentionItem
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created() {
    this.getMentionInfo()
  },
  computed: {
    leads_id: function() {
      return this.$store.state.leads.leads_id
    },
    detail_auth: function() {
      return this.$store.state.leads.detail_auth
    }
  },
  methods: {
    checkDetailText(rule, value, callback) {
      if (!value || value.length > 30) {
        /* eslint-disable */
        callback('请输入不超过30字注意事项')
      } else {
        callback()
      }
    },
    getMentionInfo() {
      getDetailMentionInfo({
        leads_id: this.leads_id,
        p: this.pagination.current,
        ps: this.pagination.pageSize
      }).then(res => {
        this.mentionData = res.list instanceof Array && res.list
        this.pagination.total = res.pager.t
      })
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
        } else {
          this.addDetailMentionInfo({
            leads_id: this.leads_id,
            remark: fieldsValue.remark
          }).then(res => {
            this.isAddMentionVisible = false
            this.getMentionInfo()
          })
        }
      })
    },
    pageChange(p) {
      this.pagination.current = p
      this.getMentionInfo()
    }
  },
  async:{
    addDetailMentionInfo(para){
      return addDetailMentionInfo(para)
    }
  }
}
</script>
<style lang="less" scoped>
.mention {
  padding: 0 16px;

}
</style>
