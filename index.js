import yaml from 'js-yaml'
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
     * Parse JSON text
     *
     * @method
     * @param {string} text - Text to be parsed
     * @param {object} options - Options object
     * @returns {object} Parsed object
     */
    fromJson = (text, options = {}) => {
      const { fs } = this.app.lib
      const content = options.readFromFile ? fs.readFileSync(text, 'utf8') : text
      return JSON.parse(content)
    }

    /**
     * Parse YAML text
     *
     * @method
     * @param {string} text - Text to be parsed
     * @param {object} options - Options object
     * @returns {object} Parsed object
     */
    fromYaml = (text, options = {}) => {
      const { fs } = this.app.lib
      const content = options.readFromFile ? fs.readFileSync(text, 'utf8') : text
      return yaml.load(content)
    }

    /**
     * Parse YML text. Alias for fromYaml.
     *
     * @method
     * @param {string} text - Text to be parsed
     * @param {object} options - Options object
     * @returns {object} Parsed object
     */
    fromYml = (text, options = {}) => {
      return this.fromYaml(text, options)
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
     * Convert object to JSON string
     *
     * @method
     * @param {object} object - Object to be converted
     * @param {object} options - Options object
     * @returns {string} JSON string
     */
    toJson = (object, options = {}) => {
      const { omit } = this.app.lib._
      const { fs } = this.app.lib
      const content = JSON.stringify(object, null, omit(options, ['writeToFile']))
      if (options.writeToFile) {
        fs.writeFileSync(options.saveAsFile, content, 'utf8')
        return
      }
      return content
    }

    /**
     * Convert object to YAML string
     *
     * @method
     * @param {object} object - Object to be converted
     * @param {object} options - Options object
     * @returns {string} YAML string
     */
    toYaml = (object, options = {}) => {
      const { omit } = this.app.lib._
      const { fs } = this.app.lib
      const content = yaml.dump(object, omit(options, ['writeToFile']))
      if (options.writeToFile) {
        fs.writeFileSync(options.saveAsFile, content, 'utf8')
        return
      }
      return content
    }

    /**
     * Convert object to YML string. Alias for toYaml.
     *
     * @method
     * @param {object} object - Object to be converted
     * @param {object} options - Options object
     * @returns {string} YML string
     */
    toYml = (object, options = {}) => {
      return this.toYaml(object, options)
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
