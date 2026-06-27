/**
 * Config Handlers
 *
 * @module ConfigHandlers
 * @exports {Array} - An array of handler objects for different file extensions.
 */

/**
 * YAML read handler
 *
 * @memberof module:ConfigHandlers
 * @param {string} text - Text to be parsed
 * @param {object} opts - Options object
 * @returns {object} Parsed object
 */
const yamlReadHandler = async function (text, opts = {}) {
  return this.fromYaml(text, opts)
}

/**
 * YAML write handler
 *
 * @memberof module:ConfigHandlers
 * @param {object} object - Object to be converted
 * @param {object} opts - Options object
 * @returns {string} YAML string
 */
const yamlWriteHandler = async function (object, opts = {}) {
  return this.toYaml(object, opts)
}

/**
 * TOML read handler
 *
 * @memberof module:ConfigHandlers
 * @param {string} text - Text to be parsed
 * @param {object} opts - Options object
 * @returns {object} Parsed object
 */
const tomlReadHandler = async function (text, opts = {}) {
  return this.fromToml(text, opts)
}

/**
 * TOML write handler
 *
 * @param {object} object - Object to be converted
 * @param {object} opts - Options object
 * @returns {string} TOML string
 */
const tomlWriteHandler = async function (object, opts = {}) {
  return this.toToml(object, opts)
}

export default [
  { ext: '.yml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.yaml', readHandler: yamlReadHandler, writeHandler: yamlWriteHandler },
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
