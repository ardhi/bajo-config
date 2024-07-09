import yaml from 'js-yaml'
import toml from '@iarna/toml'
import fs from 'fs'

const yamlHandler = async function (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return yaml.load(content)
}

const tomlHandler = async function (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return toml.parse(content)
}

export default [
  { ext: '.yml', handler: yamlHandler },
  { ext: '.yaml', handler: yamlHandler },
  { ext: '.toml', handler: tomlHandler }
]
