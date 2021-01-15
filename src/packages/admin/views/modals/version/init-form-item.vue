<template>
  <div>
    <oa-t4 class="title" v-if="typeMap[options.type] === 'title'">
      {{ options.name }}
    </oa-t4>

    <a-form-item
      v-if="typeMap[options.type] === 'input'"
      :required="isRequired[options.is_must]"
      :label="options.name"
      :label-col="{ span: labelCol }"
      :wrapper-col="{ span: wrapperCol }"
    >
      <a-input
        v-decorator="[
          options.id + '',
          {
            rules: [
              {
                required: isRequired[options.is_must],
                message: `${options.name}不能为空`
              },
              {
                max: 10,
                message: '长度不能超过10个字'
              }
            ]
          }
        ]"
        placeholder="自定义名称"
      ></a-input>
    </a-form-item>

    <a-form-item
      v-if="typeMap[options.type] === 'radio'"
      :required="isRequired[options.is_must]"
      :label="options.name"
      :label-col="{ span: labelCol }"
      :wrapper-col="{ span: wrapperCol }"
    >
      <a-radio-group
        :options="map(options.children)"
        v-decorator="[
          options.id + '',
          {
            rules: [
              {
                required: isRequired[options.is_must],
                message: `请选择${options.name}`
              }
            ]
          }
        ]"
      />
    </a-form-item>

    <a-form-item
      v-if="typeMap[options.type] === 'checkbox'"
      :required="isRequired[options.is_must]"
      :label="options.name"
      :label-col="{ span: labelCol }"
      :wrapper-col="{ span: wrapperCol }"
    >
      <a-checkbox-group
        :options="map(options.children)"
        v-decorator="[
          options.id + '',
          {
            rules: [
              {
                required: isRequired[options.is_must],
                message: `请选择${options.name}`
              }
            ]
          }
        ]"
      />
    </a-form-item>
    <init-form-item
      v-for="item in options.children"
      :options="item"
      :key="item.id"
    ></init-form-item>
  </div>
</template>
<script>
import { typeMap } from '@/constants/version/init-config'
export default {
  name: 'init-form-item',
  data() {
    return {
      labelCol: 10,
      wrapperCol: 14,
      typeMap,
      isRequired: {
        0: false,
        1: true
      }
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  methods: {
    map(options) {
      return options.map(option => {
        return {
          label: option.name,
          value: option.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  margin-bottom: 16px;
  font-weight: bold;
}
</style>
