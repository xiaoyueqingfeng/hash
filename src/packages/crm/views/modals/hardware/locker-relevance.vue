<template>
  <oa-modal
    v-model="show"
    title="关联柜号"
    @ok="onSubmit"
    :confirmLoading="bindCabinet$loading"
    :class="b()"
  >
    <div :class="b('title')">按顺序关联柜号</div>
    <div :class="b('container')">
      <div :class="b('group')">
        <div class="mb-16" :class="b('group-title')">租赁柜</div>
        <div :class="b('group-body')">
          <div
            class="mg-r8"
            :class="
              c({
                disabled: cabinet.is_binded === 1,
                checked: cabinet.checked
              })
            "
            v-for="cabinet in rental_cabinet"
            :key="cabinet.id"
            @click="handlerRentalCabinetStatusChange(cabinet)"
          >
            {{ cabinet.serial_num }}
          </div>
        </div>
      </div>
      <div :class="b('group')">
        <div class="mb-16" :class="b('group-title')">临时柜</div>
        <div :class="b('group-body')">
          <div
            class="mg-r8"
            :class="
              c({
                disabled: cabinet.is_binded === 1,
                checked: cabinet.checked
              })
            "
            v-for="cabinet in temporary_cabinet"
            :key="cabinet.id"
            @click="handlerTemporaryCabinetStatusChange(cabinet)"
          >
            {{ cabinet.serial_num }}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </oa-modal>
</template>

<script>
import { getShopCabinetList, bindCabinet } from '@/api/cabinet'
export default {
  name: 'hardware-locker-relevance',

  bem: {
    b: 'locker-relevance',
    c: 'cabinet'
  },

  components: {},

  props: {
    device_id: {
      type: String,
      required: true
    },
    group_id: {
      type: Number,
      required: true
    },
    cabinets_sn: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      show: true,
      temporary_cabinet: [],
      rental_cabinet: [],
      RentalCheckedList: [],
      TemporaryCheckedList: []
    }
  },

  computed: {
    checkedList() {
      return this.RentalCheckedList.concat(...this.TemporaryCheckedList)
    },
    checkedIdList() {
      return this.checkedList.map(checked => checked.id)
    }
  },

  async: {
    getShopCabinetList(data) {
      return getShopCabinetList(data).then(res => {
        this.temporary_cabinet = res.temporary_cabinet.map((cabinet, index) => {
          return Object.assign(cabinet, {
            checked: false,
            index
          })
        })
        this.rental_cabinet = res.rental_cabinet.map((cabinet, index) => {
          return Object.assign(cabinet, {
            checked: false,
            index
          })
        })
      })
    },
    bindCabinet(data) {
      return bindCabinet(data).then(res => {})
    }
  },

  mounted() {
    this.getShopCabinetList({
      device_id: this.device_id
    })
  },

  methods: {
    handlerRentalCabinetStatusChange(cabinet) {
      if (cabinet.is_binded === 1) return
      let index = this.RentalCheckedList.indexOf(cabinet)
      cabinet.checked = !cabinet.checked
      if (index > -1) {
        this.RentalCheckedList.splice(index, 1)
      } else {
        this.RentalCheckedList.push(cabinet)
      }
      this.RentalCheckedList.sort((a, b) => a.index - b.index)
    },
    handlerTemporaryCabinetStatusChange(cabinet) {
      if (cabinet.is_binded === 1) return
      let index = this.TemporaryCheckedList.indexOf(cabinet)
      cabinet.checked = !cabinet.checked
      if (index > -1) {
        this.TemporaryCheckedList.splice(index, 1)
      } else {
        this.TemporaryCheckedList.push(cabinet)
      }
      this.TemporaryCheckedList.sort((a, b) => a.index - b.index)
    },
    onSubmit() {
      let checkedList = this.checkedIdList
      let checkedListLens = checkedList.length
      let cabinets_snLens = this.cabinets_sn.length
      if (!checkedListLens) {
        this.$error({
          title: '提示',
          content: '请至少选择一个储物柜进行关联'
        })
        return
      }
      if (checkedListLens > cabinets_snLens) {
        this.$error({
          title: '提示',
          content: `请选择小于等于${cabinets_snLens}个储物柜进行关联`
        })
        return
      }
      let cabinet_sn = this.cabinets_sn.slice(0, checkedListLens)
      let group_id = this.group_id

      this.bindCabinet({
        group_id,
        cabinet_id: checkedList,
        cabinet_sn
      }).then(res => {
        this.show = false
        this.$message.success('储物柜关联成功')
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.locker-relevance {
  &__title {
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
    margin-bottom: 24px;
    text-align: center;
  }
  &__group {
    margin-bottom: 24px;
  }
  &__group-title {
    .h(22px);
    .fz(14px);
    color: rgba(0, 0, 0, 0.85);
    line-height: 22px;
  }
  &__group-body {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -14px -8px 0;
  }
}
.cabinet {
  .s(82px, 32px);
  background: #fff;
  border-radius: 2px;
  border: 1px solid rgba(217, 217, 217, 1);
  .fz(14px);
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.45);
  line-height: 32px;
  .mg-b(8px);
  text-align: center;
  cursor: pointer;
  user-select: none;
  &--disabled {
    border-color: rgba(217, 217, 217, 1);
    background: rgba(217, 217, 217, 1);
    color: #fff;
  }
  &--checked {
    border-color: rgba(24, 144, 255, 1);
    background: rgba(24, 144, 255, 0.1);
    color: rgba(24, 144, 255, 1);
  }
}
</style>
