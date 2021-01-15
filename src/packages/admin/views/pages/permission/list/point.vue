<template>
  <div class="content">
    <div class="header">
      <div></div>
      <oa-button type="primary" @click="handlerConfigResources('add')">
        添加资源
      </oa-button>
    </div>
    <div>
      <oa-table
        rowkey="key"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="{ pageSize: 20 }"
        :loading="getPerms$loading"
      >
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              v-if="record.type === 'resource'"
              href="javascript:;"
              @click="handlerResourcesPremissionPointConfig('add', record)"
            >
              添加权限点
            </a>
            <a href="javascript:;" @click="editHandlerConfig(record)">
              <span v-if="record.type === 'point'">编辑权限点</span>
              <span v-if="record.type === 'resource'">编辑资源</span>
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { columns } from './point#config'
import { getPerms } from '@/api/perms'
import { get } from 'lodash-es'
export default {
  name: '',

  components: {},

  props: {},

  data() {
    return {
      columns,
      dataSource: []
    }
  },

  computed: {},

  async: {
    getPerms(data) {
      return getPerms(data).then(res => {
        let dataSource = get(res, 'list', [])
        let key = 0
        this.dataSource = dataSource.map(item => {
          return {
            key: key++,
            id: item.id,
            name: item.name,
            alias: item.alias,
            type: 'resource', //资源
            children: item.actions.map(action => {
              return {
                key: key++,
                id: action.id,
                parent_id: item.id,
                perm_name: action.name,
                action_name: action.alias,
                type: 'point' //权限点
              }
            })
          }
        })
      })
    }
  },

  mounted() {
    this.getPerms()
  },
  methods: {
    //权限点
    handlerResourcesPremissionPointConfig(type, resource) {
      this.$modalRouter.push({
        name: 'permission-resources-point-config',
        props: {
          isEdit: type === 'add' ? false : true,
          resource
        },
        on: {
          done: this.getPerms
        }
      })
    },
    //资源
    handlerConfigResources(type, record) {
      this.$modalRouter.push({
        name: 'permission-resources-config',
        props: {
          isEdit: type === 'add' ? false : true,
          resource: record
        },
        on: {
          done: this.getPerms
        }
      })
    },
    //编辑
    editHandlerConfig(record) {
      if (record.type === 'resource') {
        //资源
        this.handlerConfigResources('edit', record)
      } else if (record.type === 'point') {
        //权限点
        this.handlerResourcesPremissionPointConfig('edit', record)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
  }
}
</style>
