import fromToml from './method/from-toml.js'
import fromYaml from './method/from-yaml.js'
import toYaml from './method/to-yaml.js'
import toToml from './method/to-toml.js'

const yamlReadHandler = async function (file, isContent) {
  return fromYaml(file, isContent)
}

const yamlWriteHandler = async function (file, isContent) {
  return toYaml(file, isContent)
}

const tomlReadHandler = async function (file, isContent) {
  return fromToml(file, isContent)
}

const tomlWriteHandler = async function (file, isContent) {
  return toToml(file, isContent)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.yaml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
