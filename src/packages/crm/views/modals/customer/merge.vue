<template>
  <oa-modal title="客户合并" v-model="show" @ok="showConfirmModal" :width="668">
    <div class="merge">
      <a-input-search
        v-model="keywords"
        placeholder="请搜索客户名称"
        @search="onSearch"
        enterButton="搜索"
      />
      <div class="tip">
        <oa-alert-intro>
          已选
          <a>{{ hasChecked.length }}</a>
          / {{ pagination.total }} 条数据
          <span slot="actions">
            <a @click="clear">清空</a>
          </span>
        </oa-alert-intro>
      </div>
      <div class="content">
        <div v-for="item in customList" :key="item.leads_id">
          <div
            class="merge-item-wrap"
            :class="{ active: item.activeClass }"
            @click.stop="selectCurItem(item)"
          >
            <customerMergeItem
              :mergeInfo="item"
              :active="item.activeClass"
              :activeRadio="activeCheckedMain"
              @sendCheckedMain="getCheckedMain"
            />
          </div>
        </div>
      </div>

      <div class="text-center margin-t8" v-if="customList.length > 0">
        <a-pagination
          simple
          :defaultCurrent="pagination.current"
          :total="pagination.total"
          :pageSize="pagination.pageSize"
          @change="pageChange"
        />
      </div>
      <div v-else class="empty">
        <oa-empty width="287px"></oa-empty>
      </div>
    </div>
    <oa-modal
      title="确定合并客户"
      v-model="isShowConfirmModal"
      @ok="onSubmit"
      @cancel="isShowConfirmModal = false"
    >
      <div class="confirm-modal">
        <p>是否合并{{ hasChecked.length }}个客户</p>
        <p>并将{{ curMaster }}设置为主账号</p>
        <p class="tip-content">
          合并后，被合并的子账号不能使用系统
          合并后，子客户不能再进行编辑/跟进。此操作无法撤销。
        </p>
      </div>
    </oa-modal>
  </oa-modal>
</template>
<script>
import customerMergeItem from '../../fragments/customer-merge-item'
import { searchMergeCustom, sendMergeCustom } from '@/api/pay'
export default {
  name: 'CustomerMerge',
  data() {
    return {
      show: false,
      customList: [],
      keywords: '',
      pagination: {
        current: 1, // 分页当前页
        total: 0, // 分页总数
        pageSize: 20 // 每页数量
      },
      isAcitve: false,
      hasChecked: [],
      activeCheckedMain: false, // 设为主账号
      master_leads_id: '',
      isShowConfirmModal: false,
      curMaster: ''
    }
  },
  components: {
    customerMergeItem
  },
  computed: {},
  created() {
    // this.searchCustom()
  },
  methods: {
    showConfirmModal() {
      if (!this.master_leads_id) {
        this.$message.warning('请设置主账号')
        return
      }
      if (this.hasChecked.length <= 1) {
        this.$message.warning('请至少选择2个客户进行合并')
        return
      }
      this.isShowConfirmModal = true
    },
    clear() {
      this.customList.forEach(item => {
        item.activeClass = false
      })
      this.hasChecked = []
    },
    selectCurItem(item) {
      const that = this
      item.activeClass = !item.activeClass
      if (item.activeClass) {
        this.hasChecked.push(item)
      } else {
        let id = item.id
        this.hasChecked = this.hasChecked.filter(
          (item, index) => item.id !== id
        )
      }
      // this.hasChecked = []
      // this.customList.filter(function(item) {
      //   if (item.activeClass === true) {
      //     that.hasChecked.push(item)
      //   }
      //   return that.hasChecked
      // })
    },
    getCheckedMain(para) {
      this.master_leads_id = para
      this.customList.filter(item => {
        if (para === item.id) {
          item.activeCheckedMain = true
          this.curMaster = item.brand_name
        } else {
          item.activeCheckedMain = false
        }
      })
    },
    searchCustom() {
      searchMergeCustom({
        keywords: this.keywords,
        p: this.pagination.current,
        ps: this.pagination.pageSize
      }).then(res => {
        this.customList = res.list instanceof Array && res.list
        this.customList = this.customList.map(item => {
          let curArr = this.hasChecked.filter(cur => cur.id === item.id)
          let cur = null
          if (curArr && curArr.length) cur = curArr[0]
          return {
            activeClass: cur ? cur.activeClass : false,
            activeCheckedMain: cur ? cur.activeCheckedMain : false,
            ...item
          }
        })
        this.pagination.total = res.pager.t
      })
    },
    mergeCustom() {
      const slave_leads_id = []
      const that = this
      this.hasChecked.filter(function(item) {
        /* eslint-disable */
        if (item.id == that.master_leads_id) {
          return
        } else {
          slave_leads_id.push(item.id)
        }
      })
      sendMergeCustom({
        master_leads_id: this.master_leads_id,
        slave_leads_id: slave_leads_id
      }).then(res => {
        this.$message.success('合并成功')
        this.isShowConfirmModal = false
        this.show = false
      })
    },
    onSearch() {
      let keys = this.keywords.split(/\;|\；/)
      if (keys.length > 2) {
        this.$info({
          title: '提示',
          content: '同时搜索客户超过2个,请重新选择',
          maskClosable: true
        })
      } else {
        this.hasChecked = []
        this.searchCustom()
      }
    },
    onSubmit() {
      // this.isShowConfirmModal =true;
      this.mergeCustom()
    },
    pageChange(p) {
      this.pagination.current = p
      this.searchCustom()
    }
  }
}
</script>
<style lang="less" scoped>
.merge {
  position: relative;
  .tip {
    margin: 16px 0;
  }
  .content {
    height: 500px;
    overflow: auto;
  }
  .empty{
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .merge-item-wrap {
    border: 1px solid #d9d9d9;
    margin-bottom: 16px;
  }
  .active {
    border: 1px solid rgba(24, 144, 255, 1);
  }
}
.confirm-modal {
  padding: 24px 64px;
  p {
    height: 22px;
    font-size: 14px;
    text-align: center;
  }
  .tip-content {
    height: 44px;
    margin-top: 24px;
    color: rgba(0, 0, 0, 0.25);
  }
}
</style>
