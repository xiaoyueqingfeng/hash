<template>
  <oa-modal
    title="需求显示字段"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="
      setType === 'user' ? setUserFields$loading : setFields$loading
    "
    :width="900"
    fullBody
  >
    <div :class="b()">
      <div :class="b('left')">
        <div v-if="!initLoading">
          <div :class="b('section')" v-for="types in typeList" :key="types.id">
            <div class="header">{{ types.name }}</div>
            <div class="checkList">
              <div
                class="checkList-item"
                v-for="(element, index) in types.list"
                :key="index"
              >
                <a-checkbox
                  @change="e => onCheck(e, element)"
                  :disabled="!!element.is_disabled"
                  :checked="!!element.is_checkout"
                >
                  {{ element.name }}
                </a-checkbox>
              </div>
            </div>
          </div>
        </div>
        <div class="loading" v-else>
          <a-spin :spinning="initLoading" />
        </div>
      </div>
      <div :class="b('right')">
        <div :class="b('right-header')">默认展示字段</div>
        <!-- :move="onMove" -->
        <draggable
          class="list-group"
          tag="ul"
          v-model="checkedList"
          v-bind="dragOptions"
        >
          <transition-group type="transition" name="flip-list">
            <li
              class="list-group-item"
              v-for="element in checkedList"
              :key="element.id"
            >
              <div class="item-left">
                <a-icon type="bars" />
                {{ element.name }}
              </div>
              <a-icon
                class="item-right delete"
                type="delete"
                v-if="!element.is_disabled"
                @click="onRemove(element)"
              />
              <a-icon type="lock" v-else></a-icon>
            </li>
          </transition-group>
        </draggable>
      </div>
    </div>
  </oa-modal>
</template>

<script>
import draggable from 'vuedraggable'
import {
  getBaseSetFieldsForm,
  setFields,
  getUserSetFieldsForm,
  setUserFields
} from '@/api/list'
import { map } from 'lodash-es'
export default {
  name: '',

  components: { draggable },

  props: {
    setType: {
      type: String,
      default: 'user'
    },
    auth_key: {
      type: String
    }
  },

  bem: {
    b: 'table-columns-set'
  },

  data() {
    return {
      originList: [],
      typeList: [],
      checkedList: [],
      show: false
    }
  },

  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        ghostClass: 'ghost'
      }
    },
    initLoading() {
      return this.setType === 'user'
        ? this.getUserSetFieldsForm$loading
        : this.getBaseSetFieldsForm$loading
    }
  },

  watch: {
    // list: {
    //   immediate: true,
    //   handler(newValue) {
    //     this.checkedList = newValue.filter(item => item.is_checkout)
    //   }
    // },
    // list(newValue) {
    //   this.checkedList = newValue.filter(item => item.is_checkout)
    // }
  },

  async: {
    getBaseSetFieldsForm(data) {
      return getBaseSetFieldsForm(data)
    },
    getUserSetFieldsForm(data) {
      return getUserSetFieldsForm(data)
    },
    setFields(data) {
      return setFields(data)
    },
    setUserFields(data) {
      return setUserFields(data)
    }
  },

  mounted() {
    this.handleGetFields().then(res => {
      let list = res.list
      // this.list = Array.isArray(list) ? list : []
      this.originList = Array.isArray(list) ? list : []
      this.typeList = res.type_tips.map(type => {
        let id = type.id
        type.list = list.filter(item => item.type === id)
        return type
      })
      this.checkedList = list
        .filter(item => item.is_checkout)
        .sort(function(a, b) {
          return a.checkout_list_order - b.checkout_list_order
        })
    })
  },

  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || relatedElement.id !== 1) && draggedElement.id !== 1
      )
    },
    onCheck(e, ele) {
      console.log('onCheck', ele)
      let checked = e.target.checked
      ele.is_checkout = !!checked
      // 添加时则Push
      if (ele.is_checkout) {
        this.checkedList.push(ele)
      } else {
        this.checkedList = this.checkedList.filter(check => check.id !== ele.id)
      }
      // 删除时则splice
      // this.checkedList = this.originList.filter(item => item.is_checkout)
    },
    onRemove(element) {
      element.is_checkout = false
      this.checkedList = this.checkedList.filter(
        check => check.id !== element.id
      )
      // this.checkedList = this.originList.filter(item => item.is_checkout)
    },
    onSubmit() {
      // let checkLen = this.checkedList.filter(item => !item.is_disabled).length
      // if (checkLen > 15) {
      //   this.$message.error('自定义表格展示字段至多显示15个')
      //   return false
      // }
      let ids = map(this.checkedList, 'id')
      if (this.setType === 'user') {
        this.setUserFields({
          auth_key: this.auth_key,
          fields_id: ids
        }).then(res => {
          this.$message.success('自定义表格展示字段设置成功')
          this.show = false
          this.$emit('done')
        })
      } else {
        this.setFields({
          auth_key: this.auth_key,
          fields_id: ids
        }).then(res => {
          this.$message.success('自定义表格展示字段设置成功')
          this.show = false
          this.$emit('done')
        })
      }
    },
    handleGetFields() {
      if (this.setType === 'user') {
        return this.getUserSetFieldsForm({
          auth_key: this.auth_key
        })
      } else {
        return this.getBaseSetFieldsForm({
          auth_key: this.auth_key
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.table-columns-set {
  display: flex;
  flex-wrap: nowrap;
  height: 600px;
  &__left {
    position: relative;
    width: 650px;
    border-right: 1px solid #ddd;
    padding-right: 8px;
    .header {
      font-size: 12px;
      line-height: 32px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    .checkList {
      display: flex;
      flex-wrap: wrap;
      .checkList-item {
        width: 25%;
        margin-bottom: 10px;
      }
    }
  }
  &__right {
    min-width: 200px;
  }
  &__right-header {
    font-size: 12px;
    line-height: 32px;
    margin-bottom: 10px;
    font-weight: bold;
    padding-left: 24px;
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
  padding-left: 20px;
}
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 5px 0;
  cursor: move;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
  margin-bottom: 5px;
  user-select: none;
  padding: 0 8px 0 0;
}
.list-group-item:hover {
  background-color: #eaf2ff;
}
.list-group-item .delete {
  cursor: pointer;
}
.loading {
  position: absolute;
  left: 50%;
  top: 20%;
  margin-left: -14px;
  margin-top: -14px;
}
</style>
