<template>
  <div class="oa-image-upload">
    <div id="viewer-image">
      <div
        class="oa-image-upload__item oa-preview-item"
        v-for="(item, index) in fileList"
        :key="item.key"
        :style="sizeStyle"
      >
        <img
          class="oa-image-upload__item-img"
          :src="item.url | imgFilter(computedFilterOptions)"
          :key="item.key || item.url"
          @click="onClickView"
          width="100%"
          height="100%"
        />
        <slot name="item-extra" :item="item" :index="item.key"></slot>
        <div class="oa-image-upload__actions">
          <slot name="actions" :item="item" :index="index">
            <span class="action" @click="onDel(index)">删除</span>
          </slot>
        </div>
      </div>
    </div>
    <a-upload
      v-if="!isOverNumLimit"
      listType="picture-card"
      :showUploadList="false"
      :beforeUpload="
        (file, fileList) => {
          return beforeUpload(file, fileList)
        }
      "
      :customRequest="upload"
      :multiple="multiple"
      class="oa-image-upload__btn"
      :style="sizeStyle"
    >
      <a-spin :spinning="isLoading" :tip="progress + '%'">
        <slot>
          <a-icon type="plus" />
          <div class="oa-image-upload__title">{{ title }}</div>
          <div class="oa-image-upload__placeholder">{{ placeholder }}</div>
        </slot>
      </a-spin>
    </a-upload>
  </div>
</template>
<script>
import { ossService } from 'oa-core/utils/oss.service'
import { OA, SASS, SASS_PRIVATE } from 'oa-core/constants/oss'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

const defaultSize = {
  w: '182px',
  h: '114px'
}
export default {
  props: {
    /**
     * 初始图片列表 example: [{key:'enclosure/20190510/ie2r8i2ic.jpg',url:'http://a.png'}]
     * 当url和key都有值的时候以url为准
     */
    value: {
      type: Array
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '上传照片'
    },
    /**
     * 上传按钮的文字
     */
    placeholder: {
      type: String,
      default: '大小不超过5M，建议尺寸16:9'
    },
    /**
     * 最多可上传图片数量
     */
    numLimit: {
      type: Number,
      default: 1
    },
    /**
     * 单张图片最大 size，单位 M
     */
    sizeLimit: {
      type: Number,
      default: 5
    },
    /**
     * 图片类型
     */
    fileType: {
      type: String,
      default: 'jpg, jpeg, png, bmp'
    },
    /**
     * 图片及上传按钮的宽度
     */
    width: {
      type: String,
      default: defaultSize.w
    },
    /**
     * 图片及上传按钮的宽度
     */
    height: {
      type: String,
      default: defaultSize.h
    },
    /**
     * 缩略图filter选项 同imgFilter选项
     */
    filterOptions: {
      type: Object,
      default: () => ({})
    },
    isSaas: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      isLoading: false,
      count: 0,
      progress: 0,
      viewer: null,
      uploadData: []
    }
  },
  mounted() {
    this.fileList = this.value || []
  },
  watch: {
    value(newVal) {
      this.fileList = this.value || []
    }
  },
  computed: {
    multiple() {
      return this.numLimit > 1
    },
    isOverNumLimit() {
      return this.fileList.length > this.numLimit - 1
    },
    sizeStyle() {
      return `width: ${this.width};  height: ${this.height}`
    },
    computedFilterOptions() {
      const w = parseInt(this.width) * 2
      const h = parseInt(this.height) * 2
      return Object.assign({ w, h }, this.filterOptions)
    }
  },
  methods: {
    onClickView() {
      this.$nextTick().then(() => {
        if (this.viewer) {
          this.viewer.update()
        } else {
          this.viewer = new Viewer(document.getElementById('viewer-image'), {})
        }
      })
    },
    beforeUpload(file, fileList) {
      if (fileList.length + this.fileList.length > this.numLimit) {
        this.$message.error(`最多只能上传${this.numLimit}张图片`)
        return false
      }
      return Promise.resolve()
    },
    onDel(index) {
      this.fileList.splice(index, 1)
    },
    upload(data) {
      this.isLoading = true
      let serviceType
      if (this.isSaas) {
        if (this.isPrivate) {
          serviceType = SASS_PRIVATE
        } else {
          serviceType = SASS
        }
      } else {
        if (this.isPrivate) {
          serviceType = OA_PRIVATE
        } else {
          serviceType = OA
        }
      }
      ossService
        .put(data.file, {
          sizeLimit: this.sizeLimit,
          serviceType: serviceType,
          fileType: this.fileType,
          onProgress: e => {
            this.progress = parseInt((e.loaded / e.total) * 100)
          }
        })
        .then(res => {
          this.fileList.push({
            url: res.url,
            key: res.key
          })
          this.$emit('input', this.fileList)
          this.$emit('change', this.fileList)
        })
        .catch(e => {
          this.$message.error(e.message)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less">
.oa-image-upload {
  position: relative;
  display: inline-block;
  vertical-align: top;
  display: flex;
  &__item {
    display: inline-block;
    vertical-align: top;
    position: relative;
    transition: all 0.5s;
    border-radius: 4px;
    border: 1px solid @border-color;
    .mg-r(8px);
    .pd(8px);
  }
  &__item-img,
  &__btn {
    display: inline-block;
  }
  &__item-img {
    object-fit: cover;
  }
  &__list,
  &__btn {
    vertical-align: top;
  }
  .anticon-plus {
    .fz(24px);
    .c(rgba(0, 0, 0, 0.45));
  }
  &__title {
    .fz(14px);
    .lh(20px);
    .c(@text-light);
    .mg-t(8px);
  }
  &__placeholder {
    .mg-t(6px);
    .fz(12px);
    .lh(20px);
    .c(rgba(0, 0, 0, 0.25));
    white-space: nowrap;
  }
  &__actions {
    position: absolute;
    width: 100%;
    height: 32px;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.45);
    text-align: right;
    padding: 0 6px;
  }

  .action {
    font-size: 12px;
    cursor: pointer;
    line-height: 32px;
    padding: 0 3px;
    color: rgba(255, 255, 255, 0.85);
  }
  .ant-upload {
    width: 100%;
    height: 100%;
  }
}
</style>
