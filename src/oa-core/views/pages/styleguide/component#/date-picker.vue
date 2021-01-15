<template>
  <section class="sg-section">
    <h3>oa-date-picker</h3>
    <p>
      和a-date-picker选项一致 只是模式使用YYYY-MM-DD字符串形式
      默认禁用日期为当前时间后
    </p>

    <oa-date-picker v-model="search.date"></oa-date-picker>
    {{ search }}
  </section>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      search: {
        date: moment().format('YYYY-MM-DD')
      }
    }
  }
}
</script>
