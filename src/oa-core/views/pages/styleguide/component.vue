<template>
  <div>
    <h3 class="mg-t24">Component 组件</h3>
    <div class="sg">
      <div class="sg__sider">
        <a-anchor :offsetTop="160">
          <a-anchor-link
            v-for="demo in demos"
            :key="demo.id"
            :href="'#' + demo.id"
            :title="demo.id + ' ' + demo.title"
          ></a-anchor-link>
        </a-anchor>
      </div>
      <div class="sg__main">
        <component
          v-for="demo in demos"
          :key="demo.id"
          :id="demo.id"
          :is="'demo-' + demo.id"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import demoComponents from './component#/index.js'
export default {
  components: demoComponents,
  computed: {
    demos() {
      return [
        { id: 'title', title: '标题' },
        { id: 'button', title: '按钮' },
        { id: 'icon', title: '按钮' },
        { id: 'tag', title: '标签' },
        { id: 'hr', title: '分割线' },
        { id: 'empty', title: '无数据占位图' },
        { id: 'select', title: '单向选择' },
        { id: 'cascader', title: '级联单模型选择器' },
        { id: 'area-select', title: '区域选择器' },
        { id: 'table-actions', title: '表格操作' },
        { id: 'region-cascader', title: '区域选择器' },
        { id: 'date-picker', title: '时间选择器' },
        { id: 'date-range-filter', title: '列表时间范围筛选器' },
        { id: 'confirm', title: '确认框' },
        { id: 'avatar-upload', title: '头像上传选择器' },
        { id: 'file-upload', title: '上传附件' },
        { id: 'image-upload', title: '图片上传' },
        { id: 'filelist-upload', title: '文件列表式上传' },
        { id: 'alert-intro', title: '信息展示' },
        { id: 'filter-box', title: '筛选区域' },
        { id: 'checkbox-group', title: '全选勾选' },
        { id: 'editor', title: '富文本编辑器' },
        { id: 'table', title: '表格' },
        { id: 'panel', title: '应用面板' },
        { id: 'page-modal', title: '页面级模态窗' }
      ]
    }
  }
}
</script>
