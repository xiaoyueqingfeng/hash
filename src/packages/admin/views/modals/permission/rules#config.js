export const permRules = vm => ({
  name: { rules: [{ required: true, message: '请输入权限点名称' }] }
})

export const resourcesRules = vm => ({
  name: { rules: [{ required: true, message: '请输入权限点名称' }] },
  alias: { rules: [{ required: true, message: '请输入权限点名称' }] }
})
