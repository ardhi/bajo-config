import fromToml from '../../lib/from-toml.js'
import fromYaml from '../../lib/from-yaml.js'
import toYaml from '../../lib/to-yaml.js'
import toToml from '../../lib/to-toml.js'

const yamlReadHandler = async function (data, opts = {}) {
  return fromYaml.call(this, data, opts)
}

const yamlWriteHandler = async function (data, opts = {}) {
  return toYaml.call(this, data, opts)
}

const tomlReadHandler = async function (data, opts = {}) {
  return fromToml.call(this, data, opts)
}

const tomlWriteHandler = async function (data, opts = {}) {
  return toToml.call(this, data, opts)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.yaml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
