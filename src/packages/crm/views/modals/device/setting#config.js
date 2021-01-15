export const tempRules = {
  open: {
    initialValue: 0,
    rules: [{ required: true, message: '请选择体温模块开关' }]
  },
  corrected_temperature: {
    initialValue: 0.0,
    rules: [
      { required: true, message: '请输入体温补偿值' },
      {
        validator: (field, value, values) => {
          if (value > 0.5 || value < -0.5) {
            return '范围-0.5 ～ +0.5'
          }
        }
      }
    ]
  },
  auth_temperature: {
    initialValue: 37.3,
    rules: [
      { required: true, message: '请输入正常体温阈值' },
      {
        validator: (field, value, values) => {
          if (value > 37.8 || value < 36) {
            return '范围36.0° ~ 37.8°'
          }
        }
      }
    ]
  },
  trigger_temperature: {
    initialValue: 30,
    rules: [
      { required: true, message: '请输入测温模块有效值' },
      {
        validator: (field, value, values) => {
          if (value > 40 || value < 25) {
            return '范围25.0° ~ 40.0°'
          }
        }
      }
    ]
  },
  allow_temperature: {
    initialValue: 0,
    rules: [{ required: true, message: '请选择高温是否允许通行' }]
  }
}

export const faceRules = {
  mask_open: {
    initialValue: 0,
    rules: [{ required: true, message: '请选择口罩识别开关' }]
  },
  mask_threshold: {
    initialValue: 70,
    rules: [
      { required: true, message: '请输入口罩识别阈值' },
      {
        validator: (field, value, values) => {
          if (value > 100 || value < 50) {
            return '范围50 ～ 100'
          }
        }
      }
    ]
  },
  face_threshold: {
    initialValue: 80,
    rules: [
      { required: true, message: '请输入人脸识别阈值' },
      {
        validator: (field, value, values) => {
          if (value > 100 || value < 50) {
            return '范围50 ～ 100'
          }
        }
      }
    ]
  },
  face_size: {
    initialValue: 80,
    rules: [
      { required: true, message: '请输入人脸识别大小' },
      {
        validator: (field, value, values) => {
          if (value > 80 || value < 30) {
            return '范围30 ～ 80'
          }
        }
      }
    ]
  },
  living_type: {
    initialValue: 3,
    rules: [{ required: true, message: '请选择活体检测方式' }]
  },
  rgb_threshold: {
    initialValue: 80,
    rules: [
      { required: true, message: '请输入RGB活体阈值' },
      {
        validator: (field, value, values) => {
          if (value > 100 || value < 50) {
            return '范围50 ～ 100'
          }
        }
      }
    ]
  },
  nir_threshold: {
    initialValue: 80,
    rules: [
      { required: true, message: '请输入NIR活体阀值' },
      {
        validator: (field, value, values) => {
          if (value > 100 || value < 50) {
            return '范围50 ～ 100'
          }
        }
      }
    ]
  }
}
