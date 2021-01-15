const RELOAD_DELAY = 100 // 页面刷新延迟时间
const RELOAD_THROTTLE = 10 // 节流加载 单位s 多少秒内不请求

let lastUpdate = 0
export default (to, from, next) => {
  // in 10s no twice
  if (new Date().getTime() - lastUpdate < RELOAD_THROTTLE * 1000) {
    next()
  } else {
    lastUpdate = new Date().getTime()
    const xhr = new XMLHttpRequest()
    xhr.open(
      'GET',
      `${process.env.BASE_URL}release.json?${new Date().getTime()}`
    )
    xhr.send(null)
    xhr.onload = function() {
      let releaseJSON = {}
      try {
        releaseJSON = JSON.parse(xhr.responseText)
      } catch (e) {}
      if (
        process.env.GIT_COMMIT &&
        releaseJSON.git_commit &&
        releaseJSON.git_commit !== process.env.GIT_COMMIT
      ) {
        console.log(
          '需要刷新页面',
          'GIT_COMMIT：',
          process.env.GIT_COMMIT,
          'release.commit：',
          releaseJSON.git_commit
        )
        if (process.env.NODE_ENV === 'production') {
          setTimeout(() => {
            document.location.reload()
          }, RELOAD_DELAY)
        }
      }
    }
    next()
  }
}
