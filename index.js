import fromJson from './lib/from-json.js'
import fromYaml from './lib/from-yaml.js'
import fromToml from './lib/from-toml.js'
import toJson from './lib/to-json.js'
import toYaml from './lib/to-yaml.js'
import toToml from './lib/to-toml.js'

async function factory (pkgName) {
  const me = this

  return class BajoConfig extends this.lib.Plugin {
    constructor () {
      super(pkgName, me.app)
    }

    fromJson = (...args) => {
      return fromJson(...args)
    }

    fromYaml = (...args) => {
      return fromYaml(...args)
    }

    fromYml = (...args) => {
      return fromYaml(...args)
    }

    fromToml = (...args) => {
      return fromToml(...args)
    }

    toJson = (...args) => {
      return toJson(...args)
    }

    toYaml = (...args) => {
      return toYaml(...args)
    }

    toYml = (...args) => {
      return toYaml(...args)
    }

    toToml = (...args) => {
      return toToml(...args)
    }
  }
}

export default factory
