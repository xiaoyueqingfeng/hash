<template>
  <a-col :span="8" v-if="order < 4">
    <div class="pk-item" :class="['pk-item--' + order]">
      <div class="pk-item__medal"></div>
      <a-avatar
        v-if="useAvatar"
        class="pk-item__avatar"
        :src="avatar | avatarFilter({ w: 58 })"
      ></a-avatar>
      <div class="pk-item__desc">
        <h4 class="pk-item__name">{{ name }}</h4>
        <p class="pk-item__number">
          <slot name="number"></slot>
        </p>
      </div>
    </div>
  </a-col>
  <a-col v-else :span="8">
    <div class="pk-item">
      <div class="pk-item__order font-number">{{ order }}</div>
      <a-avatar
        v-if="useAvatar"
        class="pk-item__avatar"
        :src="avatar | avatarFilter({ w: 40 })"
      ></a-avatar>
      <div class="pk-item__desc">
        <h4 class="pk-item__name">{{ name }}</h4>
        <p class="pk-item__number">
          <slot name="number"></slot>
        </p>
      </div>
    </div>
  </a-col>
</template>

<script>
export default {
  props: {
    order: {
      type: [Number, String]
    },
    avatar: {
      type: String
    },
    name: {
      type: String
    },
    useAvatar: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
.pk-item {
  align-items: center;
  display: flex;
  .mg-b(40px);
  &--1,
  &--2,
  &--3 {
    .pk-item__order {
      display: none;
    }
    .pk-item__name {
      .fz(16px);
      .lh(24px);
      .c(@title);
    }
  }
  &--1 {
    .pk-item__medal {
      background-image: url('~@/assets/images/medal-1.png');
    }
    .pk-item__avatar {
      border-color: #fac811;
    }
  }
  &--2 {
    .pk-item__medal {
      background-image: url('~@/assets/images/medal-2.png');
    }
    .pk-item__avatar {
      border-color: #979797;
    }
  }
  &--3 {
    .pk-item__medal {
      background-image: url('~@/assets/images/medal-3.png');
    }
    .pk-item__avatar {
      border-color: #f4d3b6;
    }
  }
  &__medal {
    .s(32px, 32px);
    .mg-r(30px);
    background-size: cover;
    flex-shrink: 0;
  }

  &__order {
    .fz(18px);
    .s(26px, 26px);
    .lh(26px);
    .ta-c;
    border-radius: 50%;
    .bg(#f0f2f5);
    .c(@text);
    .mg-r(34px);
  }
  &__avatar {
    .s(50px, 50px);
    .mg-r(16px);
    border: 2px solid #f0f2f5;
    flex-shrink: 0;
  }
  &__desc {
    overflow: hidden;
  }
  &__name {
    .fz(14px);
    .lh(22px);
    .c(@text);
    .mg-b(0);
    .tov-e;
  }
  &__number {
    .mg-b(0);
  }
}
</style>
