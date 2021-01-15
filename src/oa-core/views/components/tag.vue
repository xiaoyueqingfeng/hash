<template>
  <div
    class="oa-tag"
    :class="['oa-tag--type-' + type, 'oa-tag--value-' + value]"
  >
    <slot>{{ labelText }}</slot>
  </div>
</template>

<script>
const TAG_CONFIG = {
  /**
   * 品牌类型
   */
  'brand-category': [
    { label: '', value: 1 },
    { label: '', value: 2 },
    { label: '', value: 3 },
    { label: '', value: 4 },
    { label: '', value: 5 }
  ],
  'brand-level': [
    { label: '暂无', value: '0' },
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' },
    { label: 'D', value: '4' },
    { label: 'F', value: '6' }
  ],
  'serve-level': [
    { label: '暂无', value: '0' },
    { label: 'C1', value: '1' },
    { label: 'C2', value: '2' },
    { label: 'C3', value: '3' },
    { label: 'C4', value: '4' },
    { label: 'C0', value: '5' }
  ],
  'work-model': [{ label: '工', value: '1' }, { label: '俱', value: '99' }],
  'menu-model': [{ label: '品牌', value: '1' }, { label: '门店', value: '2' }],
  'brand-tag': [{ label: 'S', value: '1' }, { label: 'I', value: '2' }],
  'vip-type': [{ label: 'VIP', value: '1' }],
  'kp-type': [{ label: 'kp', value: '1' }]
}

export default {
  name: 'tag',
  data() {
    return {}
  },
  props: {
    /**
     * tag 类型
     */
    type: {
      type: String
    },
    /**
     * tag值
     */
    value: {
      type: [String, Number]
    }
  },
  computed: {
    labelText() {
      const findedConfig = TAG_CONFIG[this.type]
      if (!findedConfig) {
        throw new Error(`[oa-tag] tag type [${this.type}] is not found`)
      }
      const findedTag = findedConfig.find(item => {
        return item.value === this.value || +item.value === +this.value
      })
      if (!findedTag) {
        return ''
      }
      return findedTag.label
    }
  }
}
</script>
<style lang="less">
.oa-tag {
  display: inline-block;
  vertical-align: middle;
  // 品牌类型
  &--type-brand-category {
    width: 66px;
    height: 22px;
    &.oa-tag--value-1 {
      background: url('../../assets/img/leads.png');
      background-size: cover;
    }
    &.oa-tag--value-2 {
      background: url('../../assets/img/potential.png');
      background-size: cover;
    }
    &.oa-tag--value-3 {
      background: url('../../assets/img/termination.png');
      background-size: cover;
    }
    &.oa-tag--value-4 {
      background: url('../../assets/img/discard.png');
      background-size: cover;
    }
    &.oa-tag--value-5 {
      background: url('../../assets/img/pay.png');
      background-size: cover;
    }
  }

  // 品牌等级
  &--type-brand-level {
    height: 22px;
    .c(@white);
    .pd-lr(8px);
    background: rgba(255, 108, 126, 1);
    border-radius: 2px;
  }

  // 服务等级
  &--type-serve-level {
    .pd-lr(8px);
    height: 22px;
    .c(@white);
    background: rgba(54, 203, 203, 1);
    border-radius: 2px;
  }

  // 版本
  &--type-work-model {
    width: 24px;
    height: 24px;
    line-height: 24px;
    .ta-c;
    border-radius: 2px;
    font-weight: 500;
    color: @white;
    &.oa-tag--value-1 {
      background: linear-gradient(
        180deg,
        rgba(255, 189, 79, 1) 0%,
        rgba(235, 143, 47, 1) 100%
      );
      border-radius: 2px;
    }
    &.oa-tag--value-99 {
      background: linear-gradient(
        180deg,
        rgba(145, 109, 207, 1) 0%,
        rgba(86, 50, 148, 1) 100%
      );
      border-radius: 2px;
    }
  }
  // 菜单
  &--type-menu-model {
    width: 48px;
    height: 24px;
    line-height: 24px;
    .ta-c;
    border-radius: 2px;
    font-weight: 500;
    color: @white;
    &.oa-tag--value-1 {
      background: linear-gradient(
        180deg,
        rgba(255, 189, 79, 1) 0%,
        rgba(235, 143, 47, 1) 100%
      );
      border-radius: 2px;
    }
    &.oa-tag--value-2 {
      background: linear-gradient(
        180deg,
        rgba(145, 109, 207, 1) 0%,
        rgba(86, 50, 148, 1) 100%
      );
      border-radius: 2px;
    }
  }
  &--type-vip-type {
    .fz(14px);
    .lh(20px);
    .ta-c;
    &.oa-tag--value-1 {
      border: 1px solid currentColor;
      .c(#fcb642);
      .bg(rgba(#fcb642, 0.2));
    }
  }
  &--type-kp-type {
    border-radius: 2px;
    border: 1px solid currentColor;
    .fz(14px);
    .lh(20px);
    .ta-c;
    &.oa-tag--value-1 {
      .w(24px);
      .c(#00e3b3);
      .bg(rgba(#00e3b3, 0.2));
    }
  }
  &--type-brand-tag {
    border-radius: 2px;
    border: 1px solid currentColor;
    .fz(14px);
    .lh(20px);
    .ta-c;
    &.oa-tag--value-1 {
      .w(24px);
      .c(#3ba0ff);
      .bg(rgba(#3ba0ff, 0.2));
    }
    &.oa-tag--value-2 {
      .w(24px);
      .c(#00e3b3);
      .bg(rgba(#00e3b3, 0.2));
    }
    &.oa-tag--value-3 {
      .w(34px);
      .c(#fcb642);
      .bg(rgba(#fcb642, 0.2));
    }
  }
}
</style>
