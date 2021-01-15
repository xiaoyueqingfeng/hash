<template>
  <oa-modal
    v-model="show"
    title="删除菜单"
    :confirmLoading="deleteVersionMenu$loading"
    @ok="handlerSubmit"
  >
    <a-row class="mg-b16">
      <a-col :span="6">版本名称</a-col>
      <a-col :span="18">{{ version_name }}</a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="6">菜单维度</a-col>
      <a-col :span="18">
        <oa-tag type="menu-model" :value="menu_type"></oa-tag>
      </a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="6">菜单名称</a-col>
      <a-col :span="18">{{ menu_info.menu_name }}</a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="6">权限组</a-col>
      <a-col :span="18">{{ getPerm(menu_info.groups) }}</a-col>
    </a-row>
    <a-row class="mg-b16">
      <a-col :span="6">灰度权限组</a-col>
      <a-col :span="18">{{ getPerm(menu_info.grey_groups) }}</a-col>
    </a-row>
    <p class="menu-tips">注：删除后该菜单将无法恢复，请谨慎操作！</p>
  </oa-modal>
</template>
<script>
import { get } from 'lodash-es'
import { deleteVersionMenu } from '@/api/version'
export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    version_name: {
      type: String
    },
    menu_type: {
      type: Number,
      default: 1
    },
    menu_info: {
      type: Object
    }
  },
  async: {
    deleteVersionMenu(data) {
      return deleteVersionMenu(data)
    }
  },
  computed: {
    version_menu_id() {
      return get(this.menu_info, 'version_menu_id', '')
    }
  },
  methods: {
    getPerm(permList) {
      if (permList && permList.length) {
        return permList
          .map(item => {
            return item.group_name
          })
          .join('、')
      }
    },
    handlerSubmit() {
      this.deleteVersionMenu({ version_menu_id: this.version_menu_id }).then(
        res => {
          this.$message.success('删除菜单成功')
          this.$emit('done')
          this.show = false
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.menu-tips {
  color: @error-color;
}
</style>
