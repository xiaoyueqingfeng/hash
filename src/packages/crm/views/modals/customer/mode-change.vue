<template>
  <oa-modal
    title="变更运营模式"
    v-model="show"
    @ok="onSubmit"
    :width="580"
    :confirmLoading="handleChangeOpreationMode$loading"
  >
    <div class="work-mode-change">
      <a-row class="margin-b16">
        <div class="list-item">
          <div class="label">客户ID:</div>
          <div class="content">{{ customerData.id }}</div>
        </div>
      </a-row>
      <a-row class="margin-b16 complexList">
        <div class="list-item">
          <div class="label">客户名称:</div>
          <div class="content">{{ customerData.name }}</div>
        </div>
        <div class="list-item">
          <div class="label">当前模式:</div>
          <div class="content">{{ customerData.work_model_tip }}</div>
        </div>
      </a-row>
      <a-row class="margin-b16">
        <a-col class="list-item">
          <div class="label">选择运营模式:</div>
          <div class="content">
            <oa-select
              style="width:200px"
              :options="options"
              v-model="workMode"
            ></oa-select>
          </div>
        </a-col>
      </a-row>
      <a-row>
        <a-col>
          <div class="content">
            注: 客户签约后不可变更运营模式,需仔细确认.
          </div>
        </a-col>
      </a-row>
    </div>
  </oa-modal>
</template>

<script>
import { changeUserWorkModelInfo, changeUserWorkModel } from '@/api/potential'
import { get } from 'lodash-es'
export default {
  name: 'CustomerModeChange',

  components: {},

  props: {
    leads_id: {
      type: String
    }
  },

  data() {
    return {
      show: true,
      options: [
        {
          id: 1,
          name: '工作室'
        },
        {
          id: 99,
          name: '俱乐部'
        }
      ],
      workMode: undefined,
      customerData: {}
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  async: {
    init() {
      if (this.leads_id) {
        return changeUserWorkModelInfo({ leads_id: this.leads_id }).then(
          res => {
            this.customerData = res instanceof Object && res
            this.workMode = +get(res, 'work_model')
          }
        )
      }
    },
    handleChangeOpreationMode(query) {
      return changeUserWorkModel(query)
    }
  },

  methods: {
    onSubmit() {
      this.handleChangeOpreationMode({
        leads_id: this.leads_id,
        work_model: this.workMode
      }).then(res => {
        this.$message.success('保存成功')
        this.show = false
        this.$emit('done')
      })
    }
  }
}
</script>

<style scoped lang="less">
.work-mode-change {
  .complexList {
    display: flex;
    .list-item {
      margin-right: 8px;
    }
  }
  .list-item {
    display: flex;
    line-height: 32px;
    .label {
      margin-right: 8px;
    }
  }
}
</style>
