import yaml from 'js-yaml'
import fs from 'fs'

function fromYaml (data, opts = {}) {
  const content = opts.readFromFile ? fs.readFileSync(data, 'utf8') : data
  return yaml.load(content)
}

export default fromYaml
