<template>
  <add isEditMode v-if="info.name" :info="info"></add>
</template>

<script>
import Add from './add'
import { updateShow } from '@/api/goods'
export default {
  name: 'GoodsEdit',
  data() {
    return {
      info: {}
    }
  },
  async: {
    updateShow(data) {
      return updateShow(data).then(res => {
        this.setFormData(res)
      })
    }
  },
  computed: {
    goodsSn() {
      return this.$route.query.goods_sn
    }
  },
  components: {
    Add
  },
  methods: {
    setFormData(res) {
      res.goods_images = res.goods_images.map(item => {
        item.key = item.image_key
        item.url = item.image_url
        return item
      })
      this.info = res
    }
  },
  created() {
    this.updateShow({ goods_sn: this.goodsSn })
  }
}
</script>
