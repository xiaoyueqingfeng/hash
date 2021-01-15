<template>
  <div class="update-package-manage">
    <div class="update-package-manage__filter">
      <oa-filter-box with-toggle :mode.sync="$searchQuery.mode">
        <a-input-search
          class="search"
          slot="prepend"
          enterButton
          v-model="$searchQuery.keywords"
          @search="tbOnSearchKeywords('keywords', $event)"
          placeholder="请输入更新包名称"
        ></a-input-search>
        <oa-select
          :options="apkType"
          v-model="$searchQuery.apk_type"
          placeholder="选择更新包类型"
        ></oa-select>
        <a-select
          v-model="$searchQuery.category_id"
          @change="selectCategory"
          placeholder="选择设备类型"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.category_id"
            :value="item.category_id"
          >
            {{ item.category_name }}
          </a-select-option>
        </a-select>
        <a-select
          :disabled="skuDisabled"
          v-model="$searchQuery.app_id"
          placeholder="选择产品名称"
        >
          <a-select-option
            v-for="item in skuList"
            :key="item.app_id"
            :value="item.app_id"
          >
            {{ item.app_name }}
          </a-select-option>
        </a-select>
        <a-input
          v-model="$searchQuery.version_name"
          placeholder="请输入版本号"
          class="mg-r16"
          style="width:200px"
        ></a-input>
        <oa-select
          :options="apkStatus"
          v-model="$searchQuery.apk_status"
          placeholder="选择状态"
        ></oa-select>
        <template slot="actions">
          <oa-button @click="handlerSearch" type="primary">查询</oa-button>
          <oa-button @click="handlerReset" class="mg-l8">重置</oa-button>
        </template>
      </oa-filter-box>
      <oa-button
        class="button"
        @click="addUpdatePackage"
        type="primary"
        v-if="auth_area['api/iot/add_apk']"
      >
        添加更新包
      </oa-button>
    </div>
    <div class="content mg-t16">
      <oa-table
        rowKeys="id"
        :scroll="{ x: 1200 }"
        :dataSource="dataSource"
        :loading="getApkList$loading"
        :columns="tableOptions.columns"
        :pager="pager"
        @change="tbOnTableChange"
      >
        <template slot="action" slot-scope="record">
          <oa-table-actions>
            <a
              @click="editUpdatePackage(record.id)"
              v-if="record.auth_area['api/iot/edit_apk']"
            >
              编辑
            </a>
            <a
              @click="showUpdatePackage(record.id)"
              v-if="record.auth_area['api/iot/apk_detail']"
            >
              查看
            </a>
            <a
              @click="release(record.id, 'push')"
              v-if="record.auth_area['api/iot/push_apk']"
            >
              发布
            </a>
            <a
              href="javascript:;"
              @click="release(record.id, 'rePush')"
              v-if="record.auth_area['api/iot/push_again_apk']"
            >
              再次发布
            </a>
            <a
              @click="stopRelease(record.id)"
              v-if="record.auth_area['api/iot/stop_push_apk']"
            >
              停止发布
            </a>
            <a
              @click="onlog(record.id)"
              v-if="record.auth_area['api/iot/apk_logs']"
            >
              操作日志
            </a>
            <a
              @click="online(record.id)"
              v-if="record.auth_area['api/iot/publish_apk']"
            >
              上线
            </a>
          </oa-table-actions>
        </template>
      </oa-table>
    </div>
  </div>
</template>

