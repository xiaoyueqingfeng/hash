<template>
  <div :class="b()">
    <div class="locker-bind-header" :class="b('header')">
      <div :class="bh('left')">
        {{ currentGroupName }}
      </div>
      <div :class="bh('right')">
        <div
          class="mg-r8"
          :class="
            bh('status', {
              free: cabinet.id === 1,
              used: cabinet.id === 2,
              damage: cabinet.id === 3,
              maintain: cabinet.id === 4
            })
          "
          v-for="(cabinet, index) in cabinet_status"
          :key="index"
        >
          <!-- TODO：加接口 -->
          <span class="mg-r16">{{ cabinet.name }}</span>
        </div>
        <div :class="bh('operate')" v-if="canOperate">
          <oa-button
            type="primary"
            :disabled="relevancInterSectionStatus"
            @click="handlerRelevanceCabinetId"
          >
            关联柜号
          </oa-button>
          <oa-button
            type="primary"
            :disabled="unrelevancInterSectionStatus"
            @click="handlerUnRelevanceCabinetId"
          >
            取消关联
          </oa-button>
          <oa-button
            type="primary"
            :disabled="unrelevancInterSectionStatus"
            @click="handlerCabinetUnlockConfirm"
          >
            开锁指令
          </oa-button>
          <oa-button type="primary" @click="handlerChangeOperateStatus">
            退出操作
          </oa-button>
        </div>
        <div :class="bh('operate')" v-else>
          <oa-button type="primary" @click="handlerChangeOperateStatus">
            操作
          </oa-button>
          <oa-button type="primary" @click="handlerUploadLockFile">
            {{ import_lock ? '更新锁表' : '上传锁表' }}
          </oa-button>
          <oa-button type="primary" @click="handlerDeleteCabinetGroup">
            删除柜组
          </oa-button>
        </div>
      </div>
    </div>
    <div :class="b('body')">
      <oa-alert-intro v-if="canOperate" class="mg-b16">
        <a-checkbox
          :checked="relevanceChecked"
          :indeterminate="relevanceIndeterminate"
          @change="handlerRelevanceAllCheck"
          :disabled="!relevanceSns.length"
        >
          全选已关联
        </a-checkbox>
        <a-checkbox
          :checked="unrelevanceChecked"
          :indeterminate="unrelevanceIndeterminate"
          @change="handlerUnRelevanceAllCheck"
          :disabled="!unrelevanceSns.length"
        >
          全选未关联
        </a-checkbox>
      </oa-alert-intro>
      <a-checkbox-group
        class="cabinet-group"
        :value="checkedList"
        @change="handlerCabinetStatusChange"
      >
        <div
          v-for="cabinet in cabinets"
          :key="cabinet.cabinet_sn"
          class="mg-r16 mg-b16"
          :class="
            c({
              free: cabinet.cabinet_use_type === 1,
              used: cabinet.cabinet_use_type === 2,
              damage: cabinet.cabinet_use_type === 3,
              maintain: cabinet.cabinet_use_type === 4
            })
          "
        >
          <div class="top">
            <div :class="c('number')" v-if="cabinet.cabinet_id">
              {{ cabinet.serial_num }}
            </div>
            <div :class="c('number')" v-else>未关联</div>
            <div
              :class="c('name')"
              v-if="!cabinet.cabinet_id && cabinet.lock_sn && cabinet.area_sn"
            >
              {{ cabinet.lock_sn }}-{{ cabinet.area_sn }}
            </div>
            <div :class="c('name')">{{ cabinet.cabinet_type_tip }}</div>
          </div>
          <div class="bottom">
            <div class="status">{{ cabinet.cabinet_use_type_tip }}</div>
          </div>
          <div :class="c('operate')">
            <a-checkbox
              v-if="canOperate"
              :value="cabinet.cabinet_sn"
            ></a-checkbox>
          </div>
        </div>
      </a-checkbox-group>
    </div>
  </div>
</template>

