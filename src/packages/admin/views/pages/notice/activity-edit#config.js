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
  pc_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          console.log(value)
          if (values.type === 1 && vm.pcImageShow) {
            if (!value || !value.length) return '请上传pc弹窗图片'
            if (value.length > 3) return '请上传至多3张pc弹窗图片'
          }
        }
      }
    ]
  },
  app_basemap: {
    rules: [
      {
        validator: (field, value, values) => {
          if (values.type === 1 && vm.appImageShow) {
            if (!value || !value.length) return '请上传app弹窗图片'
            if (value.length > 3) return '请上传至多3张app弹窗图片'
          }
        }
      }
    ]
  },
  app_start_basemap: {},
  sms_content: {
    rules: [
      {
        validator: (field, value, values) => {
          if (values.is_sms === 1 && !value) {
            return '请输入短信内容'
          }
        }
      }
    ]
  },
  pic_links: {},
  is_sms: {},
  roles: {
    rules: [{ required: true, message: '请选择发送角色' }]
  },
  content: {
    initialValue: '',
    rules: [
      {
        validator: (field, value, values) => {
          if (values.type === 2 && !value) {
            return '请输入公告内容'
          }
        }
      }
    ]
  }
})
