export const ruleOptions = vm => ({
  mch_id: {
    rules: [
      { required: true, message: '请输入通联商户号' },
      {
        validator: (field, value, values) => {
          let reg = /[\u4E00-\u9FA5]+/
          if (reg.test(value)) {
            return '请输入非中文字符'
          }
        }
      }
    ]
  },
  leads_id: {
    rules: [{ required: true, message: '请选择品牌' }]
  }
})
