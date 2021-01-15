<template>
  <div class="contact">
    <oa-table
      :loading="getContactInfo$loading"
      :columns="tableOptions.columns"
      :dataSource="contactInfo"
      @change="onTableChange"
      rowKey="id"
      :pager="pager"
      :showFullScreen="false"
    >
      <template slot="mobile" slot-scope="text, record">
        {{ record.mobile }}
        <crm-call
          :leads_id="headerInfo.id"
          :callNumber="record.mobile"
          :customerType="customerType"
        ></crm-call>
      </template>
      <template slot="action" slot-scope="text, record">
        <oa-table-actions>
          <div class="editable-row-operations">
            <a
              href="javascript:;"
              v-modal-link="{
                name: 'contact-edit',
                props: { editInfo: record },
                on: { editContactInfo: saveContactInfo }
              }"
              v-if="record.auth_area['web/contact/edit']"
            >
              编辑
            </a>
            <a
              href="javascript:;"
              @click="deleteContact(record)"
              v-if="record.auth_area['web/contact/delete']"
            >
              删除
            </a>
          </div>
        </oa-table-actions>
      </template>
    </oa-table>
  </div>
</template>
<script>
import { getDetailContactInfo } from '@/api/leads'
import { editContact, contactDelete } from '@/api/contact'
import tableMixins from 'oa-core/mixins/table'
import { get } from 'lodash-es'
import { tableOptions } from './contact#config'
import { mapGetters } from 'vuex'
export default {
  name: 'Contact',
  mixins: [tableMixins],
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      contactInfo: [],
      pager: {
        p: 1, // 分页当前页
        ps: 10 // 每页数量
      }
    }
  },
  created() {
    this.getContactInfo()
  },
  computed: {
    tableOptions,
    customerType() {
      return get(this.headerInfo, 'type')
    },
    ...mapGetters('leads', ['leads_sn', 'is_add_contact'])
  },
  async: {
    getContactInfo() {
      return getDetailContactInfo({
        leads_sn: this.leads_sn,
        p: this.pager.p,
        ps: this.pager.ps
      }).then(res => {
        this.contactInfo = get(res, 'list', [])
        this.pager = res.pager
      })
    }
  },
  methods: {
    onTableChange(pagination, filter, sorter) {
      this.pager.p = pagination.current
      this.getContactInfo()
    },
    saveContactInfo(para) {
      editContact({ ...para }).then(res => {
        this.$message.success('编辑成功')
        this.getContactInfo()
      })
    },
    contactConfirmContent(name) {
      console.log(name)
      return (
        <div class="contact-confirm-content">
          <div class="contact-confirm-content__item">
            是否删除联系人
            <span class="contact-confirm-content__name">{name}</span>?
          </div>
          <div class="contact-confirm-content__item">联系人删除后不可恢复</div>
        </div>
      )
    },
    deleteContact(record) {
      this.$confirm({
        title: '确认删除',
        content: this.contactConfirmContent(record.name),
        onOk: () => {
          return contactDelete({
            id: record.id
          })
            .then(res => {
              this.$message.success('删除成功')
              this.getContactInfo()
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    }
  },
  watch: {
    is_add_contact(val) {
      this.getContactInfo()
    }
  }
}
</script>
<style lang="less" scoped>
.contact {
  padding: 0 24px;
  margin-top: -24px;
}
.contact-confirm-content {
  &__name {
    color: #1890ff;
    display: inline-block;
  }
}
</style>
