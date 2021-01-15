<template>
  <section class="sg-section">
    <h3>oa-panel</h3>
    <div class="sg-app-content">
      <oa-panel>这是一个panel</oa-panel>
    </div>
    <div class="sg-app-content" style="height:480px">
      <oa-panel app>全高panel</oa-panel>
    </div>

    <div class="sg-app-content">
      <oa-panel>
        <div slot="actions">
          <oa-button type="primary">操作</oa-button>
        </div>
        <oa-t4>这是标题</oa-t4>
        <div class="mg-t24">这是内容</div>
      </oa-panel>
      <oa-panel class="mg-t24">
        状态筛选
        <a-select class="mg-l8" placeholder="请选择" defaultValue="1">
          <a-select-option value="1">12</a-select-option>
          <a-select-option value="2">22</a-select-option>
        </a-select>
        <div slot="actions">
          <oa-button type="primary">[slot=actions]操作</oa-button>
        </div>
      </oa-panel>

      <oa-panel class="mg-t24" :routes="routes">
        <a-radio-group v-model="modelRadio">
          <a-radio-button :value="1">列表</a-radio-button>
          <a-radio-button :value="2">图表</a-radio-button>
        </a-radio-group>
        <p>使用[routes]使用路由</p>
      </oa-panel>

      <oa-panel class="mg-t24" :routes="routes">
        <div style="background:#F7F9FC;padding:24px" slot="prepend">
          this is slot prepend area
        </div>
        this is content
      </oa-panel>

      <oa-panel class="mg-t24" tabs>
        <a-tabs>
          <a-tab-pane tab="选项卡1" :key="123">
            使用[tabs]属性修正纯tabs样式
          </a-tab-pane>
          <a-tab-pane tab="选项卡2" :key="456">456</a-tab-pane>
          <a-tab-pane tab="选项卡3" :key="789">789</a-tab-pane>
        </a-tabs>
      </oa-panel>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modelRadio: 1,
      routes: [
        {
          label: '样式指导component',
          route: {
            name: 'oa/styleguide-component'
          }
        },
        {
          label: '样式指导组件class',
          route: {
            name: 'oa/styleguide-class'
          }
        }
      ],
      tabs: [
        { label: '客户资料', key: 'basic' },
        { label: '联系人', key: 'contract' },
        { label: '付费记录', key: 'pay' }
      ]
    }
  },
  methods: {
    onTabChange(tab) {
      console.log(tab)
    }
  }
}
</script>
