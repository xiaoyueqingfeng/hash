export const rules = vm => ({
  reject_content: {
    rules: [
      {
        required: true,
        min: 0,
        max: 30,
        message: '请填写拒绝原因，最多30个字符'
      }
    ]
  }
})
