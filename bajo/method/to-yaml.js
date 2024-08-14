import yaml from 'js-yaml'
import fs from 'fs'

function toYaml (file, isContent, opts) {
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return yaml.dump(content, opts)
}

export default toYaml
