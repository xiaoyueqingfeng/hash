<template>
  <div class="customer">
    <div class="customer__filter mg-b16">
      <!-- 选择期初时间 -->
      <oa-date-picker
        v-model="$searchQuery.start_date"
        placeholder="选择期初时间"
        class="mg-r8"
        :needStatFormate="true"
        @change="handlerRouteChange"
      ></oa-date-picker>
      <!-- 选择期末时间 -->
      <oa-date-picker
        v-model="$searchQuery.end_date"
        placeholder="选择期末时间"
        class="mg-r8"
        :needStatFormate="true"
        @change="handlerRouteChange"
      ></oa-date-picker>
      <!-- 选择部门 -->
      <crm-organ-user-picker
        :organ-id.sync="$searchQuery.organ_id"
        :user-id.sync="$searchQuery.user_id"
        user-status="all"
        @change="handlerRouteChange"
      ></crm-organ-user-picker>
    </div>
    <oa-alert-intro class="customer__intro mg-b16">
      <div class="info-wrap">
        <span class="label">本次筛选</span>
        <span class="val">总计</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">期初数量</span>
        <span class="val">{{ stat.start_number }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">期末数量</span>
        <span class="val">{{ stat.end_number }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">变化数</span>
        <span class="val">{{ stat.change }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">变化比</span>
        <span class="val">{{ stat.change_percent }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">升级数</span>
        <span class="val">{{ stat.level_up }}</span>
      </div>
      <div class="info-wrap mg-l32">
        <span class="label">降级数</span>
        <span class="val">{{ stat.level_down }}</span>
      </div>
    </oa-alert-intro>
    <div class="customer__content">
      <oa-table
        :columns="tableColumns"
        rowKey="id"
        :dataSource="dataSource"
        :loading="getLeadsLevelList$loading"
        @change="tbOnTableNoClearSelectChange"
      >
        <!-- 变化 -->
        <template slot="change" slot-scope="text, record">
          <div
            class="columns-change"
            :class="{ up: record.change > 0, down: record.change < 0 }"
          >
            <span v-if="record.change > 0">+</span>
            {{ text }}
          </div>
        </template>
        <!-- 变化比 -->
        <template slot="change_percent" slot-scope="text, record">
          <div
            class="columns-change"
            :class="{
              up: record.change_percent > 0,
              down: record.change_percent < 0
            }"
          >
            <span v-if="record.change_percent > 0">+</span>
            {{ text }}
            <span v-if="text !== '-'">%</span>
          </div>
        </template>
        <!-- 期初占比 -->
        <template slot="start_percent" slot-scope="text">
          {{ text }}
          <span v-if="text !== '-'">%</span>
        </template>
        <!-- 期末占比 -->
        <template slot="end_percent" slot-scope="text">
          {{ text }}
          <span v-if="text !== '-'">%</span>
        </template>
        <!-- 期初 -->
        <template slot="start_number" slot-scope="text, record">
          <a
            @click="
              handleJumpToClassificationDaily({
                leads_level: record.leads_level,
                end_date: $searchQuery.start_date
              })
            "
            v-if="text"
          >
            {{ text }}
          </a>
          <div v-else>{{ text }}</div>
        </template>
        <!-- 期末 -->
        <template slot="end_number" slot-scope="text, record">
          <a
            @click="
              handleJumpToClassificationDaily({
                leads_level: record.leads_level,
                start_date: $searchQuery.end_date
              })
            "
            v-if="text"
          >
            {{ text }}
          </a>
          <div v-else>{{ text }}</div>
        </template>
        <!-- 升级 -->
        <template slot="level_up" slot-scope="text, record">
          <a
            @click="
              handleJumpToClassificationDaily({
                leads_level: record.leads_level,
                leads_level_change: 1
              })
            "
            v-if="text && text !== '-' && text !== '0'"
          >
            {{ text }}
          </a>
          <div v-else>{{ text }}</div>
        </template>
        <!-- 降级 -->
        <template slot="level_down" slot-scope="text, record">
          <a
            @click="
              handleJumpToClassificationDaily({
                leads_level: record.leads_level,
                leads_level_change: 2
              })
            "
            v-if="text && text !== '-' && text !== '0'"
          >
            {{ text }}
          </a>
          <div v-else>{{ text }}</div>
        </template>
      </oa-table>
    </div>
  </div>
</template>

<script>
import { getLeadsLevelList } from '@/api/serverlevel'
import tableColumns from './customer#config'
import tableMixins from 'oa-core/mixins/table'
export default {
  name: 'marker-customer',

  components: {},

  props: {},

  mixins: [tableMixins],

  data() {
    return {
      tableColumns: tableColumns,
      dataSource: [],
      stat: {
        start_number: '',
        end_number: '',
        change: '',
        change_percent: '',
        level_up: '',
        level_down: ''
      }
    }
  },

  computed: {},

  watch: {
    $route() {
      this.getLeadsLevelList()
    }
  },

  async: {
    getLeadsLevelList() {
      return getLeadsLevelList(this.$searchQuery).then(res => {
        this.dataSource = res.list
        this.stat = res.total
      })
    }
  },

  mounted() {
    this.getLeadsLevelList()
  },

  methods: {
    handleJumpToClassificationDaily(extra = {}) {
      console.log('extra', extra)
      let query = {
        start_date: this.$searchQuery.start_date,
        end_date: this.$searchQuery.end_date,
        province_id: this.$searchQuery.province_id,
        city_id: this.$searchQuery.city_id,
        organ_id: this.$searchQuery.organ_id,
        user_id: this.$searchQuery.user_id
      }
      query = Object.assign(query, extra)
      this.$router.push({
        name: 'stat-brand-classification-daily',
        query
      })
    },
    handlerRouteChange() {
      this.$router.push({
        query: this.$searchQuery
      })
    }
  }
}
</script>

<style lang="less" scoped>
.columns-change {
  &.up {
    color: #f5222d;
  }
  &.down {
    color: #52c41a;
  }
}
.customer {
  background-color: #fff;
}
.info-wrap {
  display: inline-flex;
  flex-direction: column;
  .label {
    display: inline-block;
    margin-bottom: 2px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    line-height: 20px;
  }
  .val {
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
