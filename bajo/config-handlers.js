import yaml from 'js-yaml'
import toml from '@iarna/toml'
import fs from 'fs'

const yamlReadHandler = async function (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return yaml.load(content)
}

const tomlReadHandler = async function (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return toml.parse(content)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler },
  { ext: '.yaml', readHandler: yamlReadHandler },
  { ext: '.toml', readHandler: tomlReadHandler }
]
