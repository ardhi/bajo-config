import toml from 'smol-toml'

/**
 * Plugin factory.
 *
 * **Never** call this function directly!!! It's only-meant to be called by the {@link https://ardhi.github.io/bajo|Bajo framework} during plugin initialization.
 *
 * @param {string} pkgName - NPM package name
 * @returns {class}
 */
async function factory (pkgName) {
  const me = this
  /**
   * BajoConfig class definition
   *
   * @class
   */
  class BajoConfig extends this.app.baseClass.Base {
    /**
     * Constructor
     */
    constructor () {
      super(pkgName, me.app)

      /**
       * @property {object} config - Configuration object
       */
      this.config = {}
    }

    /**
     * Parse TOML text
     *
     * @async
     * @method
     * @param {string} text - Text to be parsed
     * @param {object|boolean} [options={}] - Options object. If a boolean is provided, it will be treated as `options.readFromFile`
     * @param {boolean} [options.readFromFile=false] - If `true`, `text` is treated as a file path
     * @param {boolean} [options.throwNotFound=false] - If `true`, throw exception if file is not found
     * @param {object} [options.defValue={}] - Default value to use if value returned empty
     * @param {object} [options.parserOpts={}] - Options to be passed to `toml.parse()`
     * @returns {object} Parsed object
     */
    async fromToml (text, options = {}) {
      const { fs } = this.app.lib
      const { isBoolean, isEmpty } = this.app.lib._
      if (isBoolean(options)) options = { readFromFile: options }
      options.defValue = options.defValue ?? {}
      if (options.readFromFile && !fs.existsSync(text) && options.throwNotFound) throw this.error('notFound%s%s', this.t('file'), text)
      const content = options.readFromFile ? fs.readFileSync(text, 'utf8') : text
      const result = toml.parse(content)
      return isEmpty(result) ? options.defValue : result
    }

    /**
     * Convert object to TOML string
     *
     * @async
     * @method
     * @param {object} object - Object to be converted
     * @param {object|string} [options={}] - Options object. If a string is provided, it will be treated as `options.writeToFile`
     * @param {string} [options.writeToFile] - If provided, the TOML string will be written to this file
     * @param {object} [options.parserOpts={}] - Options to be passed to `toml.stringify()`
     * @returns {string} TOML string
     */
    async toToml (object, options = {}) {
      const { omit, isString } = this.app.lib._
      const { fs } = this.app.lib
      if (isString(options)) options = { writeToFile: options }
      const content = toml.stringify(object, omit(options, ['writeToFile']))
      if (options.writeToFile) {
        fs.writeFileSync(options.writeToFile, content, 'utf8')
        return
      }
      return content
    }
  }

  return BajoConfig
}

export default factory
