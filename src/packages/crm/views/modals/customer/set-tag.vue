<template>
  <oa-modal
    title="设置标签"
    v-model="show"
    @ok="onSubmit"
    :confirmLoading="addTagLeads$loading"
  >
    <p class="ta-c">{{ customerName }}</p>
    <a-spin :spinning="getTagSet$loading">
      <ul class="tag-list mg-t16">
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
    </a-spin>
  </oa-modal>
</template>
<script>
import { getTagSet, addTagLeads } from '@/api/tag.js'
import { get, map } from 'lodash-es'
export default {
  data() {
    return {
      show: true,
      tagIds: [],
      tagOptions: []
    }
  },
  props: {
    customerName: {
      type: String
    },
    customerId: {
      type: String,
      required: true
    },
    tagLimitNumber: {
      type: Number,
      default: 6
    }
  },
  mounted() {
    this.getTagSet()
  },
  computed: {},
  async: {
    getTagSet() {
      return getTagSet({ leads_id: this.customerId }).then(res => {
        this.tagOptions = get(res, 'tags', [])
        let tagList = get(res, 'leads_tags', [])
        this.tagIds = map(tagList, 'id', [])
      })
    },
    addTagLeads(data) {
      return addTagLeads(data)
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
        if (this.tagIds.length > this.tagLimitNumber - 1) {
          this.$message.error('最多设置6个标签')
          return
        }
        this.tagIds.push(id)
      }
    },
    onSubmit() {
      this.addTagLeads({
        leads_id: this.customerId,
        tag_ids: this.tagIds.join(',')
      }).then(res => {
        this.$message.success('设置标签成功！')
        this.show = false
        this.$emit('done')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.tag-item {
  display: inline-block;
  .fz(14px);
  .lh(20px);
  .mg-t(8px);
  .ta-c;
  min-width: 28px;
  padding: 0 6px;
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
    .c(#3ba0ff);
    .bg(rgba(#3ba0ff, 0.2));
  }
}
</style>
