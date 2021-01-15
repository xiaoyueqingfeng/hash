export const rules = vm => ({
  note: {
    rules: [
      {
        min: 0,
        max: 30,
        message: '请填写备注信息，最多30个字符'
      }
    ]
  }
})
