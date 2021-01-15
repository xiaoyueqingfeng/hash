<template>
  <div class="hardware">
    <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
      <template slot="prepend">
        <a-input
          class="search"
          v-model="$searchQuery.leads_id"
          placeholder="请输入leadsID"
        ></a-input>
        <a-input
          class="search"
          v-model="$searchQuery.shop_id"
          placeholder="请输入场馆ID"
        ></a-input>
        <a-input
          class="search"
          v-model="$searchQuery.device_id"
          placeholder="请输入设备ID"
        ></a-input>
        <oa-button type="primary" @click="onSearch">搜索</oa-button>
      </template>
      <a-select
        v-model="$searchQuery.category_id"
        @change="selectCategory"
        placeholder="设备类型"
      >
        <a-select-option
          v-for="item in categoryList"
          :key="item.category_id"
          :value="item.category_id"
        >
          {{ item.category_name }}
        </a-select-option>
      </a-select>
      <a-select
        :disabled="!$searchQuery.category_id"
        v-model="$searchQuery.app_id"
        @change="selectApp"
        placeholder="产品名称"
      >
        <a-select-option
          v-for="item in appList"
          :key="item.app_id"
          :value="item.app_id"
        >
          {{ item.app_name }}
        </a-select-option>
      </a-select>
      <a-select
        :disabled="!$searchQuery.app_id"
        v-model="$searchQuery.app_version_id"
        placeholder="请选择软件版本"
      >
        <a-select-option
          v-for="item in versionList"
          :key="item.app_version_id"
          :value="item.app_version_id"
        >
          {{ item.version_name }}
        </a-select-option>
      </a-select>
      <oa-select
        :options="onlineStatus"
        v-model="$searchQuery.online_status"
        placeholder="在线状态"
      ></oa-select>
      <template slot="actions">
        <oa-button @click="handlerSearch" type="primary">查询</oa-button>
        <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
      </template>
    </oa-filter-box>

    <oa-alert-intro class="mg-t16">
      已选
      <a>{{ selectedRowKeys.length }}</a>
      / {{ pager.t }} 条数据
      <span slot="actions" v-if="selectedRowKeys.length">
        <a @click="tbOnSelectionReset">清空</a>
        <a @click="debug">
          debug更新
        </a>
      </span>
    </oa-alert-intro>
    <oa-table
      rowKey="device_id"
      :scroll="{ x: 1800 }"
      :dataSource="dataSource"
      :loading="getDeviceList$loading"
      :columns="tableOptions.columns"
      :pager="pager"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: tbOnSelectionChange
      }"
      @change="tbOnTableNoClearSelectChange"
    >
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            href="javascript:;"
            v-modal-link="{
              name: 'device-query-log',
              props: {
                device_id: record.device_id
              }
            }"
          >
            查询日志
          </a>
          <a href="javascript:;" @click="openDoor(record.device_id)">
            远程开门
          </a>
          <a
            href="javascript:;"
            v-if="record.auth_area['web/hardware/flush-device']"
            @click="clearData(record.device_id)"
          >
            清空数据
          </a>
          <a
            href="javascript:;"
            v-if="record.auth_area['web/hardware/config-get']"
            v-modal-link="{
              name: 'device-setting',
              props: {
                device_id: record.device_id,
                device_name: record.device_name,
                app_id: record.app_id,
                category_name: record.category_name,
                shop_name: record.shop_name
              }
            }"
          >
            功能设置
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>

