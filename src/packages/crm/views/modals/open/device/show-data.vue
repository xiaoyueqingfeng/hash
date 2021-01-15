<template>
  <oa-modal v-model="show" title="查看数据" :width="1000" :footer="null">
    <a-row type="flex" justify="start" class="mg-b16">
      <a-col span="6">
        <span>设备id:&nbsp;</span>
        <span>{{ info.device_id }}</span>
      </a-col>
      <a-col span="6">
        <span>设备类型:&nbsp;</span>
        <span>{{ typeTodesc(info.device_type) }}</span>
      </a-col>
      <a-col span="6">
        <span>产品名称:&nbsp;</span>
        <span>{{ info.product_name }}</span>
      </a-col>
    </a-row>
    <oa-table
      rowKeys="id"
      :dataSource="dataSource"
      :columns="columns"
      :pagination="{ pageSize: 20 }"
      :loading="getDeviceDataList$loading"
      :showFullScreen="false"
      :scroll="{ x: 1200 }"
      @change="onTableChange"
    ></oa-table>
  </oa-modal>
</template>
<script>
import { getDeviceInfo, getDeviceDataList } from '@/api/device'
import { get } from 'lodash-es'
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      show: true,
      dataSource: [],
      info: {},
      mapping: {},
      columns: []
    }
  },
  async: {
    getDeviceInfo() {
      return getDeviceInfo({
        device_id: this.id
      }).then(res => {
        this.info = get(res, 'info', {})
        this.mapping = get(res, 'mapping', {})
      })
    },
    getDeviceDataList(data = {}) {
      return getDeviceDataList({
        device_id: this.id,
        ...data
      }).then(res => {
        this.dataSource = get(res, 'list', [])
        if (this.dataSource.length && !this.columns.length) {
          let data_list = this.dataSource[0]['data_list']
          let data_list_columns = data_list.map(item => {
            return {
              title: item.name,
              dataIndex: item.key,
              width: '120px'
            }
          })
          this.columns = [
            {
              title: '用户手机号',
              dataIndex: 'mobile',
              fixed: true,
              width: '120px'
            },
            ...data_list_columns,
            {
              title: '上报时间',
              dataIndex: 'report_time',
              width: '120px'
            }
          ]
        }
        this.dataSource = this.dataSource.map(data => {
          let customValues = {}
          data.data_list.map(item => {
            customValues[item.key] = item.value
          })
          return {
            ...data,
            ...customValues
          }
        })
      })
    }
  },
  computed: {},
  mounted() {
    this.getDeviceInfo()
    this.getDeviceDataList()
  },
  methods: {
    typeTodesc(type) {
      if (!type && type !== 0) return ''
      let currentType = this.mapping.type.filter(i => i.id === type)[0]
      return currentType && currentType['name']
    },
    onTableChange(pagination) {
      this.getDeviceDataList({
        p: pagination.current,
        ps: pagination.pageSize
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
