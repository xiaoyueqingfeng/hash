export default (to, from, next) => {
  // 默认跳转想进的平台
  const wantPlatform = location.pathname.split('/')[1]
  if (!wantPlatform) {
    console.warn('默认/ 跳转crm')
    location.href = '/crm'
  } else {
    next()
  }
}
