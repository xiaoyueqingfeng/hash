export const rules = vm => {
  console.log(vm)
  return {
    name: {
      rules: [
        {
          validator: (filed, value, values) => {
            if (!value) {
              return '请填写分类名称'
            }
          }
        }
      ],
      initialValue: vm.category.name
    },
    parent_id: {
      initialValue: vm.category.parent_id || ''
    },
    sort_order: {
      initialValue: vm.category.sort_order
    },
    remarks: {
      initialValue: vm.category.remarks
    }
  }
}
