<template>
  <a-popover
    trigger="hover"
    placement="bottom"
    arrowPointAtCenter
    @visibleChange="handleHoverChange"
  >
    <div slot="content" class="contactTable">
      <oa-table
        rowKey="id"
        :loading="getContactList$loading"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="false"
        :showFullScreen="false"
        style="width: 400px"
      >
        <template slot="name" slot-scope="main">
          <span class="mg-r8">{{ main.name }}</span>
          <oa-tag type="kp-type" :value="1" v-if="main.kp === '1'" />
        </template>
        <template slot="mobile" slot-scope="main">
          <span class="mg-r8">{{ main.mobile }}</span>
          <crm-call
            :leads_id="record.id"
            :contact_id="main.id"
            :callNumber="main.mobile"
            customerType="13"
          ></crm-call>
        </template>
        <template slot="landline" slot-scope="main">
          <span class="mg-r8">{{ main.landline }}</span>
          <crm-call
            :leads_id="record.id"
            :contact_id="main.id"
            :callNumber="main.landline"
            customerType="13"
          ></crm-call>
        </template>
      </oa-table>
    </div>
    <div class="mg-r8">
      <oa-icon type="shoujibeifen" />
    </div>
  </a-popover>
</template>

<script>
import { getContactList } from '@/api/pay'
import { get } from 'lodash-es'
export default {
  name: 'table-column-phone',

  components: {},

  props: {
    record: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: '联系人',
          scopedSlots: {
            customRender: 'name'
          }
        },
        {
          title: '手机号',
          width: 150,
          scopedSlots: {
            customRender: 'mobile'
          }
        },
        {
          title: '座机号',
          width: 150,
          scopedSlots: {
            customRender: 'landline'
          }
        }
      ]
    }
  },

  computed: {},

  async: {
    getContactList(leads_sn) {
      return getContactList({
        leads_sn
      }).then(res => {
        let contactList = Array.isArray(res) ? res : []
        this.dataSource = contactList
        return contactList
      })
    }
  },

  mounted() {},

  methods: {
    handleHoverChange(e) {
      let current = this.dataSource
      if (current.length) return current
      else return this.getContactList(this.record.sn)
    }
  }
}
</script>

<style lang="less" scoped></style>
