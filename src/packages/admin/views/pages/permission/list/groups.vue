<template>
  <div class="content">
    <div class="header">
      <a-input-search
        slot="prepend"
        enterButton
        placeholder="搜索权限名称,菜单名称"
        style="width: 300px"
        v-model="$searchQuery.keywords"
        @search="tbOnSearchKeywords('keywords', $event)"
      ></a-input-search>
      <oa-button type="primary" @click="handlerPremissionConfig('add')">
        添加权限组
      </oa-button>
    </div>
    <div>
      <oa-table
        rowkey="id"
        :columns="columns"
        :dataSource="dataSource"
        :scroll="{ x: 1440 }"
        :pager="pager"
        @change="tbOnTableChange"
      >
        <template slot="perms" slot-scope="record">
          <a-tooltip :title="record.perms.join('、')" placement="topLeft">
            <span class="overflow-text">{{ record.perms.join('、') }}</span>
          </a-tooltip>
        </template>
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              href="javascript:;"
              @click="handlerPremissionConfig('edit', record)"
            >
              编辑
            </a>
            <a href="javascript:;" @click="handlerPremissionPointAdd(record)">
              添加权限点
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { columns } from './groups#config'
import { getPermGroups } from '@/api/perm-groups'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  mixins: [tableMixins],

  components: {},

  props: {},

  data() {
    return {
      columns,
      dataSource: [],
      pager: {
        p: 1,
        ps: 20
      }
    }
  },

  computed: {},

  async: {
    getPermGroups() {
      return getPermGroups(this.$searchQuery).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = res.pager
      })
    }
  },
  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getPermGroups()
    }
  },
  mounted() {
    this.getPermGroups()
  },

  methods: {
    //添加编辑权限
    handlerPremissionConfig(type, permission) {
      this.$modalRouter.push({
        name: 'permission-groups',
        props: {
          isEdit: type === 'add' ? false : true,
          permission
        },
        on: {
          done: this.getPermGroups
        }
      })
    },

    //添加权限点
    handlerPremissionPointAdd(permission) {
      this.$modalRouter.push({
        name: 'permission-point-add',
        props: {
          permission
        },
        on: {
          done: this.getPermGroups
        }
      })
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
  .overflow-text {
    display: block;
    max-width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
