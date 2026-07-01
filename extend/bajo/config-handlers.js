/**
 * Config Handlers
 *
 * @module ConfigHandlers
 * @exports {Array} - An array of handler objects for different file extensions.
 */

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
  { ext: '.toml', readHandler: tomlReadHandler, writeHandler: tomlWriteHandler }
]