<script>
import {
  getCabinetGroupList,
  deleteCabinetGroup,
  lockOpen,
  CabinetUsingCount
} from '@/api/cabinet'
import { get, intersection, isEqual, cloneDeep } from 'lodash-es'
export default {
  name: 'locker-bind',

  bem: {
    b: 'locker-bind',
    bh: 'locker-bind-header',
    c: 'cabinet'
  },

  components: {},

  props: {},

  data() {
    return {
      searchQuery: this.$route.meta.query,
      canOperate: false,
      checkedList: [], // 勾选列表
      currentGroup: {}, // 当前柜组
      cabinets: [], // 柜组
      relevanceSns: [], // 已关联柜sn集合
      unrelevanceSns: [], // 未关联柜sn集合
      relevancInterSection: [],
      unrelevancInterSection: [],
      cabinet_status: []
    }
  },

  computed: {
    currentGroupId() {
      return get(this.currentGroup, 'group_id', 0)
    },
    currentGroupName() {
      return get(this.currentGroup, 'group_name', '')
    },
    import_lock() {
      return get(this.currentGroup, 'import_lock', 0)
    },
    hasChecked() {
      return this.checkedList.length
    },
    checkedSortList() {
      return this.checkedLockerList.map(item => {
        return item.cabinet_sn
      })
    },
    checkedSortListIds() {
      return this.checkedLockerList.map(item => {
        return item.cabinet_id
      })
    },
    checkedSortListSerialNum() {
      return this.checkedLockerList
        .map(item => {
          return item.serial_num
        })
        .join(',')
    },
    checkedLockerList() {
      if (!this.hasChecked) return []
      return this.cabinets
        .filter(cabinet => this.checkedList.includes(cabinet.cabinet_sn))
        .sort((a, b) => a.index - b.index)
    },
    // 是否仅勾选了关联柜组,当未勾选任意选项时为true
    relevancInterSectionStatus() {
      if (!this.hasChecked) return true
      let len = this.relevancInterSection.length
      return !!len
    },
    // 是否仅勾选了未关联柜组,当未勾选任意选项时为true
    unrelevancInterSectionStatus() {
      if (!this.hasChecked) return true
      let len = this.unrelevancInterSection.length
      return !!len
    },
    // 关联柜子是否全部勾选
    relevanceChecked() {
      if (!this.hasChecked) return false
      if (this.relevancInterSectionStatus) {
        return isEqual(this.relevancInterSection, this.relevanceSns)
      } else {
        return false
      }
    },
    // 未关联柜子是否全部勾选
    unrelevanceChecked() {
      if (!this.hasChecked) return false
      if (this.unrelevancInterSectionStatus) {
        return isEqual(this.unrelevancInterSection, this.unrelevanceSns)
      } else {
        return false
      }
    },
    // 关联柜子是否被勾选
    relevanceIndeterminate() {
      if (!this.hasChecked) return false
      if (this.relevancInterSectionStatus && !this.relevanceChecked) {
        return true
      }
      return false
    },
    // 未关联柜子是否被勾选
    unrelevanceIndeterminate() {
      if (!this.hasChecked) return false
      if (this.unrelevancInterSectionStatus && !this.unrelevanceChecked) {
        return true
      }
      return false
    }
  },

  watch: {
    checkedList(newV) {
      if (!newV.length) {
        this.relevancInterSection = []
        this.unrelevancInterSection = []
        return
      }
      this.relevancInterSection = intersection(newV, this.relevanceSns)
      this.unrelevancInterSection = intersection(newV, this.unrelevanceSns)
    },
    canOperate(newV) {
      if (!newV) this.checkedList = []
    }
  },

  async: {
    getCabinetGroupList(data) {
      return getCabinetGroupList(data).then(res => {
        let groups = get(res, 'groups', [])
        this.currentGroup = groups[0] || {}
        this.cabinet_status = get(res, 'cabinet_status', [])
        this.cabinets = get(this.currentGroup, 'list', []).map(
          (cabinet, index) =>
            Object.assign(cabinet, {
              index
            })
        )
        this.relevanceSns = this.cabinets
          .filter(cabinet => cabinet.cabinet_id)
          .map(cabinet => cabinet.cabinet_sn)
        this.unrelevanceSns = this.cabinets
          .filter(cabinet => !cabinet.cabinet_id)
          .map(cabinet => cabinet.cabinet_sn)
      })
    },
    lockOpen(data) {
      return lockOpen(data)
    },
    CabinetUsingCount(data) {
      return CabinetUsingCount(data).then(res => !!res.count)
    }
  },

  mounted() {
    this.getCabinetGroupList({
      device_id: this.searchQuery.device_id
    })
  },

  methods: {
    /**
     * @description 改变操作状态
     */
    handlerChangeOperateStatus() {
      // 变更操作状态
      this.canOperate = !this.canOperate
    },
    /**
     * @description 变更储物柜状态
     */
    handlerCabinetStatusChange(checkedList) {
      this.checkedList = checkedList
    },
    /**
     * @description 删除柜组
     */
    handlerDeleteCabinetGroup() {
      this.$modalRouter.push({
        name: 'hardware-locker-delete',
        props: {
          group_id: this.currentGroupId
        },
        on: {
          done: () => {
            this.$router.push({
              name: 'product-locker-entry',
              query: {
                device_id: this.searchQuery.device_id
              }
            })
          }
        }
      })
    },
    /**
     * @description 关联柜号
     */
    handlerRelevanceCabinetId() {
      this.$modalRouter.push({
        name: 'hardware-locker-relevance',
        props: {
          group_id: this.currentGroupId,
          device_id: this.searchQuery.device_id,
          cabinets_sn: this.checkedSortList
        },
        on: {
          done: () => {
            this.getCabinetGroupList({
              device_id: this.searchQuery.device_id
            }).then(() => {
              this.canOperate = false
            })
          }
        }
      })
    },
    /**
     * @description 取消关联柜号
     */
    handlerUnRelevanceCabinetId() {
      this.$modalRouter.push({
        name: 'hardware-locker-unrelevance',
        props: {
          group_id: this.currentGroupId,
          cabinets_sn: this.checkedSortList
        },
        on: {
          done: () => {
            this.getCabinetGroupList({
              device_id: this.searchQuery.device_id
            }).then(() => {
              this.canOperate = false
            })
          }
        }
      })
    },
    /**
     * @description 储物柜开锁确认
     */
    handlerCabinetUnlockConfirm() {
      let hasUsedLocker = this.CabinetUsingCount({
        cabinet_ids: this.checkedSortListIds
      })
      if (hasUsedLocker) {
        this.$modalRouter.push({
          name: 'hardware-locker-unlock',
          props: {
            checkedSortListSerialNum: this.checkedSortListSerialNum
          },
          on: {
            done: () => {
              this.handlerCabinetUnlock()
            }
          }
        })
      } else {
        this.handlerCabinetUnlock()
      }
    },
    /**
     * @description 储物柜开锁
     */
    handlerCabinetUnlock() {
      this.lockOpen({
        group_id: this.currentGroupId,
        cabinet_sn: this.checkedSortList
      }).then(() => {
        this.$success({
          title: '开锁提示',
          content: '开锁指令发送成功'
        })
        this.getCabinetGroupList({
          device_id: this.searchQuery.device_id
        }).then(() => {
          this.canOperate = false
        })
      })
    },
    /**
     * @description 上传锁表
     */
    handlerUploadLockFile() {
      this.$modalRouter.push({
        name: 'hardware-locker-upload',
        props: {
          group_id: this.currentGroupId,
          title: this.import_lock ? '更新锁表' : '上传锁表'
        },
        on: {
          done: () => {
            this.getCabinetGroupList({
              device_id: this.searchQuery.device_id
            }).then(() => {
              this.canOperate = false
            })
          }
        }
      })
    },
    /**
     * @description 全选已关联
     */
    handlerRelevanceAllCheck(e) {
      let checked = e.target.checked
      if (!checked) {
        this.checkedList = []
      } else {
        this.checkedList = cloneDeep(this.relevanceSns)
      }
    },
    /**
     * @description 全选未关联
     */
    handlerUnRelevanceAllCheck(e) {
      let checked = e.target.checked
      if (!checked) {
        this.checkedList = []
      } else {
        this.checkedList = cloneDeep(this.unrelevanceSns)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.locker-bind {
  background-color: #fff;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    border-bottom: 1px solid #e9e9e9;
  }
  &__body {
    padding: 24px;
  }
}
.locker-bind-header {
  &__right {
    display: flex;
    align-items: center;
  }
  &__operate {
    button {
      .mg-r(8px);
    }
    button:last-of-type(1) {
      .mg-r(0);
    }
  }
  &__status {
    display: flex;
    span {
      width: 42px;
      position: relative;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
      text-align: right;
      &:before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 4px;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #3dd49f;
      }
    }
  }
  &__status--free {
    span:before {
      background-color: #3dd49f;
    }
  }
  &__status--used {
    span:before {
      background-color: #ffa100;
    }
  }
  &__status--damage {
    span:before {
      background-color: #a9a9a9;
    }
  }
  &__status--maintain {
    span:before {
      background-color: #ccac77;
    }
  }
}
.cabinet {
  position: relative;
  width: 128px;
  height: 140px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__number {
    .fz(20px);
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
  &__name {
    .fz(12px);
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
  }
  .status {
    height: 22px;
    border-radius: 2px;
    .fz(12px);
    line-height: 22px;
    text-align: center;
  }
  &__operate {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 100%;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    left: 0;
    top: 0;
    background-color: #f4f4f4;
  }
  &--free {
    .status {
      background: rgba(61, 212, 159, 0.2);
      color: #3dd49f;
    }
    &:before {
      background-color: #3dd49f;
    }
  }
  &--used {
    .status {
      background: rgba(255, 161, 0, 0.2);
      color: #ffa100;
    }
    &:before {
      background-color: #ffa100;
    }
  }
  &--damage {
    .status {
      background: rgba(169, 169, 169, 0.2);
      color: #a9a9a9;
    }
    &:before {
      background-color: #a9a9a9;
    }
  }
  &--maintain {
    .status {
      background: rgba(204, 172, 119, 0.2);
      color: #ccac77;
    }
    &:before {
      background-color: #ccac77;
    }
  }
}
.cabinet-group {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px -20px 0;
}
</style>
