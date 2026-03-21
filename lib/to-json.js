import fs from 'fs'

function toJson (data, opts = {}) {
  const { omit } = this.app.lib._
  const content = JSON.stringify(data, null, omit(opts, ['writeToFile']))
  if (opts.writeToFile) {
    fs.writeFileSync(opts.saveAsFile, content, 'utf8')
    return
  }
  return content
}

export default toJson
