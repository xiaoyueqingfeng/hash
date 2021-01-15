<template>
  <div class="open-device">
    <a-row type="flex" justify="space-between" class="mg-b16">
      <a-col>
        <a-row type="flex" justify="start">
          <a-col class="mg-r16">
            <a-input
              placeholder="请输入设备ID进行搜索"
              v-model="$searchQuery.keywords"
              style="width: 240px"
            ></a-input>
          </a-col>
          <a-col>
            <oa-button class="button" @click="onSearch" type="primary">
              搜索
            </oa-button>
          </a-col>
        </a-row>
      </a-col>
      <a-col>
        <oa-button class="button" @click="onAddDevice" type="primary">
          新增设备
        </oa-button>
      </a-col>
    </a-row>
    <oa-table
      rowKey="device_id"
      :scroll="{ x: 1200 }"
      :dataSource="dataSource"
      :loading="getDeviceList$loading"
      :columns="tableOptions.columns"
      :pager="pager"
      @change="tbOnTableChange"
    >
      <template slot="type" slot-scope="text, record">
        {{ typeTodesc(record.device_type) }}
      </template>
      <template slot="status" slot-scope="text, record">
        {{ statusTodesc(record.status) }}
      </template>
      <template slot="action" slot-scope="record">
        <oa-table-actions>
          <a @click="onShowDeviceData(record)">
            查看数据
          </a>
          <a @click="onEditDevice(record)">
            编辑
          </a>
          <a @click="onChangeDeviceStatus(record)" v-if="record.status">
            {{ record.status === 1 ? '置为无效' : '恢复' }}
          </a>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>

<script>
import { getDeviceList, switchDeviceStatus } from '@/api/device'
import { tableOptions } from './device.config'
import { get, mixin } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  components: {},

  props: {},
  mixins: [tableMixins],
  data() {
    return {
      dataSource: [],
      mapping: {},
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
     * @description 获取设备注册列表
     */
    getDeviceList() {
      return getDeviceList(this.$searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.mapping = get(res, 'mapping', {})
        this.pager = res.pager
      })
    },
    switchDeviceStatus(data) {
      return switchDeviceStatus(data).then(res => {
        this.$success({
          content: '设备状态切换成功'
        })
        this.$router.reload()
      })
    }
  },

  mounted() {
    this.getDeviceList()
  },

  methods: {
    typeTodesc(type) {
      let currentType = this.mapping.type.filter(i => i.id === type)[0]
      return currentType && currentType['name']
    },
    statusTodesc(status) {
      let currentStatus = this.mapping.status.filter(i => i.id === status)[0]
      return currentStatus && currentStatus['name']
    },
    /**
     * @description 新增设备
     */
    onAddDevice(record) {
      this.$modalRouter.push({
        name: 'open-device-edit',
        props: {
          isEdit: false,
          mapping: this.mapping
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 编辑设备
     */
    onEditDevice(record) {
      this.$modalRouter.push({
        name: 'open-device-edit',
        props: {
          isEdit: true,
          id: record.device_id,
          mapping: this.mapping
        },
        on: {
          success: () => {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 查看设备信息
     */
    onShowDeviceData(record) {
      this.$modalRouter.push({
        name: 'open-device-show-data',
        props: {
          id: record.device_id
        },
        on: {
          success() {
            this.$router.reload()
          }
        }
      })
    },
    /**
     * @description 编辑设备状态
     */
    onChangeDeviceStatus(record) {
      console.log('record', record)
      this.switchDeviceStatus({
        device_id: record.device_id,
        switch: record.status === 1 ? 2 : 1
      })
    },
    onSearch() {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.open-device {
  padding: 24px;
  background: #fff;
}
</style>
