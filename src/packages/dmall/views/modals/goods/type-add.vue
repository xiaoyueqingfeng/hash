<template>
  <oa-modal :title="`${editText}分类`" v-model="show" @ok="onSubmit">
    <a-row>
      <div class="form">
        <a-form :form="form">
          <a-form-item label="分类名称" v-bind="formCol" required>
            <a-input
              v-decorator="decorators.name"
              placeholder="请输入分类名称"
            ></a-input>
          </a-form-item>
          <a-form-item label="选择分类" v-bind="formCol">
            <oa-select
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              v-decorator="decorators.parent_id"
              placeholder="请选择分类"
              :options="categoryStatus"
            ></oa-select>
          </a-form-item>
          <a-form-item label="排序" v-bind="formCol">
            <a-input-number
              placeholder="请输入分类排序"
              v-decorator="decorators.sort_order"
            ></a-input-number>
          </a-form-item>
          <a-form-item label="备注" v-bind="formCol">
            <a-textarea
              placeholder="请输入备注信息"
              v-decorator="decorators.remarks"
            ></a-textarea>
          </a-form-item>
        </a-form>
      </div>
    </a-row>
  </oa-modal>
</template>

<script>
import { rules } from './type-add#config'

import { getCategoryOptions } from '@/api/goods'
import { mapGetters } from 'vuex'
export default {
  name: 'typeAdd',
  props: {
    category: {
      type: Object,
      default: () => {
        return {
          name: '',
          parent_id: '',
          sort_order: 0,
          remarks: ''
        }
      }
    }
  },
  data() {
    const form = this.$stForm.create()
    const decorators = form.decorators(rules)
    return {
      form,
      decorators,
      show: false,
      categoryOptions: []
    }
  },
  computed: {
    isEdit() {
      return this.category.id !== undefined
    },
    editText() {
      return this.isEdit ? '编辑' : '添加'
    },
    formCol() {
      return {
        'label-col': { span: 5 },
        'wrapper-col': { span: 16 }
      }
    },
    ...mapGetters('dmall', ['categoryStatus'])
  },
  mounted() {
    this.$store.dispatch('dmall/getCategoryStatus')
  },
  methods: {
    onSubmit() {
      this.form.validate().then(values => {
        this.show = false
        this.$emit('save', values)
      })
    }
  }
}
</script>
