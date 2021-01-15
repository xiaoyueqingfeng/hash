<template>
  <div class="agent">
    <div class="agent__header">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          @search="tbOnSearchKeywords('keywords', $event)"
          v-model="$searchQuery.keywords"
          placeholder="搜索合伙人姓名、手机号"
        ></a-input-search>
        <template slot="actions">
          <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>
        <crm-region-picker
          :province-id.sync="$searchQuery.province_id"
          :city-id.sync="$searchQuery.city_id"
        ></crm-region-picker>
      </oa-filter-box>
      <div>
        <a-button
          v-if="auth_area['web/agent/invite']"
          type="primary"
          @click="inviteAgent()"
        >
          邀请合伙人
        </a-button>
      </div>
    </div>

    <oa-table
      class="mg-t16"
      :columns="tableOptions.columns"
      rowKey="id"
      :loading="getAgentList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="dataSource"
      :scroll="{ x: 1400 }"
    >
      <span slot="city_name" slot-scope="record">
        {{ record.province + record.city }}
      </span>

      <template slot="detail" slot-scope="text, record">
        <oa-overflow-text maxWidth="10em" :title="record.name">
          <a
            v-modal-link="{
              name: 'distribution-agent-detail',
              props: { id: record.id }
            }"
          >
            {{ record.name }}
          </a>
        </oa-overflow-text>
      </template>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/agent/edit']"
            v-modal-link="{
              name: 'distribution-agent-invite',
              props: {
                id: record.id,
                customerName: record.name,
                isEdit: true
              },
              on: {
                done: getAgentList
              }
            }"
          >
            编辑
          </a>
          <a
            v-if="record.auth_area['web/agent/share-link']"
            v-modal-link="{
              name: 'distribution-agent-share',
              props: { id: record.id }
            }"
          >
            分享链接
          </a>
          <a
            v-if="record.auth_area['web/agent/bank-account-detail']"
            v-modal-link="{
              name: 'distribution-agent-account',
              props: {
                id: record.id
              }
            }"
          >
            账户
          </a>
          <a
            v-if="record.auth_area['web/agent/disable']"
            @click="disabledAgent(record.id)"
          >
            禁用
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './agent#config'
import { getAgentList, agentDisabled } from '@/api/agent'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      },
      auth_area: {}
    }
  },
  async: {
    getAgentList() {
      return getAgentList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.auth_area = get(res, 'auth_area', {})
        this.pager = get(res, 'pager')
      })
    },
    //禁用
    agentDisabled(id) {
      return agentDisabled({ id: id })
    }
  },
  created() {
    this.getAgentList()
  },
  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getAgentList()
    }
  },
  methods: {
    //邀请合伙人
    inviteAgent() {
      this.$modalRouter.push({
        name: 'distribution-agent-invite',
        on: {
          done: this.getAgentList
        }
      })
    },
    //禁用合伙人
    disabledAgent(id) {
      this.$confirm({
        title: '是否禁用合伙人？',
        content: '禁用后合伙人将无法登录分销系统',
        comfirmLoading: this.disabledAgent$lodaing,
        onOk: () => {
          this.agentDisabled(id).then(res => {
            this.$message.success('禁用成功')
            this.getAgentList()
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.agent {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
