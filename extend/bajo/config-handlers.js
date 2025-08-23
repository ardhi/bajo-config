import fromToml from '../../lib/from-toml.js'
import fromYaml from '../../lib/from-yaml.js'
import toYaml from '../../lib/to-yaml.js'
import toToml from '../../lib/to-toml.js'

const yamlReadHandler = async function (file, opts = {}) {
  if (opts === true) opts = { isContent: true }
  return fromYaml(file, opts.isContent)
}

const yamlWriteHandler = async function (file, opts = {}) {
  if (opts === true) opts = { isContent: true }
  return toYaml(file, opts.isContent)
}

const tomlReadHandler = async function (file, opts = {}) {
  if (opts === true) opts = { isContent: true }
  return fromToml(file, opts.isContent)
}

const tomlWriteHandler = async function (file, opts = {}) {
  if (opts === true) opts = { isContent: true }
  return toToml(file, opts.isContent)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.yaml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
