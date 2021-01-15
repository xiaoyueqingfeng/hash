<template>
  <oa-panel app>
    <div class="mina-header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <template slot="prepend">
          <a-input
            v-model="$searchQuery.leads_id"
            placeholder="搜索客户id"
            class="mg-r8"
            style="width: 250px"
          ></a-input>
          <a-input
            class="mg-r8"
            v-model="$searchQuery.leads_name"
            placeholder="搜索客户名称"
            style="width: 250px"
          ></a-input>
          <oa-button @click="handleOnSearch" type="primary">
            查询
          </oa-button>
        </template>
        <oa-select
          class="mg-r8"
          style="width: 160px"
          :options="bind_mch"
          placeholder="选择支付配置情况"
          v-model="$searchQuery.bind_mch"
        ></oa-select>
        <oa-select
          class="mg-r8"
          :options="send_status"
          placeholder="选择发布状态"
          v-model="$searchQuery.send_status"
        ></oa-select>
        <template slot="actions">
          <oa-button
            @click="tbOnFilterSearch('keywords', $event)"
            type="primary"
          >
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>
      </oa-filter-box>
    </div>
    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a
          href="javascript:;"
          v-if="selectedRowKeys.length"
          @click="tbOnSelectionReset"
        >
          清空
        </a>
        <a
          v-if="selectedRowKeys.length && auth_area['web/applet/audit']"
          href="javascript:;"
          @click="handleBatchAudit"
        >
          批量提交审核
        </a>
        <a
          v-if="auth_area['web/applet/audit_all']"
          href="javascript:;"
          @click="handleAllAudit"
        >
          全量提交审核
        </a>
      </span>
    </oa-alert-intro>

    <oa-table
      class="mg-t16"
      rowKey="leads_id"
      :columns="tableOptions.columns"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      :dataSource="dataSource"
      :pager="pager"
      :loading="getMinaList$loading"
      @change="tbOnTableNoClearSelectChange"
    >
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a href="javascript:;" @click="handleCheckQrcode(record.qrcode_url)">
            查看二维码
          </a>
          <a-popconfirm
            title="你确定要提交审核吗?"
            @confirm="doVerify(record.leads_id)"
            v-if="record.auth_area['web/applet/audit']"
          >
            <a href="javascript:;">提交审核</a>
          </a-popconfirm>
        </oa-table-actions>
      </div>
    </oa-table>
  </oa-panel>
</template>
<script>
import { tableOptions } from './mina#config'
import tableMixins from 'oa-core/mixins/table'
import { getMinaList, batchAuditMina } from '@/api/applet'
export default {
  mixins: [tableMixins],
  data() {
    return {
      send_status: [],
      bind_mch: [],
      dataSource: [],
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      }
    }
  },
  async: {
    getMinaList() {
      return getMinaList(this.$searchQuery).then(res => {
        this.send_status = res.send_status
        this.bind_mch = res.bind_mch
        this.pager = res.pager
        this.dataSource = res.list
        this.auth_area = res.auth_area
      })
    },
    batchAuditMina(data) {
      return batchAuditMina(data)
    }
  },
  created() {
    this.getMinaList()
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getMinaList()
    }
  },
  computed: {
    tableOptions
  },
  methods: {
    handleOnSearch() {
      // 搜索
      this.$router.push({
        query: {
          leads_id: this.$searchQuery.leads_id,
          leads_name: this.$searchQuery.leads_name
        }
      })
      this.selectedRowKeys = []
    },
    doVerify(id) {
      console.log('id', id)
      this.batchAuditMina({
        audit_type: 1, // 审核类型 单个 1 批量 2
        leads_ids: [id]
      }).then(res => {
        this.$message.success('审核提交成功')
      })
    },
    handleCheckQrcode(qrcode) {
      this.$modalRouter.push({
        name: 'mina-check-qrcode',
        props: {
          qrcode
        }
      })
    },
    handleBatchAudit() {
      this.$modalRouter.push({
        name: 'mina-batch-audit',
        props: {
          leads_ids: this.selectedRowKeys,
          total: this.selectedRowKeys.length
        },
        on: {
          done: this.getMinaList
        }
      })
    },
    handleAllAudit() {
      this.$modalRouter.push({
        name: 'mina-all-audit',
        props: {
          leads_id: this.$searchQuery.leads_id,
          leads_name: this.$searchQuery.leads_name,
          send_status: this.$searchQuery.send_status,
          bind_mch: this.$searchQuery.bind_mch,
          total: this.pager.t
        },
        on: {
          done: this.getMinaList
        }
      })
    }
  }
}
</script>
