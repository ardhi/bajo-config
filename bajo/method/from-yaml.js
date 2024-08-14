import yaml from 'js-yaml'
import fs from 'fs'

function fromYaml (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return yaml.load(content)
}

export default fromYaml
