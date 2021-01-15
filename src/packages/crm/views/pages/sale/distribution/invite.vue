<template>
  <div class="customer">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <a-input-search
        slot="prepend"
        enterButton
        @search="tbOnSearchKeywords('keywords', $event)"
        v-model="$searchQuery.keywords"
        placeholder="搜索推荐人姓名、手机号"
      ></a-input-search>
      <template slot="actions">
        <oa-button @click="tbOnFilterSearch('keywords')" type="primary">
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
      <oa-select
        :options="selects.is_signing"
        placeholder="是否签约"
        v-model="$searchQuery.is_signing"
      ></oa-select>
      <oa-select
        :options="selects.is_open_system"
        placeholder="是否开通系统"
        v-model="$searchQuery.is_open_system"
      ></oa-select>
      <crm-region-picker
        :province-id.sync="$searchQuery.province_id"
        :city-id.sync="$searchQuery.city_id"
      ></crm-region-picker>
    </oa-filter-box>
    <oa-table
      class="mg-t16"
      :columns="tableOptions.columns"
      rowKey="id"
      :scroll="{ x: 1400 }"
      :loading="getInviteList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="dataSource"
    >
      <span slot="city_name" slot-scope="record">
        {{ record.province + record.city }}
      </span>
      <span slot="repeat_validate" slot-scope="record">
        <crm-table-column-custom-repeat-validate
          :record="record"
        ></crm-table-column-custom-repeat-validate>
      </span>
      <span slot="invalid_reason" slot-scope="record">
        <a-tooltip v-if="record.status === '0'" placement="topLeft">
          <template slot="title">
            {{ record.invalid_reason }}
          </template>
          <span>{{ record.status_desc }}</span>
        </a-tooltip>
        <span v-else>{{ record.status_desc }}</span>
      </span>
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            v-if="record.auth_area['web/invite/set-invalid']"
            v-modal-link="{
              name: 'distribution-invite-invalid',
              props: {
                id: record.id,
                customerName: record.leads_apply_username
              },
              on: {
                done: getInviteList
              }
            }"
          >
            无效
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>
<script>
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './invite#config'
import { inviteList } from '@/api/invite'
export default {
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      },
      selects: {
        is_signing: [],
        is_open_system: []
      }
    }
  },
  created() {
    this.getInviteList()
  },
  async: {
    getInviteList() {
      return inviteList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = get(res, 'pager')
        this.selects.is_signing = get(res, 'is_signing', [])
        this.selects.is_open_system = get(res, 'is_open_system', [])
      })
    }
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getInviteList()
    }
  },
  computed: {
    tableOptions
  }
}
</script>
<style lang="less" scoped>
.customer {
}
</style>
