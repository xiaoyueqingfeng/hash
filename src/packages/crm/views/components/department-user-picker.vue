<template>
  <div class="crm-department-user-picker">
    <oa-cascader
      class="crm-department-user-picker__department"
      v-model="organModel"
      changeOnSelect
      @change="onOrganChange"
      @popupVisibleChange="onOrganChange"
      placeholder="选择部门"
      :options="organOptions"
    ></oa-cascader>
    <oa-select
      :disabled="!organId"
      :options="userList"
      @change="onUserChange"
      class="crm-department-user-picker__user"
      v-model="userModel"
      placeholder="选择员工"
    ></oa-select>
  </div>
</template>

<script>
import {
  getCreaterOrganList,
  getCreaterUserList,
  getSaleOrganList,
  getSaleUserList,
  getCsOrganList,
  getCsUserList,
  getHardwareSaleOrganList,
  getHardwareSaleUserList
} from '@/api/leads'
import { listToTree } from 'oa-core/utils/list-to-tree'
import { walkTree } from 'oa-core/utils/walk-tree'

export default {
  props: {
    organId: {
      type: null,
      required: true
    },
    userId: {
      type: null,
      required: true
    },
    type: {
      type: String,
      default: '' // creator: 创建人 sale: 销售 businessService: 商服 hardwaresale: 硬件销售
    }
  },
  data() {
    return {
      organOptions: [],
      userList: []
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
  async: {
    getCreaterOrganList() {
      return getCreaterOrganList()
    },
    getCreaterUserList() {
      return getCreaterUserList({
        organ_id: this.organId
      }).then(res => {
        this.userList = res.list
      })
    },
    getSaleOrganList() {
      return getSaleOrganList()
    },
    getSaleUserList() {
      return getSaleUserList({
        organ_id: this.organId
      }).then(res => {
        this.userList = res.list
      })
    },
    getCsOrganList() {
      return getCsOrganList()
    },
    getCsUserList() {
      return getCsUserList({
        organ_id: this.organId
      }).then(res => {
        this.userList = res.list
      })
    },
    getHardwareSaleOrganList() {
      return getHardwareSaleOrganList()
    },
    getHardwareSaleUserList() {
      return getHardwareSaleUserList({
        organ_id: this.organId
      }).then(res => {
        this.userList = res.list
      })
    }
  },
  created() {
    this.selectOrganApi().then(res => {
      // 不需要顶级节点
      this.organOptions = listToTree(res.list.filter(item => item.id !== '1'))
    })
    if (this.organId) {
      this.selectUserApi()
    }
  },
  methods: {
    onOrganChange(organId) {
      this.$emit('update:userId', undefined)
      if (organId !== this.organId && organId) {
        this.$nextTick(() => {
          this.selectUserApi()
        })
      }
      this.$emit('change')
    },
    onUserChange() {
      this.$emit('change')
    },
    selectUserApi() {
      let obj = {
        creator: this.getCreaterUserList,
        sale: this.getSaleUserList,
        businessService: this.getCsUserList,
        hardwaresale: this.getHardwareSaleUserList
      }
      return obj[this.type]()
    },
    selectOrganApi() {
      let obj = {
        creator: this.getCreaterOrganList,
        sale: this.getSaleOrganList,
        businessService: this.getCsOrganList,
        hardwaresale: this.getHardwareSaleOrganList
      }
      return obj[this.type]()
    }
  }
}
</script>

<style lang="less">
.crm-department-user-picker {
  display: flex;
  &__department {
    margin-right: 16px;
  }
}
</style>
