<template>
  <oa-modal
    v-model="show"
    :title="isEdit ? '编辑关联POS机' : '查看关联POS机'"
    width="1200px"
  >
    <div class="operate-relevance-pos__header">
      <div class="mg-r16">品牌：{{ info.brand_name }}</div>
      <div>商户号：{{ info.mch_id }}</div>
    </div>
    <oa-table
      :rowKey="record => record.terminal_id"
      :columns="tableOptions.columns"
      :dataSource="dataSource"
      :pager="false"
      :scroll="{ x: 1000 }"
      class="operate-relevance-pos__table"
    >
      <template slot="appid" slot-scope="record">
        <a-input
          style="margin: -5px 0"
          :value="record.app_id"
          v-if="isEdit"
          @change="e => handleChangeAppid(e, record)"
        />
        <div v-else>
          {{ record.app_id }}
        </div>
      </template>
      <template slot="license" slot-scope="record">
        <a-input
          style="margin: -5px 0"
          :value="record.license"
          v-if="isEdit"
          @change="e => handleChangeLicense(e, record)"
        />
        <div v-else>
          {{ record.license }}
        </div>
      </template>
    </oa-table>
    <template slot="footer">
      <a-button type="primary" @click="handleBatchDetection">
        检测可用状态
      </a-button>
      <a-button type="primary" @click="onSubmit" class="mg-l16" v-if="isEdit">
        保存
      </a-button>
    </template>
  </oa-modal>
</template>

<script>
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './operate-relevance-pos#config'
import { get } from 'lodash-es'
import { posTerminalDetail, posTerminalEdit, posTerminalTouch } from '@/api/pos'
export default {
  mixins: [tableMixins],
  props: {
    leads_id: {
      type: [Number, String]
    },
    isEdit: {}
  },
  data() {
    return {
      show: false,
      dataSource: [],
      info: {}
    }
  },
  computed: {
    tableOptions
  },
  async: {
    posTerminalDetail() {
      return posTerminalDetail({ leads_id: this.leads_id }).then(res => {
        this.dataSource = get(res.list, 'terminal_list', [])
        this.info = get(res, 'list', {})
      })
    },
    posTerminalEdit(data) {
      return posTerminalEdit(data)
    },
    posTerminalTouch(data) {
      return posTerminalTouch(data)
    }
  },
  mounted() {
    this.posTerminalDetail({
      leads_id: this.leads_id
    })
  },
  methods: {
    handleChangeAppid(e, record) {
      let appid = e.target.value
      this.dataSource = this.dataSource.map(i => {
        if (i.terminal_id === record.terminal_id) {
          i.app_id = appid
        }
        return i
      })
    },
    handleChangeLicense(e, record) {
      let license = e.target.value
      this.dataSource = this.dataSource.map(i => {
        if (i.terminal_id === record.terminal_id) {
          i.license = license
        }
        return i
      })
    },
    onSubmit() {
      this.posTerminalEdit({
        leads_id: this.leads_id,
        terminal_list: this.dataSource
      }).then(res => {
        this.$message.success({
          content: '保存成功'
        })
        this.$emit('done')
        this.show = false
      })
    },
    handleBatchDetection() {
      this.dataSource.map(async item => {
        await this.handleDetection(item.terminal_id)
      })
    },
    handleDetection(terminal_id) {
      this.posTerminalTouch({
        terminal_id
      }).then(res => {
        this.dataSource = this.dataSource.map(item => {
          if (item.terminal_id === terminal_id) {
            item.status = res.info.status
            item.status_desc = item.status === 1 ? '可用' : '不可用'
          }
          return item
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tip {
  height: 40px;
  line-height: 40px;
  margin-bottom: 16px;
  padding: 0 8px;
  background: rgba(255, 251, 230, 1);
  border-radius: 0px 0px 4px 4px;
}
.operate-relevance-pos {
  &__header {
    display: flex;
    padding: 8px 0;
  }
}
.operate-relevance-pos__table {
  /deep/ .ant-table {
    .ant-table-body {
      .ant-table-tbody {
        .ant-table-row {
          padding: 4px 0;
        }
      }
    }
  }
}
</style>
