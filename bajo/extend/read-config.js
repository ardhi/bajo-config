import yaml from 'js-yaml'
import toml from '@iarna/toml'

const yamlHandler = async function (file, isContent) {
  const { importPkg } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return yaml.load(content)
}

const tomlHandler = async function (file, isContent) {
  const { importPkg } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return toml.parse(content)
}

export default [
  { ext: '.yaml', handler: yamlHandler },
  { ext: '.yml', handler: yamlHandler },
  { ext: '.toml', handler: tomlHandler }
]
