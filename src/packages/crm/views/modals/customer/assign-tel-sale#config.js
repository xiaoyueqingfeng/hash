export const rules = vm => ({
  organIds: {
    rules: [{ required: true, message: '请选择部门' }]
  },
  sale_id: {
    rules: [{ required: true, message: '请选择员工' }]
  }
})
