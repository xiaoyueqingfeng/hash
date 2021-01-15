<template>
  <a-upload
    class="oa-avatar-upload"
    :showUploadList="false"
    listType="picture-card"
    :customRequest="upload"
  >
    <div
      class="avatar_wrap"
      @mouseover="uploadTextHandler(1)"
      @mouseout="uploadTextHandler(0)"
    >
      <img
        :src="imageUrl | avatarFilter({ w: 208, h: 208 })"
        alt="avatar"
        class="avatar"
      />
      <a-icon v-if="loading" type="loading" class="loading" />
      <transition name="fade">
        <div class="ant-upload-text" v-if="isTextVisible">编辑</div>
      </transition>
    </div>
  </a-upload>
</template>
<script>
import { ossService } from 'oa-core/utils/oss.service'
import { OA } from 'oa-core/constants/oss'

export default {
  name: 'UploadAvatar',
  data() {
    return {
      loading: false,
      isTextVisible: false,
      imageUrl: ''
    }
  },
  props: {
    sizeLimit: {
      type: Number,
      default: 5
    },
    fileType: {
      type: String,
      default: 'jpg,png,jpeg,bmp,gif'
    },
    value: {
      type: String
    },
    href: {
      type: String
    }
  },
  watch: {
    href(newVal) {
      this.imageUrl = newVal
    }
  },
  created() {
    this.imageUrl = this.href
  },
  methods: {
    uploadTextHandler(status) {
      if (this.loading) {
        return
      }
      this.isTextVisible = status
    },
    upload(data) {
      const file = data.file
      this.loading = true
      return ossService
        .put(file, {
          sizeLimit: this.sizeLimit,
          fileType: this.fileType,
          serviceType: OA
        })
        .then(res => {
          this.$emit('input', res.key)
          this.$emit('change', res.key)
          this.imageUrl = URL.createObjectURL(file)
        })
        .catch(e => {
          this.$message.error(e.message)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less">
@uploadAvatarWidth: 104px;
.oa-avatar-upload {
  .cur-p;
  .ant-upload {
    .pos-r;
    &.ant-upload-select-picture-card {
      .bd-n;
      .mg-r(0);
      .mg-b(0);
      display: inline-block;
      .bg(transparent);
      .ant-upload-btn {
        .pd(0);
      }
      i {
        .fz(32px);
        .c(#999);
      }
    }
  }
  .avatar_wrap {
    border-radius: 100%;
    border: 3px solid rgba(24, 144, 255, 0.1);
  }
  .avatar {
    .s(@uploadAvatarWidth, @uploadAvatarWidth);
    border-radius: 100%;
  }
  .loading,
  .ant-upload-text {
    .pos-a;
  }
  .loading {
    .pos-a;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ant-upload-text {
    .bg(rgba(24, 144, 255, 0.65));
    border-radius: 100%;
    .s(@uploadAvatarWidth, @uploadAvatarWidth);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .fz(18px);
    .c(#fff);
    .ta-c;
    .lh(@uploadAvatarWidth);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
