<template>
  <section class="sg-section">
    <h4>oa-select 选择器</h4>
    <p>默认包含文本搜索 默认提供搜索和清除功能</p>
    <li>[options] 数组结构 [{id,name}]结构 默认查询name字段</li>
    <li>[v-model] 双向绑定 点击clear按钮时值为undefined</li>

    <oa-select
      style="width:200px"
      :options="options"
      v-model="model"
    ></oa-select>
    model->{{ model }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      model: undefined,
      options: [{ id: 1, name: '测试' }, { id: 2, name: '另一个' }]
    }
  }
}
</script>
