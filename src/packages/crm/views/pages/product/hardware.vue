<template>
  <div class="hardware">
    <div class="hardware__searchLine searchLine">
      <div class="searchLine__left">
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
          v-model="$searchQuery.device_code"
          placeholder="请输入设备ID"
        ></a-input>
        <oa-button type="primary" @click="onSearch">搜索</oa-button>
      </div>
      <div class="searchLine__right">
        <oa-button
          type="primary"
          @click="bindHardware"
          v-if="auth_area['web/hardware/bind']"
        >
          硬件绑定
        </oa-button>
      </div>
    </div>
    <oa-table
      rowKeys="id"
      :scroll="{ x: 1400 }"
      :dataSource="dataSource"
      :loading="getHardwareList$loading"
      :columns="tableOptions.columns"
      :pager="pager"
      @change="tbOnTableChange"
    >
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a
            href="javascript:;"
            @click="editHardware(record.device_id)"
            v-if="record.auth_area['web/hardware/edit']"
          >
            编辑设备
          </a>
          <a
            href="javascript:;"
            v-modal-link="{
              name: 'hardware-detail',
              props: { id: record.device_id }
            }"
            v-if="record.auth_area['web/hardware/detail']"
          >
            查看设备
          </a>
          <a
            href="javascript:;"
            @click="restartDevice(record.device_id)"
            v-if="record.auth_area['web/hardware/reload']"
          >
            重启设备
          </a>
          <a
            href="javascript:;"
            @click="deleteDevice(record.device_id)"
            v-if="record.auth_area['web/hardware/unbind']"
          >
            删除设备
          </a>
          <a
            href="javascript:;"
            @click="bindLocker(record.device_id)"
            v-if="record.auth_area['web/cabinet/group_add']"
          >
            硬件柜绑定
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>

<script>
import { getHardwareList, hardwareReload, hardwareDelete } from '@/api/hardware'
import { getCabinetGroupList } from '@/api/cabinet'

import { tableOptions } from './hardware#config'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: 'hardware-list',

  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      auth_area: {},
      hasCabinetGroup: false,
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

  async: {
    /**
     * @description 删除硬件
     * @param {number} device_id 硬件Id
     */
    hardwareDelete(device_id) {
      return hardwareDelete({
        device_id
      })
    },
    /**
     * @description 重启硬件
     * @param {number} device_id 硬件Id
     */
    hardwareReload(device_id) {
      return hardwareReload({
        device_id
      })
    },
    /**
     * @description 获取硬件列表
     */
    getHardwareList() {
      return getHardwareList(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.auth_area = res.auth_area
        this.pager = get(res, 'pager', this.pager)
      })
    },
    getCabinetGroupList(data) {
      return getCabinetGroupList(data).then(res => {
        this.hasCabinetGroup = !!res.total_count
      })
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getHardwareList({
        ...this.$searchQuery
      })
    }
  },

  mounted() {
    this.getHardwareList()
  },

  methods: {
    /**
     * @description 根据搜索词搜索硬件列表
     */
    onSearch() {
      // 搜索
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1
        }
      })
    },
    /**
     * @description 绑定硬件
     */
    bindHardware() {
      this.$modalRouter.push({
        name: 'hardware-edit',
        on: {
          done: () => {
            this.getHardwareList()
          }
        }
      })
    },
    /**
     * @description 编辑硬件
     */
    editHardware(id) {
      this.$modalRouter.push({
        name: 'hardware-edit',
        props: {
          id,
          isEdit: true
        },
        on: {
          done: () => {
            this.getHardwareList()
          }
        }
      })
    },
    /**
     * @description 查看硬件详情
     * @param {number} id 硬件ID
     */
    showDeviceDetail(id) {
      this.$modalRouter.push({
        name: 'hardware-detail',
        props: {
          id
        }
      })
    },
    /**
     * @description 删除硬件
     * @param {number} device_id 硬件ID
     */
    deleteDevice(device_id) {
      this.$confirm({
        title: '删除提示',
        content:
          '删除此设备会导致该设备解除绑定,删除后,该设备将停止服务,直到出现添加至列表,您确定删除吗?',
        confirmLoading: this.restartDevice$loading,
        onOk: () => {
          return this.hardwareDelete(device_id).then(() => {
            this.$success({
              title: '提示',
              content: '删除成功'
            })
            this.getHardwareList()
          })
        }
      })
    },
    /**
     * @description 重启设备
     */
    restartDevice(device_id) {
      this.$confirm({
        title: '重启提示',
        content: '即将远程重启设备,请观察该设备,下次重启时间为10分钟后',
        confirmLoading: this.restartDevice$loading,
        onOk: () => {
          return this.hardwareReload(device_id).then(() => {
            this.$success({
              title: '提示',
              content: '重启成功'
            })
            this.getHardwareList()
          })
        }
      })
    },
    /**
     * @description 硬件柜绑定
     */
    async bindLocker(device_id) {
      await this.getCabinetGroupList({
        device_id
      })
      if (this.hasCabinetGroup) {
        this.$router.push({
          name: 'product-locker-bind',
          query: {
            device_id
          }
        })
      } else {
        this.$router.push({
          name: 'product-locker-entry',
          query: {
            device_id
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hardware {
  padding: 24px;
  background: #fff;
}
.searchLine {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  .search {
    width: 300px;
    margin-right: 24px;
  }
}
</style>
