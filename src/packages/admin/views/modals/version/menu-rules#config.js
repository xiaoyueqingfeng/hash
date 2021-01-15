import { NUMBERCHINALETTER } from 'oa-core/constants/regex'

export const menuRules = vm => ({
  menu_id: {
    rules: [{ required: true, message: '请选择菜单名称' }]
  },
  aliases: {
    rules: [
      {
        required: true,
        message: '请填写正确菜单别名,支持中英文',
        pattern: NUMBERCHINALETTER
      },
      {
        max: 10,
        message: '最多10个中英文字符'
      }
    ]
  },
  is_hidden: {
    initialValue: 0
  },
  menu_weight: {
    rules: [{ required: true, message: '请输入排序' }]
  },
  upgrade_hints: {
    initialValue: 0,
    rules: [
      {
        required: true
      }
    ]
  }
})

export const menuPermAddRules = vm => ({
  perm_list: {
    initialValue: [],
    rules: [
      {
        validator: (field, value, values) => {
          if (!vm.isGray) {
            if (!value || !value.length) {
              return '请选择免费权限组'
            }
          }
        }
      }
    ]
  }
})
