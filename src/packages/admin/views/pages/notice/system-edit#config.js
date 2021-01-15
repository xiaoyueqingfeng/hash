export const SEND_TYPE = {
  popup: 1,
  convention: 2
}
export const RANG_TYPE = {
  city: 1,
  brand: 2
}

export const systemRules = vm => ({
  version_id: {
    rules: [
      {
        validator: (field, value, values) => {
          if (!value.length) {
            return '请选择发布版本'
          }
        }
      }
    ]
  },
  range: {
    rules: [{ required: true, message: '请选择发送范围' }]
  },
  target: {
    rules: [
      {
        validator: (field, value, values) => {
          if (!value.length) {
            return '请选择触达位置'
          }
        }
      }
    ]
  },
  type: {
    rules: [{ required: true, message: '请选择发送类型' }]
  },
  title: {
    rules: [{ required: true, message: '请输入公告标题' }]
  },
  pc_default: {
    initialValue: 0
  },
  pc_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          // 弹窗类型 触达勾选了saaspro 底图选择自定义
          if (values.type === 1 && vm.pcImageShow && vm.pcType === 1) {
            if (!value || !value.length) {
              return '请上传Pc弹窗底图'
            }
          }
        }
      }
    ]
  },
  pc_default_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          // 弹窗类型 触达勾选了saaspro 底图选择默认
          if (values.type === 1 && vm.pcImageShow && vm.pcType === 0) {
            if (!value || !value.length) {
              return '请选择Pc弹窗模板'
            }
          }
        }
      }
    ]
  },
  app_default: {
    initialValue: 0
  },
  app_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          // 弹窗类型 触达勾选了三体云管家 底图选择自定义
          if (values.type === 1 && vm.appImageShow && vm.appType === 1) {
            if (!value || !value.length) {
              return '请上传Pc弹窗底图'
            }
          }
        }
      }
    ]
  },
  app_default_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          // 弹窗类型 触达勾选了三体云管家 底图选择默认
          if (values.type === 1 && vm.appImageShow && vm.appType === 0) {
            if (!value || !value.length) {
              return '请选择app弹窗模板'
            }
          }
        }
      }
    ]
  },
  popup_content: {
    initialValue: '',
    rules: [
      {
        validator: (field, value, values) => {
          if (values.type === 1 && !value) {
            return '请输入弹窗内容'
          }
        }
      }
    ]
  },
  roles: {
    rules: [{ required: true, message: '请选择发送角色' }]
  },
  content: {
    initialValue: ''
  }
})
