<template>
  <section class="sg-section">
    <h4>oa-cascader 级联选择器</h4>
    <p>级联单模型选择器 会去除空children数组</p>
    <li>[options] 数组结构 [{id,name,children}]结构 默认查询name字段</li>
    <li>[v-model] 双向绑定 点击clear按钮时值为undefined</li>

    <oa-cascader v-model="model1" :options="options"></oa-cascader>
    model1->{{ model1 }}
    <oa-cascader
      v-model="model2"
      placeholder="选中即改变"
      change-on-select
      :options="options"
    ></oa-cascader>
    model2->{{ model2 }}
    <p>单模型 使用数组</p>
    <oa-cascader
      v-model="model3"
      :options="options"
      placeholder="单模型 绑定数组类型"
    ></oa-cascader>
    model3 -> {{ model3 }}
    <oa-cascader
      v-model="model4"
      :options="options"
      placeholder="定义树深度"
      :depth="2"
    ></oa-cascader>
    model4 -> {{ model4 }}
    <p>多模型绑定 [multiple-model] 可适用于筛选等直接双向绑定的场景</p>
    <oa-cascader
      multiple-model
      :depth="2"
      :level1.sync="levelModel1.level1"
      :level2.sync="levelModel1.level2"
      placeholder="多模型绑定"
      :options="options"
    ></oa-cascader>
    levelModel1 -> {{ levelModel1 }}
    <oa-cascader
      multiple-model
      :depth="2"
      :level1.sync="levelModel2.channel_level1"
      :level2.sync="levelModel2.channel_level2"
      placeholder="多模型绑定"
      :options="options"
    ></oa-cascader>

    levelModel2 -> {{ levelModel2 }}
    <oa-cascader
      multiple-model
      change-on-select
      :level1.sync="levelModel3.province_id"
      :level2.sync="levelModel3.city_id"
      :level3.sync="levelModel3.area_id"
      placeholder="多模型绑定 使用level[DEPTH]绑定需要层级"
      :options="options"
    ></oa-cascader>
    levelModel3 -> {{ levelModel3 }}
  </section>
</template>

<script>
export default {
  data() {
    return {
      model1: undefined,
      model2: undefined,
      model3: [],
      model4: [],
      levelModel1: {},
      levelModel2: {
        channel_level1: 1,
        channel_level2: 3
      },
      levelModel3: {},
      options: [
        {
          id: 1,
          name: '测试',
          children: [
            {
              id: 3,
              name: '1-1'
            },
            {
              id: 4,
              name: '1-2',
              children: [
                {
                  id: 5,
                  name: '1-2-1'
                }
              ]
            }
          ]
        },
        { id: 2, name: '另一个', children: [] }
      ]
    }
  }
}
</script>
