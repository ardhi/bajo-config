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
     * @method
     * @param {string} text - Text to be parsed
     * @param {object} options - Options object
     * @returns {object} Parsed object
     */
    fromToml = (text, options = {}) => {
      const { fs } = this.app.lib
      const content = options.readFromFile ? fs.readFileSync(text, 'utf8') : text
      return toml.parse(content)
    }

    /**
     * Convert object to TOML string
     *
     * @method
     * @param {object} object - Object to be converted
     * @param {object} options - Options object
     * @returns {string} TOML string
     */
    toToml = (object, options = {}) => {
      const { omit } = this.app.lib._
      const { fs } = this.app.lib
      const content = toml.stringify(object, omit(options, ['writeToFile']))
      if (options.writeToFile) {
        fs.writeFileSync(options.saveAsFile, content, 'utf8')
        return
      }
      return content
    }
  }

  return BajoConfig
}

export default factory
