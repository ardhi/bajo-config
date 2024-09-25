import fromToml from './method/from-toml.js'
import fromYaml from './method/from-yaml.js'
import toYaml from './method/to-yaml.js'
import toToml from './method/to-toml.js'

const yamlReadHandler = async function (file, opts = {}) {
  return fromYaml(file, opts.isContent)
}

const yamlWriteHandler = async function (file, opts = {}) {
  return toYaml(file, opts.isContent)
}

const tomlReadHandler = async function (file, opts = {}) {
  return fromToml(file, opts.isContent)
}

const tomlWriteHandler = async function (file, opts = {}) {
  return toToml(file, opts.isContent)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.yaml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
