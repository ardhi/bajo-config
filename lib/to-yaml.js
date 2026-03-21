import yaml from 'js-yaml'
import fs from 'fs'

function toYaml (data, opts = {}) {
  const { omit } = this.app.lib._
  const content = yaml.dump(data, omit(opts, ['writeToFile']))
  if (opts.writeToFile) {
    fs.writeFileSync(opts.saveAsFile, content, 'utf8')
    return
  }
  return content
}

export default toYaml
