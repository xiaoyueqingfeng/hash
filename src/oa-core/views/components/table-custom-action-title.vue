<template>
  <span slot="actionTitle" class="actionTitle">
    <a-dropdown :trigger="['click']" @visibleChange="visibleChange">
      <a class="ant-dropdown-link" href="#">
        <span>操作</span>
        <div class="icon_table" :class="{ active: visible }"></div>
      </a>
      <a-menu slot="overlay">
        <a-menu-item key="0" v-if="authKey">
          <a href="javascript:;" @click="handleOpenFilter">设置显示字段</a>
        </a-menu-item>
        <a-menu-item key="1" v-if="showFullScreen">
          <a href="javascript:;" @click="handleTableFix">
            {{ isFullscreen ? '退出全屏模式' : '表格最大化' }}
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </span>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: '',

  components: {},

  props: {
    showFullScreen: {
      type: Boolean,
      default: true
    },
    authKey: String
  },

  data() {
    return {
      isFullscreen: false,
      visible: false
    }
  },

  computed: {},

  async: {},

  created() {
    // 监听切换全屏事件
    if (this.showFullScreen) this.listenFullScreen()
  },

  beforeDestroy() {
    if (this.isFullscreen) this.toggleFullScreen()
  },

  methods: {
    handleOpenFilter() {
      this.visible = false
      let auth_key = this.authKey
      this.$modalRouter.push({
        name: 'system-table-columns-set',
        props: {
          auth_key
        },
        on: {
          done: () => {
            this.$emit('resetTable')
          }
        }
      })
    },
    // 表格最大化
    handleTableFix() {
      this.visible = false
      this.toggleFullScreen()
    },
    visibleChange(e) {
      this.visible = e
    },
    toggleFullScreen() {
      return new Promise(resolve => {
        if (screenfull.isFullscreen) {
          screenfull.exit()
        } else {
          screenfull.request()
        }
        // end
        resolve()
      })
    },
    listenFullScreen() {
      return new Promise(resolve => {
        if (screenfull.enabled) {
          screenfull.on('change', () => {
            this.isFullscreen = screenfull.isFullscreen
            this.$emit('fullScreen', this.isFullscreen)
          })
        }
        // end
        resolve()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-dropdown-link {
  text-decoration: none;
  color: #000000;
  height: 24px;
  display: flex;
  span {
    line-height: 24px;
  }
}
.icon_table {
  width: 24px;
  height: 24px;
  background: url('../../assets/img/icon_table_arrow@2x.png') no-repeat;
  background-size: cover;
}
.icon_table.active {
  background: url('../../assets/img/icon_table_arrow_active@2x.png') no-repeat;
  background-size: cover;
}
.icon_table:hover {
  background: url('../../assets/img/icon_table_arrow_active@2x.png') no-repeat;
  background-size: cover;
}
</style>
