const globby = require('globby')
const fs = require('fs')
const md5 = require('md5')
const files = globby.sync('./src/**/*')

const calProjectMd5 = files => {
  return new Promise(resolve => {
    let md5Str = ''
    const calFileMd5 = files => {
      const file = files.shift()
      const stat = fs.statSync(file)
      md5Str += md5(file + stat.mtime)
      if (files.length) {
        calFileMd5(files)
      } else {
        resolve(md5(md5Str))
      }
    }
    calFileMd5(files)
  })
}
const start = new Date()
calProjectMd5(files).then(md5Str => {
  console.log(`执行时间: ${new Date() - start}`)
  console.log('md5:', md5Str)
  // console.log('end', arr)
})
