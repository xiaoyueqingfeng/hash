<template>
  <oa-modal
    :class="b()"
    :title="title"
    v-model="show"
    :confirmLoading="lockImport$loading"
    @ok="handlerLockerUpload"
  >
    <oa-filelist-upload
      :class="b('input')"
      :fileCountLimit="1"
      fileType="xls,xlsx"
      tips="支持扩展名：xls或.xlsx文件且不超过50kb"
      @change="handlerLockerFilesChange"
    ></oa-filelist-upload>
  </oa-modal>
</template>

<script>
import { lockImport } from '@/api/cabinet'

export default {
  name: 'locker-upload',

  bem: {
    b: 'locker-upload'
  },

  components: {},

  props: {
    group_id: {
      type: Number,
      required: true
    },
    title: {
      type: String
    }
  },

  data() {
    return {
      show: true,
      lockerFiles: []
    }
  },

  computed: {},

  async: {
    lockImport(data) {
      return lockImport(data)
    }
  },

  mounted() {},

  methods: {
    handlerLockerFilesChange(list) {
      console.log('handlerLockerFilesChange', list)
      this.lockerFiles = list
    },
    handlerLockerUpload() {
      if (!this.lockerFiles.length) {
        this.$error({
          title: '提示',
          content: '请上传锁表文件'
        })
        return
      }
      let oos_key = this.lockerFiles[0].key
      this.lockImport({
        group_id: this.group_id,
        oos_key
      }).then(res => {
        this.show = false
        this.$message.success('导入锁表成功')
        this.$emit('done')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.locker-upload {
  &__input {
    width: 280px;
    margin: 0 auto;
  }
}
</style>
