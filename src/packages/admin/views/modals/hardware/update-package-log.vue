<template>
  <oa-modal v-model="show" title="查看操作日志" :footer="null">
    <oa-table
      :dataSource="dataSource"
      :columns="columns"
      rowkeys="id"
      :pager="pager"
      :showFullScreen="false"
      @change="onTableChange"
    >
      <template slot="popover" slot-scope="record">
        <a-popover title="操作内容">
          <template slot="content">
            <div v-for="item in record.operate_type" :key="item">
              {{ item }}
            </div>
          </template>
          <span>
            <span v-for="item in record.operate_type" :key="item">
              {{ item }}
            </span>
          </span>
        </a-popover>
      </template>
    </oa-table>
  </oa-modal>
</template>

<script>
import { getApkLogs } from '@/api/iot'
import { columns } from './update-package#config'

export default {
  name: 'update-package-log',

  components: {},

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      formCol: {
        'label-col': { span: 7 },
        'wrapper-col': { span: 17 }
      },
      show: true,
      dataSource: [],
      mapping: {},
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {
    columns
  },

  async: {
    /**
     * @description 获取当前更新包的操作日志
     */
    getApkLogs(data) {
      return getApkLogs(data).then(res => {
        this.dataSource = res.list
        this.mapping = res.mapping
        this.pager = res.pager
      })
    }
  },

  mounted() {
    this.getApkLogs({
      id: this.id
    })
  },

  methods: {
    onTableChange(pagination, filter, sorter) {
      this.getApkLogs({
        id: this.id,
        p: pagination.p,
        ps: pagination.ps
      })
    }
  }
}
</script>
