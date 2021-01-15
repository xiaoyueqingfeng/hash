<template>
  <tr
    class="crm-circle-legend-item g2-legend-list-item"
    :class="
      `item-${index} ${
        checked ? 'checked' : 'unchecked'
      } crm-circle-legend-item--${from}`
    "
    :data-value="text"
    :data-color="color"
  >
    <td>
      <i class="g2-legend-marker" :style="{ backgroundColor: color }"></i>
      <span class="g2-lengend-text crm-circle-legend-item__text">
        {{ text }}
      </span>
      <a-divider type="vertical"></a-divider>
      <span class="crm-circle-legend-item__percent">{{ percent }}</span>
      <div class="crm-circle-legend-item__value">{{ value }}</div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    percent: {
      type: [Number, String],
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    checked: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    // 应用场景来源
    from: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="less">
.crm-circle-legend-item {
  &--leads {
    display: block !important;
  }
  &--server {
    .crm-circle-legend-item__value {
      display: inline-block;
    }
  }
  &__percent {
    display: inline-block;
    .w(40px);
    .c(@text-light);
  }
  &__value {
    display: none;
    .w(60px);
    .ta-r;
  }
}
</style>
