<template>
  <div class="software">
    <oa-filter-box>
      <div class="software-search_left">
        <a-input-search
          class="search-customer"
          v-model="$searchQuery.keywords"
          enterButton
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="搜索客户id、客户姓名、联系人电话"
        ></a-input-search>
      </div>
      <div class="software-search_center">
        <oa-select
          :options="system_version"
          v-model="$searchQuery.system_version_id"
          placeholder="选择系统版本"
        ></oa-select>
        <oa-date-range-filter
          class="mg-r8"
          :start.sync="$searchQuery.system_open_time_start"
          :end.sync="$searchQuery.system_open_time_end"
          :placeholder="['系统开通开始时间', '系统开通结束时间']"
        ></oa-date-range-filter>
      </div>
      <template slot="actions" class="software-search_right">
        <oa-button @click="tbOnFilterSearch('keywords', $event)" type="primary">
          查询
        </oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions">
        <a v-if="selectedRowKeys.length" @click="tbOnSelectionReset">清空</a>
        <a
          v-if="selectedRowKeys.length && auth_area['web/software/auth_add']"
          @click="handlerAddFunction"
        >
          新增功能
        </a>
      </span>
    </oa-alert-intro>

    <oa-table
      class="mg-t16"
      :scroll="{ x: 1000 }"
      :columns="tableOptions.columns"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      rowKey="id"
      :loading="getSoftwareList$loading"
      @change="tbOnTableNoClearSelectChange"
      :pager="pager"
      :dataSource="dataSource"
    >
      <div slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            href="javascript:;"
            @click="handlerAuthConfig(record)"
            v-if="record.auth_area['web/software/batch_auth_add']"
          >
            功能菜单配置
          </a>
        </oa-table-actions>
      </div>
    </oa-table>
  </div>
</template>

<script>
import { getSoftwareList } from '@/api/software'
import { tableOptions } from './software#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: 'software',

  components: {},

  props: {},

  mixins: [tableMixins],
  data() {
    return {
      system_version: [],
      auth_area: {},
      dataSource: [],
      pager: {
        p: 1,
        ps: 20,
        t: 0
      }
    }
  },

  computed: {
    tableOptions
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getSoftwareList({
        ...this.$searchQuery
      })
    }
  },

  async: {
    getSoftwareList(data, init = false) {
      return getSoftwareList(data).then(res => {
        this.system_version =
          (res.filter_map && res.filter_map.system_version) || []

        if (init) {
          // 如果是第一次进入，获取版本列表并默认查询第一个版本
          this.$searchQuery.system_version_id = this.system_version.length
            ? this.system_version[0].id
            : null
          this.getSoftwareList(this.$searchQuery)
        } else {
          // 之后每次进入，查询数据
          this.auth_area = res.auth_area
          this.dataSource = res.list
          this.pager = get(res, 'pager', {
            p: 1,
            ps: 20,
            t: 0
          })
        }
      })
    }
  },

  mounted() {
    this.getSoftwareList(
      {
        ...this.$searchQuery
      },
      true
    )
  },

  methods: {
    /**
     * @description 新增功能
     */
    handlerAddFunction() {
      this.$router.push({
        name: 'product-auth-add',
        query: {
          tag: 'batch',
          menu_type: 1,
          ids: this.selectedRows.map(item => item.brand_id),
          version_id: this.getVersionId(this.$searchQuery.system_version_id)
        }
      })
    },
    /**
     * @description 功能权限配置
     * @param {Object} record
     */
    handlerAuthConfig(record) {
      this.$router.push({
        name: 'product-auth-add',
        query: {
          tag: 'single',
          ids: [record.brand_id],
          leads_id: record.id,
          version_id: record.system_version_id,
          leads_name: record.name,
          system_version: record.system_version,
          menu_type: 1
        }
      })
    },
    /**
     * @description 根据system_version_id获取对应的version_id
     */
    getVersionId(systemVersionId) {
      let versionId = '1'
      this.system_version.forEach(item => {
        if (item.id === systemVersionId) {
          versionId = item.version_id
        }
      })
      return versionId
    }
  }
}
</script>

<style lang="less" scoped>
.software {
  padding: 24px;
  background-color: #fff;

  &-search_left {
    float: left;
  }
  &-search_center {
    float: right;
  }
  &-search_right {
    float: right;
  }
}
</style>