<script>
import {
  publishApk,
  getApkList,
  getCategoryList,
  getSkuList,
  stopPushApk
} from '@/api/iot'
import tableMixins from 'oa-core/mixins/table'
import { tableOptions } from './update-package-manage#config'
import { get } from 'lodash-es'
export default {
  name: 'update-package-manage',

  mixins: [tableMixins],

  data() {
    return {
      dataSource: [],
      auth_area: {},
      pager: {
        p: 1,
        ps: 20
      },
      apkType: [],
      apkStatus: [],
      categoryList: [],
      skuList: [],
      skuDisabled: true
    }
  },

  computed: {
    tableOptions
  },

  async: {
    publishApk(id) {
      return publishApk({
        id
      })
    },
    stopPushApk(id) {
      return stopPushApk({
        id
      })
    },
    getApkList() {
      return getApkList({ ...this.$searchQuery }).then(res => {
        this.dataSource = get(res, 'list', [])
        this.pager = res.pager
        this.mapping = res.mapping
        this.auth_area = res.auth_area
        this.apkType = []
        this.apkStatus = []
        for (let prop in res.mapping.apk_type) {
          this.apkType.push({
            id: prop,
            name: res.mapping.apk_type[prop]
          })
        }
        for (let prop in res.mapping.apk_status) {
          this.apkStatus.push({
            id: prop,
            name: res.mapping.apk_status[prop]
          })
        }
      })
    },
    // 获取设备类型列表
    getCategoryList() {
      return getCategoryList().then(res => {
        this.categoryList = get(res, 'list', [])
      })
    }
  },

  watch: {
    $route(newRoute) {
      this.$searchQuery = this.$route.meta.query
      this.getApkList()
    }
  },

  created() {
    this.getApkList()
    this.getCategoryList()
    if (this.$searchQuery.category_id) {
      this.getSkuList({
        category_id: this.$searchQuery.category_id
      })
    }
  },

  methods: {
    //选择设备类型获取sku列表
    selectCategory() {
      if (this.$searchQuery.category_id) {
        this.getSkuList({
          category_id: this.$searchQuery.category_id
        })
      }
    },
    //查询
    handlerSearch() {
      this.$router.push({
        query: {
          ...this.$searchQuery,
          p: 1,
          keywords: ''
        }
      })
    },
    //重置
    handlerReset() {
      this.skuList = []
      this.skuDisabled = true
      this.$searchQuery = { mode: 'filter', p: 1, ps: 20 }
      this.$router.push({
        query: { ...this.$searchQuery }
      })
    },
    /**
     * @description 根据关键词搜索硬件包列表
     * @param {string} keywords
     */
    onSearchKeywords(keywords) {
      this.$router.push({
        query: {
          keywords
        }
      })
    },
    /**
     * @description 添加更新包
     */
    addUpdatePackage() {
      this.$modalRouter.push({
        name: 'hardware-update-package-add',
        on: {
          done: this.getApkList
        }
      })
    },
    /**
     * @description 编辑更新包
     * @param {number} id
     */
    editUpdatePackage(id) {
      this.$modalRouter.push({
        name: 'hardware-update-package-edit',
        props: {
          id
        },
        on: {
          done: this.getApkList
        }
      })
    },
    /**
     * @description 查看更新包
     * @param {number} id
     */
    showUpdatePackage(id) {
      this.$modalRouter.push({
        name: 'hardware-update-package-show',
        props: {
          id
        }
      })
    },
    /**
     * @description 点击上线
     * @param {number} id
     */
    online(id) {
      this.$confirm({
        title: '下发提示',
        content: '即将上线更新包,上线后该更新包无法被编辑,确认上线吗?',
        onOk: () => {
          this.publishApk(id).then(() => {
            this.$success({
              title: '提示',
              content: '上线成功'
            })
            this.getApkList()
          })
        }
      })
    },
    /**
     * @description 点击上线
     * @param {number} id
     */
    onlog(id) {
      this.$modalRouter.push({
        name: 'hardware-update-package-log',
        props: {
          id
        }
      })
    },
    // 获取硬件sku列表
    getSkuList(data) {
      this.skuList = []
      return getSkuList(data).then(res => {
        this.skuDisabled = false
        this.$searchQuery.app_id = undefined
        this.skuList = get(res, 'list', [])
      })
    },
    /**
     *发布
     */
    release(id, pushType) {
      //1：发布 2：再次发布
      let pushVal
      switch (pushType) {
        case 'push':
          pushVal = 1
          break
        case 'rePush':
          pushVal = 2
          break
      }
      this.$modalRouter.push({
        name: 'hardware-release',
        props: {
          id: id,
          pushed: pushVal
        },
        on: {
          done: this.getApkList
        }
      })
    },
    /**
     *停止发布
     */
    stopRelease(id) {
      this.$confirm({
        title: '停止发布提示',
        content:
          '取消本次发布，会导致尚未更新的设备不执行本次任务，不影响已完成的设备，您确定停止吗？',
        onOk: () => {
          this.stopPushApk(id).then(() => {
            this.getApkList()
          })
        },
        confirmLoading: this.stopRelease$loading
      })
    },
    stopReleaseSubmit() {}
  }
}
</script>

<style lang="less" scoped>
.update-package-manage {
  padding: 24px;
  background-color: #fff;
  &__filter {
    display: flex;
    justify-content: space-between;
    .search {
      width: 300px;
    }
  }
}
</style>
