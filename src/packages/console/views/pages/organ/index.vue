<template>
  <a-row class="organ-box">
    <a-col :lg="5">
      <oa-panel>
        <index-sider-menu
          :data="organTree"
          :value="organ_id"
          @click="onClick"
        />
      </oa-panel>
    </a-col>
    <a-col :lg="19">
      <oa-panel>
        <index-main
          :organInfo="currentOrgan"
          @reload="getOrganList"
        ></index-main>
      </oa-panel>
    </a-col>
  </a-row>
</template>

<script>
import IndexSiderMenu from './index#/sider-menu'
import IndexMain from './index#/main'
import { getOrganList } from '@/api/organ'
import { listToTree } from 'oa-core/utils/list-to-tree'
import { cloneDeep, find } from 'lodash-es'

const redirect = (to, from, next) => {
  if (!to.query.organ_id) {
    next({ name: to.name, query: { organ_id: '1' } })
  } else {
    next()
  }
}

export default {
  name: 'OrganIndex',
  components: {
    IndexSiderMenu,
    IndexMain
  },
  computed: {
    organ_id() {
      return this.$route.query.organ_id
    },
    currentOrgan() {
      return find(this.organList, { id: this.organ_id })
    }
  },
  data() {
    return {
      organList: [],
      organTree: []
    }
  },
  beforeRouteEnter: [redirect],
  beforeRouteUpdate: [redirect],
  mounted() {
    this.initData()
  },
  async: {
    initData() {
      return Promise.all([this.getOrganList()])
    },
    getOrganList() {
      return getOrganList().then(res => {
        this.organList = res.list
        this.organTree = listToTree(cloneDeep(res.list))
      })
    }
  },
  methods: {
    onClick(menu) {
      this.$router.push({ query: { organ_id: menu.id, status: 1 } })
    }
  }
}
</script>
<style lang="less" scoped>
.organ-box {
  background-color: #fff;
}
</style>
