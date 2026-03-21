import toml from 'smol-toml'
import fs from 'fs'

function toToml (data, opts = {}) {
  const { omit } = this.app.lib._
  const content = toml.stringify(data, omit(opts, ['writeToFile']))
  if (opts.writeToFile) {
    fs.writeFileSync(opts.saveAsFile, content, 'utf8')
    return
  }
  return content
}

export default toToml
