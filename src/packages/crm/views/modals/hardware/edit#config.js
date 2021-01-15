export const rules = vm => ({
  leads_id: [
    {
      required: true,
      message: '请输入leadsID'
    }
  ],
  shop_id: [
    {
      required: true,
      message: '请选择场馆'
    }
  ],
  shop_area_id: [
    {
      required: true,
      message: '请选择场地区域'
    }
  ],
  cabinet_area_id: [
    {
      required: true,
      message: '请选择储物柜区域'
    }
  ],
  device_id: [
    {
      required: true,
      message: '请输入设备ID'
    }
  ],
  device_name: [
    {
      required: true,
      message: '设备名称必填'
    }
  ],
  custom_name: [
    {
      required: true,
      message: '请输入自定义名称'
    },
    {
      min: 1,
      max: 10,
      message: '支持输入1~10个字'
    }
  ],
  odd_even: [
    {
      required: true,
      message: '请选择鉴权方式'
    }
  ],
  ins_and_out: []
})
