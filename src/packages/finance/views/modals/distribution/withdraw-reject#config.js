export const rules = vm => ({
  reason: {
    rules: [
      {
        min: 0,
        max: 30,
        message: '最多30个字符'
      }
    ]
  }
})
