export const rules = vm => {
  return {
    // 规格名称
    spec_name: {
      rules: [
        {
          validator: (field, value, values) => {
            if (!value) {
              return '规格名称不能为空'
            }
            if (vm.item.spec_item_name.includes(value)) {
              return '规格名称重复请重新输入'
            }
          }
        }
      ]
    }
  }
}
