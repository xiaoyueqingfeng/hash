<template>
  <a-row :gutter="8" class="pk-list" :class="{ 'pk-list--avatar': useAvatar }">
    <template v-if="tab === 'organ'">
      <pk-item
        v-for="(item, idx) in list"
        :order="idx + 1"
        :useAvatar="useAvatar"
        :key="item.organ_name"
        :name="item.organ_name"
      >
        <span slot="number">{{ item.money }}</span>
        <span v-show="type === 'visit_number'" slot="number">
          {{ item.number }}
        </span>
      </pk-item>
    </template>
    <template v-if="tab === 'sale'">
      <pk-item
        v-for="(item, idx) in list"
        :order="idx + 1"
        :useAvatar="useAvatar"
        :avatar="item.avatar"
        :key="item.user_name"
        :name="item.user_name"
      >
        <span slot="number">{{ item.money }}</span>
        <span v-show="type === 'visit_number'" slot="number">
          {{ item.number }}
        </span>
      </pk-item>
    </template>
    <template v-if="tab === 'serve'">
      <pk-item
        v-for="(item, idx) in list"
        :order="idx + 1"
        :useAvatar="useAvatar"
        :avatar="item.avatar"
        :key="item.user_name"
        :name="item.user_name"
      >
        <span slot="number">{{ item.achievement }}</span>
        <span v-show="type === 'service_number'" slot="number">
          {{ item.number }}
        </span>
      </pk-item>
    </template>
    <div v-if="!list.length && !loading" class="ta-c">
      <oa-empty></oa-empty>
    </div>
  </a-row>
</template>
<script>
import PkItem from './pk-item.vue'
export default {
  components: {
    PkItem
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    tab: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    useAvatar() {
      return ['sale', 'serve'].includes(this.tab)
    }
  }
}
</script>

<style lang="less">
.pk-list {
  .pd-lr(24px);
}
</style>
