<template>
  <oa-modal
    :confirmLoading="updateAuth$loading"
    title="保存提示"
    v-model="show"
    width="676px"
    @ok="onSubmit"
  >
    <a-alert slot="prepend" type="warning" showIcon>
      <div slot="message">请仔细校验以上变动内容，敏感操作，请再次确认！</div>
    </a-alert>

    <div class="table-container">
      <oa-table
        rowKey="addName"
        v-bind="tableOptions"
        :dataSource="diffList"
        :pagination="false"
        :showFullScreen="false"
      ></oa-table>
    </div>
  </oa-modal>
</template>
<script>
import { tableOptions } from './auth-confirm#config'
import { updateAuth } from '@/api/role'
export default {
  props: {
    /**
     * 新增的数组 ['首页‘,'首页-2-3']
     */
    added: {
      type: Array,
      default: () => []
    },
    /**
     *  移除的数组 ['首页‘,'首页-2-3']
     */
    removed: {
      type: Array,
      default: () => []
    },
    // 确认类型 auth/level(已废弃)
    type: {
      type: String,
      default: 'auth'
    },
    version_id: {
      type: [String, Number],
      required: true
    },
    /**
     * @example
     * {
     *  id:角色id/角色等级id
     *  name: ‘角色名称’
     *  desc:‘角色描述’
     *  data_grant: 数据域,
     *  brand_ids:[], // 品牌相关权限
     *  shop_ids:[]  // 门店相关权限
     * } or {
     *  id: 角色等级id
     *  shop_ids:[],
     *  brand_ids:[]
     * }
     */
    info: {
      type: Object,
      default: () => ({})
    },
    is_multi: {
      type: Number
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    tableOptions,
    diffList() {
      const _list = []
      this.added.forEach((name, i) => {
        if (!_list[i]) _list[i] = {}
        _list[i].addName = name
      })
      this.removed.forEach((name, i) => {
        if (!_list[i]) _list[i] = {}
        _list[i].removeName = name
      })
      if (!_list.length) {
        _list.push({
          addName: '无变动',
          removeName: '无变动'
        })
      }
      return _list
    }
  },
  methods: {
    onSubmit() {
      let req
      if (this.type === 'auth') {
        req = this.updateAuth
      }
      req().then(() => {
        this.$emit('done')
        this.$message.success('更新成功')
        this.show = false
      })
    }
  },
  async: {
    updateAuth() {
      return updateAuth({
        version_id: this.version_id,
        role_id: this.info.id,
        name: this.info.name,
        desc: this.info.desc,
        data_grant: this.info.data_grant,
        brand_ids: this.info.brand_ids,
        shop_ids: this.info.shop_ids,
        department_ids: [],
        is_multi: this.is_multi
      })
    }
  }
}
</script>

<style lang="less" scoped>
.table-container {
  .pd(12px);
  border: 1px solid @border-color;
  border-radius: 4px;
}
</style>
