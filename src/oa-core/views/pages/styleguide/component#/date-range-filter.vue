<template>
  <section class="sg-section">
    <h4>oa-date-range-filter 列表用时间筛选器</h4>
    <p>
      默认使用了禁用日期为当前的时间过去一年，后现在后面的一天禁用，如需覆盖使用[disabledDate]属性
    </p>
    <oa-date-range-filter
      :start.sync="searchQuery1.start"
      :end.sync="searchQuery1.end"
    ></oa-date-range-filter>
    searchQuery1 -> {{ searchQuery1 }}
    <oa-date-range-filter
      :start.sync="searchQuery2.date_start"
      :end.sync="searchQuery2.date_end"
    ></oa-date-range-filter>
    searchQuery2 -> {{ searchQuery2 }}
    <p>[placeholder]属性</p>
    <oa-date-range-filter
      :placeholder="['start', 'end']"
      :start.sync="searchQuery3.start"
      :end.sync="searchQuery3.end"
    ></oa-date-range-filter>
    searchQuery3 -> {{ searchQuery3 }}
  </section>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      searchQuery1: {
        start: '',
        end: ''
      },
      searchQuery2: {
        date_start: moment()
          .startOf('month')
          .format('YYYY-MM-DD'),
        date_end: moment().format('YYYY-MM-DD')
      },
      searchQuery3: {
        start: '',
        end: ''
      }
    }
  }
}
</script>
