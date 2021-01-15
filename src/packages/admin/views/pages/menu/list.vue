<template>
  <div class="content">
    <oa-panel class="header">
      <oa-filter-box class="mg-b24">
        <a-input-search
          enterButton
          placeholder="搜索唯一标识、菜单名称"
          style="width: 300px"
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
        ></a-input-search>
        <template slot="actions">
          <oa-button
            type="primary"
            v-modal-link="{
              name: 'menu-add',
              on: { done: getMenu }
            }"
            icon="anticon:plus"
          >
            添加菜单
          </oa-button>
        </template>
      </oa-filter-box>
      <oa-table
        :rowKey="row => row.id"
        :columns="columns"
        :dataSource="list"
        @change="tbOnTableChange"
        :loading="getMenu$loading"
        :pager="pager"
      >
        <div slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              href="javascript:;"
              v-modal-link="{
                name: 'menu-add',
                props: {
                  isEdit: true,
                  menu_id: record.id
                },
                on: { done: getMenu }
              }"
            >
              编辑
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </oa-panel>
  </div>
</template>

<script>
import { columns } from './list#config'
import { getMenu } from '@/api/menu'
import { get } from 'lodash-es'
import tableMixins from 'oa-core/mixins/table'

export default {
  name: '',
  components: {},
  mixins: [tableMixins],
  props: {},
  data() {
    return {
      columns,
      pager: {
        p: 1,
        ps: 20
      },
      list: []
    }
  },

  computed: {},

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getMenu()
    }
  },

  async: {
    getMenu() {
      return getMenu({
        ...this.$searchQuery
      })
        .then(res => {
          this.list = get(res, 'list', [])
          this.pager = get(res, 'pager', {})
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  },

  mounted() {
    this.getMenu()
  },

  methods: {}
}
</script>

<style lang="less" scoped></style>
