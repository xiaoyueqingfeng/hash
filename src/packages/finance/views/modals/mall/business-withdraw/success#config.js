export const rules = vm => ({
  order_id: {
    rules: [
      {
        required: true,
        message: '请填写财务单号'
      }
    ]
  }
})
