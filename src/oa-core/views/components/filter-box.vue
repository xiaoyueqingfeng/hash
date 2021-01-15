<template>
  <div class="oa-filter-box">
    <div v-show="isSearchMode" class="oa-filter-box__search">
      <slot name="prepend"></slot>
      <a v-if="withToggle" @click="toggle" class="toggle mg-l8">
        <a-icon type="swap"></a-icon>
        <span class="toggle__text">切换筛选</span>
      </a>
    </div>

    <div v-show="isFilterMode" class="oa-filter-box__main">
      <div class="oa-filter-box__conditions">
        <slot></slot>
      </div>
      <div class="oa-filter-box__actions">
        <slot name="actions"></slot>
        <a v-if="withToggle" @click="toggle" class="toggle mg-l8">
          <a-icon type="swap"></a-icon>
          <span class="toggle__text">切换搜索</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // search|filter
    mode: {
      type: String,
      default: 'filter'
    },
    // 使用切换筛选功能
    withToggle: {
      type: Boolean,
      defualt: false
    }
  },
  methods: {
    toggle() {
      const _mode = this.mode === 'search' ? 'filter' : 'search'
      this.$emit('update:mode', _mode)
    }
  },
  computed: {
    // 默认为搜索关键词模式
    isSearchMode() {
      return this.mode === 'search'
    },
    isFilterMode() {
      return this.mode === 'filter'
    }
  }
}
</script>

<style lang="less">
.oa-filter-box {
  .ant-input-group-wrapper {
    vertical-align: middle;
  }
  .toggle {
    &__text {
      .mg-l(2px);
    }
  }
  .ant-input-search {
    .w(300px);
    .ant-input-suffix {
      .ant-btn {
        .pd-lr(7px);
      }
    }
  }
  .ant-cascader-picker,
  .ant-select {
    .w(146px);
    .mg-r(8px);
    .mg-tb(4px);
  }
  .ant-calendar-picker {
    .mg-tb(4px);
    .mg-r(8px);
    .w(300px);
  }

  &__main {
    display: flex;
    .mg-t(-4px);
    .mg-b(-4px);
  }
  &__conditions {
    flex: 1;
  }
  &__actions {
    .mg-t(4px);
  }
}
.ant-input-search-enter-button {
  .ant-input-group-addon {
    padding: 0;
    border: 0;
    .ant-input-search-button {
      width: 100%;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .ant-btn {
      .pd-lr(7px);
    }
  }
}
</style>
