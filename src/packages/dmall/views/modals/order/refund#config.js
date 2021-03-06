export const rules = vm => {
  const info = vm.orderDetail || { refund_info: { refund_mark: '' } }
  return {
    reason_id: {
      rules: [{ required: true, message: '请选择退款原因' }],
      initialValue: info.refund_info.reason_id
    },
    reason_content: {
      rules: [
        {
          message: '请填写退款说明'
        }
      ],
      initialValue: info.refund_info.refund_mark
    }
  }
}
