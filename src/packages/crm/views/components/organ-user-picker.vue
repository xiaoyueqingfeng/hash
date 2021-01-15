<template>
  <div class="crm-organ-user-picker">
    <oa-cascader
      class="crm-organ-user-picker__organ mg-r8"
      v-model="organModel"
      changeOnSelect
      @change="onOrganChange"
      @popupVisibleChange="onOrganChange"
      @cascaderFocus="handleFocus"
      :placeholder="organPlaceholder"
      :options="organOptions"
    ></oa-cascader>
    <oa-select
      :disabled="!organId"
      :options="userList"
      @change="onUserChange"
      class="crm-organ-user-picker__user"
      v-model="userModel"
      :placeholder="userPlaceholder"
    ></oa-select>
  </div>
</template>

<script>
import { getOrganList, getUserList } from '@/api/user'
import { walkTree } from 'oa-core/utils/walk-tree'
export default {
  props: {
    organId: {
      type: null,
      required: true
    },
    userStatus: {
      type: String,
      default: 'inService'
    },
    organPlaceholder: {
      type: String,
      default: '选择部门'
    },
    userId: {
      type: null,
      required: true
    },
    userPlaceholder: {
      type: String,
      default: '选择员工'
    },
    immediateReq: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      organOptions: [],
      userList: [],
      userStatusMap: {
        //1或不传:在职员工；2：离职员工；1,2：全部员工
        inService: '1',
        retired: '2',
        all: '1,2'
      }
    }
  },
  computed: {
    organModel: {
      get() {
        return this.organId
      },
      set(newVal) {
        this.$emit('update:organId', newVal)
      }
    },
    userModel: {
      get() {
        return this.userId
      },
      set(userId) {
        this.$emit('update:userId', userId)
      }
    }
  },
  methods: {
    onOrganChange(organId) {
      this.$emit('update:userId', undefined)
      if (organId !== this.organId && organId) {
        this.$nextTick(() => {
          this.getUserList()
        })
      }
      this.$emit('change', {
        organ_id: organId,
        user_id: organId ? this.userId : undefined
      })
    },
    onUserChange(userId) {
      this.$emit('change', {
        organ_id: this.organId,
        user_id: userId
      })
    },
    handleFocus() {
      if (this.organOptions && this.organOptions.length) return false
      this.getOrganList()
      if (this.organId) {
        if (this.userList && this.userList.length) return false
        this.getUserList()
      }
    }
  },
  mounted() {
    if (this.immediateReq) {
      this.getOrganList()
      if (this.organId) {
        this.getUserList()
      }
    }
  },
  async: {
    getOrganList() {
      return getOrganList().then(res => {
        // 不需要顶级节点
        const options = res[0].children
        walkTree(options, node => {
          if (!node.children.length) {
            delete node.children
          }
        })
        this.organOptions = options
      })
    },
    getUserList() {
      return getUserList({
        organ_id: this.organId,
        user_status: this.userStatusMap[this.userStatus]
      }).then(res => {
        this.userList = res.list
      })
    }
  }
}
</script>

<style lang="less">
.crm-organ-user-picker {
  display: inline-block;
}
</style>
