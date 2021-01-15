<template>
  <a-modal
    :wrapClassName="['oa-modal', wrapClassName].join(' ')"
    v-model="model"
    :width="width"
    v-bind="$attrs"
    :closable="false"
    v-on="$listeners"
  >
    <slot name="prepend"></slot>
    <div class="oa-modal__body">
      <slot></slot>
    </div>
    <slot name="footer" slot="footer"></slot>
    <span class="close" @click="close"></span>
  </a-modal>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '484px'
    },
    wrapClassName: {
      type: String
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        this.$emit('input', newVal)
      }
    }
  },
  data() {
    return {
      antModalEl: null,
      antModalContentEl: null
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    clickModal() {
      this.close()
    },
    clickModalContent(e) {
      e.stopPropagation()
    }
  },
  mounted() {
    this.antModalEl = document.querySelector('.ant-modal')
    this.antModalContentEl = document.querySelector('.ant-modal-content')
    if (this.antModalEl && this.antModalContentEl) {
      this.antModalEl.addEventListener('click', this.clickModal, false)
      this.antModalContentEl.addEventListener(
        'click',
        this.clickModalContent,
        false
      )
      document.body.style = 'overflow:hidden;padding-right:6px;'
    }
  },
  beforeDestroy() {
    if (this.antModalEl && this.antModalContentEl) {
      this.antModalEl.removeEventListener('click', this.clickModal, false)
      this.antModalContentEl.removeEventListener(
        'click',
        this.clickModalContent,
        false
      )
    }
  },
  destroyed() {
    if (document.querySelector('.oa-page-modal')) {
      document.body.style = 'overflow:hidden;padding-right:6px;'
    } else {
      document.body.style = ''
    }
  }
}
</script>

<style lang="less">
@top: 24px;
@bottom: 24px;
@headerHeight: 55px;
@footerHeight: 80px;
@bodyMaxHeightOffset: (@top+ @bottom+ @headerHeight+ @footerHeight);

@media (max-width: 767px) {
  .oa-modal {
    .ant-modal {
      .mg(0);
      .pd(8px);
    }
  }
}
.oa-modal {
  &__body {
    .pd(24px);
  }
  .ant-modal {
    .pos-a;
    top: @top;
    bottom: @bottom;
    left: 0;
    right: 0;
    .pd-b(0);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-modal-body {
    .pd(0);
  }

  .ant-modal-content {
    .w(100%);
  }
  .ant-modal-body {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: calc(100vh - @bodyMaxHeightOffset);
  }
  .ant-modal-footer {
    .pd(24px);
  }
  .close {
    position: absolute;
    right: 16px;
    top: 24px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    background: url('../../assets/img/modal_close.png') no-repeat;
    background-size: cover;
  }
}
</style>
