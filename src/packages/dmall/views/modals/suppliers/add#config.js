export const rules = vm => {
  return {
    supplier_name: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请输入供应商名称'
            }
          }
        }
      ],
      initialValue: vm.supplier.supplier_name
    },
    supplier_type: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请选择供应商类型'
            }
          }
        }
      ],
      initialValue: vm.supplier.supplier_type || 1
    },
    supplier_account: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '请输入供应商账号'
            }
          }
        }
      ],
      initialValue: vm.supplier.supplier_account
    },
    mobile: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!/^1[3456789]\d{9}$/.test(value)) {
              return '手机号码有误，请重填'
            }
          }
        }
      ],
      initialValue: vm.supplier.mobile
    },
    remark: {
      initialValue: vm.supplier.remark
    }
  }
}
