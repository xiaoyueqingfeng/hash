<template>
  <oa-modal
    title="修改等级"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="setUserTag$loading"
  >
    <a-spin :spinning="initData$loading">
      <p class="mg-t24 ta-c">
        客户
        <span class="customer-name">{{ customerName }}</span>
      </p>
      <a-row class="mg-t32">
        <a-col :offset="4" :span="20">
          <a-form>
            <a-form-item
              required
              :labelCol="{ span: 6 }"
              :wrapperCol="{ span: 18 }"
              label="客户等级"
            >
              <ul class="brand-level">
                <li
                  class="level-item"
                  v-for="item in brandOptions"
                  :key="item.id"
                  @click="brandId = item.id"
                  :class="{ active: brandId === item.id }"
                >
                  {{ item.name }}
                </li>
              </ul>
            </a-form-item>
            <!-- <a-form-item :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <span slot="label">
                <a-tooltip title="S:明星场馆 I:影响力" placement="bottom">
                  <span class="icon-help">
                    <a-icon type="exclamation-circle" />
                  </span>
                </a-tooltip>
                <span>&nbsp;选择标签</span>
              </span>
              <ul class="tag-list">
                <li
                  class="tag-item"
                  :class="[{ active: hasTag(item.id) }, 'tag-item--' + item.id]"
                  v-for="item in tagOptions"
                  :key="item.id"
                  @click="setTagId(item.id)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </a-form-item> -->
          </a-form>
        </a-col>
      </a-row>
    </a-spin>
  </oa-modal>
</template>

<script>
import { getLevelTag } from '@/api/leads'
import { getUserTag as getPotentialUserTag, setUserTag } from '@/api/potential'
import { getUserTag as getPayUserTag } from '@/api/pay'

export default {
  props: {
    customerId: {
      type: String,
      required: true
    },
    customerName: {
      type: String,
      required: true,
      default: ''
    },
    from: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true,
      brandId: '',
      tagIds: [],
      brandOptions: [],
      tagOptions: []
    }
  },

  methods: {
    hasTag(id) {
      return this.tagIds.includes(id)
    },
    setTagId(id) {
      const checked = this.hasTag(id)
      if (checked) {
        const idx = this.tagIds.findIndex(item => item === id)
        this.tagIds.splice(idx, 1)
      } else {
        this.tagIds.push(id)
      }
    },
    onSubmit() {
      this.setUserTag().then(() => {
        this.$message.success('修改等级成功！')
        this.show = false
        this.$emit('done')
      })
    }
  },
  created() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getLevelTag(), this.getUserTag()])
    },
    getLevelTag() {
      return getLevelTag().then(res => {
        this.brandOptions = res.brand_level
        this.tagOptions = res.brand_tag.map(item => {
          return {
            id: item.id,
            name: item.name.replace(/（.+）/, '')
          }
        })
      })
    },
    getUserTag() {
      let getUserTag
      if (this.from === 'potential') {
        getUserTag = getPotentialUserTag
      }
      if (this.from === 'pay') {
        getUserTag = getPayUserTag
      }
      return getUserTag({
        leads_id: this.customerId
      }).then(res => {
        this.brandId = res.brand_level.id
        this.tagIds = res.tag_list.map(item => item.id)
      })
    },
    setUserTag() {
      return setUserTag({
        leads_id: this.customerId,
        brand_level_id: this.brandId,
        brand_tag_id: this.tagIds
      })
    }
  }
}
</script>

<style lang="less" scoped>
.brand-level {
}
.customer-name {
  .c(@title);
  font-weight: 500;
  .mg-lr(4px);
}
.level-item {
  display: inline-block;
  .cur-p;
  .lh(20px);
  .fz(14px);
  .c(#ff6c7e);
  .ta-c;
  .w(28px);
  border: 1px solid #ff6c7e;
  .mg-r(8px);
  border-radius: 2px;
  transition: all 0.3s;
  &.active {
    .bg(#ff6c7e);
    .c(@white);
  }
}
.icon-help {
  .c(@text);
  .mg-r(4px);
}
.tag-item {
  display: inline-block;
  .fz(14px);
  .lh(20px);
  .ta-c;
  .w(28px);
  border: 1px solid @border-color;
  .bg(#f5f5f5);
  border-radius: 2px;
  .c(@text);
  .mg-r(8px);
  transition: all 0.3s;
  .cur-p;
  user-select: none;
  &.active {
    border-color: currentColor;
  }
  &--1.active {
    .c(#3ba0ff);
    .bg(rgba(#3ba0ff, 0.2));
  }
  &--2.active {
    .c(#00e3b3);
    .bg(rgba(#00e3b3, 0.2));
  }
  &--3.active {
    .c(#fcb642);
    .bg(rgba(#fcb642, 0.2));
  }
}
.ant-form-item {
  .mg-b(8px);
}
</style>
