<template>
  <section class="sg-section">
    <h3>oa-filter-box 列表上方筛选区域</h3>
    <p>带有默认宽度 筛选项</p>
    <oa-filter-box>
      <a-select placeholder="选择"></a-select>
    </oa-filter-box>
    <p class="mg-t24">单纯带有操作</p>
    <oa-filter-box>
      <template slot="actions">
        <oa-button type="primary">查询</oa-button>
        <oa-button class="mg-l8">重置</oa-button>
      </template>
      <a-select placeholder="选择"></a-select>
    </oa-filter-box>

    <p class="mg-t24">搜索模式</p>
    <oa-filter-box mode="search">
      <a-input-search
        slot="prepend"
        enterButton
        placeholder="搜索"
      ></a-input-search>
      <template slot="actions">
        <oa-button type="primary">查询</oa-button>
        <oa-button class="mg-l8">重置</oa-button>
      </template>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
    </oa-filter-box>

    <p class="mg-t24">自动模式切换</p>
    <oa-filter-box with-toggle :mode.sync="mode1">
      <template slot="prepend">
        <a-input-search
          enterButton
          placeholder="可以切换搜索和筛选模式"
        ></a-input-search>
      </template>
      <template slot="actions">
        <oa-button type="primary">查询</oa-button>
        <oa-button class="mg-l8">重置</oa-button>
      </template>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
      <a-select placeholder="选择"></a-select>
    </oa-filter-box>
  </section>
</template>

<script>
export default {
  data() {
    return {
      mode1: 'search'
    }
  }
}
</script>
