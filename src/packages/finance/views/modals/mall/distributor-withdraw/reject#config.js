export const rules = vm => ({
  reject_reason: {
    rules: [
      {
        required: true,
        min: 0,
        max: 30,
        message: '请填写驳回原因，最多30个字符'
      }
    ]
  }
})