<script>
import {
  getDeviceList,
  hardwareReload,
  hardwareDelete,
  openDoor,
  getCategory,
  getAppList,
  getVersion,
  deviceDataReset
} from '@/api/hardware'
import { tableOptions } from './device-manage#config'
import { get, mixin } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      categoryList: [],
      appList: [],
      versionList: [],
      onlineStatus: [],
      debugRowkeys: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    tableOptions
  },
  watch: {
    $route(newRoute) {
      this.getDeviceList()
    }
  },
  async: {
    /**
     *获取设备类型选项
     */
    getCategory() {
      return getCategory().then(res => {
        this.categoryList = get(res, 'list.categorys', [])
      })
    },
    /**
     * @description 获取硬件列表
     */
    getDeviceList() {
      //过滤空字符串
      this.$searchQuery = {
        ...this.$searchQuery,
        shop_id: this.$searchQuery.shop_id || undefined,
        device_id: this.$searchQuery.device_id || undefined
      }
      return getDeviceList(this.$searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = res.pager
        this.onlineStatus = get(res, 'hardware_online_tip', [])
      })
    }
  },

  mounted() {
    this.getCategory()
    this.selectCategory()
    this.selectApp()
    this.getDeviceList()
  },

  methods: {
    /**
     *根据设备类型获取更新包
     */
    selectCategory() {
      this.$searchQuery.app_id = undefined
      this.$searchQuery.app_version_id = undefined
      this.appList = []
      if (this.$searchQuery.category_id) {
        return getAppList({
          category_id: this.$searchQuery.category_id
        }).then(res => {
          this.appList = get(res, 'list', [])
        })
      }
    },
    /**
     *根据产品获取版本号
     */
    selectApp() {
      this.$searchQuery.app_version_id = undefined
      this.versionList = []
      if (this.$searchQuery.app_id) {
        return getVersion({ app_id: this.$searchQuery.app_id }).then(res => {
          this.versionList = get(res, 'list', [])
        })
      }
    },
    /**
     * @description 根据搜索词搜索硬件列表
     */
    onSearch() {
      // 搜索
      this.$router.push({
        query: {
          leads_id: this.$searchQuery.leads_id,
          shop_id: this.$searchQuery.shop_id,
          device_id: this.$searchQuery.device_id
        }
      })
      this.tbOnSelectionReset()
    },
    /**
     *远程开门
     */
    openDoor(id) {
      this.$confirm({
        title: '远程开门提示',
        content: '即将进行远程开门操作,该操作属于敏感操作，请慎重操作',
        onOk: () => {
          return openDoor({ device_id: id }).then(res => {
            this.$message.success('开门成功')
          })
        }
      })
    },
    //查询
    handlerSearch() {
      const { shop_id, device_id, leads_id, p, ...reset } = this.$searchQuery
      this.$router.push({
        query: {
          ...reset
        }
      })
      this.tbOnFilterSearch()
    },
    //debug更新
    debug() {
      //获取勾选的数组
      let selectDevice = this.dataSource.filter(item =>
        this.selectedRowKeys.includes(item.device_id)
      )
      //获取勾选设备的app_id
      let selectDeviceApp = selectDevice.map(item => item.app_id)
      //勾选app_id相同的数据
      let selectEqualApp = selectDeviceApp.filter(item => {
        return item === selectDeviceApp[0]
      })
      if (selectDeviceApp.length != selectEqualApp.length) {
        this.$message.warning('仅支持一种设备类型更新')
      } else {
        let selectEqualDevice = selectDevice.filter(
          item => item.app_id === selectEqualApp[0]
        )
        let device_ids = selectDevice.map(item => {
          return item.device_id
        })
        this.$modalRouter.push({
          name: 'device-debug',
          props: {
            device_ids: device_ids,
            device_type: selectEqualDevice[0].category_name,
            app_name: selectEqualDevice[0].app_name,
            app_id: selectEqualDevice[0].app_id
          },
          on: { done: this.getDeviceList }
        })
      }
    },
    // 清空数据
    clearData(id) {
      this.$confirm({
        title: '清空数据提示',
        content: '设备本地数据会清空，重启后设备会重新拉取数据',
        onOk: () => {
          return deviceDataReset({ device_id: id }).then(res => {
            this.$message.success('清空成功')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hardware {
  padding: 24px;
  background: #fff;
}

.search {
  width: 300px;
  margin-right: 24px;
}
</style>
