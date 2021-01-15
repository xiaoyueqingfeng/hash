<template>
  <div class="tag">
    <div class="tag__header mg-b16">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          slot="prepend"
          enterButton
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="搜索标签名称"
        ></a-input-search>
        <template slot="actions">
          <oa-button
            @click="tbOnFilterSearch('keywords', $event)"
            type="primary"
          >
            查询
          </oa-button>
          <oa-button @click="tbOnReset" class="mg-l8">重置</oa-button>
        </template>
        <oa-select
          style="width:200px"
          :options="typeOptions"
          v-model="$searchQuery.type"
          placeholder="请选择标签类型"
        ></oa-select>
        <oa-select
          style="width:200px"
          :options="statusOptions"
          v-model="$searchQuery.status"
          placeholder="请选择状态"
        ></oa-select>
        <oa-date-range-filter
          :start.sync="$searchQuery.created_time_start"
          :end.sync="$searchQuery.created_time_end"
          :placeholder="['创建开始时间', '创建 结束时间']"
        ></oa-date-range-filter>
      </oa-filter-box>
      <oa-button
        @click="handleAddTag"
        type="primary"
        v-if="authArea['web/tag/add']"
      >
        新建标签
      </oa-button>
    </div>
    <div class="tag__content">
      <oa-table
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pager="pager"
        @change="tbOnTableChange"
      >
        <div slot="action" slot-scope="text, record">
          <oa-table-actions>
            <a
              v-if="record.auth_area['web/tag/edit']"
              v-modal-link="{
                name: 'system-tag-edit',
                props: { isEdit: true, id: record.id },
                on: { done: onModalDone }
              }"
            >
              编辑
            </a>
            <a
              href="javascript:;"
              v-if="record.auth_area['web/tag/change_tag_status']"
            >
              <a-popconfirm
                :title="
                  `你确定要${record.status === 2 ? '启用' : '禁用'}该标签吗?`
                "
                @confirm="handleChangeTagStatus(record.id, record.status)"
                okText="确定"
                cancelText="取消"
              >
                <span>{{ record.status === 2 ? '启用' : '禁用' }}</span>
              </a-popconfirm>
            </a>
          </oa-table-actions>
        </div>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { columns } from './tag#config'
import { getTagList, changeTagStatus } from '@/api/tag'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: '',

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      dataSource: [],
      columns,
      pager: {
        p: 1,
        ps: 20
      },
      statusOptions: [],
      typeOptions: [],
      authArea: {}
    }
  },

  computed: {},

  async: {
    getTagList() {
      return getTagList({ ...this.$searchQuery }).then(res => {
        this.dataSource = res.list
        this.statusOptions = res.status
        this.typeOptions = res.type
        this.authArea = res.auth_area
        this.pager = res.pager
      })
    },
    changeTagStatus(data) {
      return changeTagStatus(data)
    }
  },

  watch: {
    $route() {
      this.$searchQuery = this.$route.meta.query
      this.getTagList()
    }
  },

  mounted() {
    this.getTagList()
  },

  methods: {
    handleAddTag() {
      this.$modalRouter.push({
        name: 'system-tag-edit',
        props: {
          isEdit: false
        },
        on: {
          done: this.getTagList
        }
      })
    },
    handleChangeTagStatus(id, status) {
      let statusEmu = {
        1: 2,
        2: 1
      }
      this.changeTagStatus({
        tag_id: id,
        status: statusEmu[status]
      }).then(res => {
        this.$message.success('标签状态修改成功')
        this.getTagList()
      })
    },
    onModalDone() {
      this.getTagList()
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  padding: 24px;
  background-color: #fff;
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
