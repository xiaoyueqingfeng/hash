export const rules = vm => ({
  express_no: {
    rules: [{ required: true, message: '请输入运单号' }]
  },
  express_company_id: {
    rules: [{ required: true, message: '请选择物流' }]
  }
})
