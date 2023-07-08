import path from 'path'
import fromJson from '../../bajo/helper/from-json.js'
import fromToml from '../../bajo/helper/from-toml.js'
import fromYaml from '../../bajo/helper/from-yaml.js'
import toJson from '../../bajo/helper/to-json.js'
import toToml from '../../bajo/helper/to-toml.js'
import toYaml from '../../bajo/helper/to-yaml.js'

const choices = [
  { value: 'json2toml' },
  { value: 'json2yaml' },
  { value: 'toml2json' },
  { value: 'toml2yaml' },
  { value: 'yaml2json' },
  { value: 'yaml2toml' }
]

const handler = {
  async json2toml (file) {
    return toToml.call(this, await fromJson.call(this, file), true)
  },
  async json2yaml (file) {
    return toYaml.call(this, await fromJson.call(this, file), true)
  },
  async toml2json (file) {
    return toJson.call(this, await fromToml.call(this, file), true)
  },
  async toml2yaml (file) {
    return toYaml.call(this, await fromToml.call(this, file), true)
  },
  async yaml2json (file) {
    return toJson.call(this, await fromYaml.call(this, file), true)
  },
  async yaml2toml (file) {
    return toToml.call(this, await fromYaml.call(this, file), true)
  }
}

async function convert ({ fromList }) {
  const { getConfig, importPackage, print, pathResolve } = this.bajo.helper
  const _ = await importPackage('lodash')
  const fs = await importPackage('fs-extra::bajo')
  const config = getConfig()
  let [type, src, dest] = config.args
  if (fromList) {
    const { input, select } = await importPackage('@inquirer/prompts::bajo-cli')
    type = await select({
      message: `Choose convert type:`,
      choices
    })
    let from = []
    if (type.startsWith('json')) from = ['.json']
    else if (type.startsWith('toml')) from = ['.toml']
    else from = ['.yaml', '.yml']
    let to = []
    if (type.endsWith('json')) to = '.json'
    else if (type.endsWith('toml')) to = '.toml'
    else to = '.yaml'

    src = await input({
      message: `Enter your source file (${_.map(from, f => '*' + f).join(', ')}):`,
      validate: (item) => {
        if (_.isEmpty(item)) return false
        const ext = path.extname(item)
        if (from.includes(ext)) return true
        return 'Invalid extention'
      }
    })
    let defVal = src
    _.each(from, f => {
      defVal = defVal.replaceAll(f, to)
    })
    dest = await input({
      message: `Enter your destination file (*${to}). Left empty to show on screen:`,
      default: defVal,
      validate: (item) => {
        if (_.isEmpty(item)) return true
        const ext = path.extname(item)
        if (to === ext) return true
        return 'Invalid extention'
      }
    })
  }
  if (!_.map(choices, 'value').includes(type)) print.fatal(`Choose only one of these: ${_.map(choices, c => `'${c.value}'`).join(', ')}`)
  if (!src) print.fatal(`You must provide a source file`)
  src = pathResolve(src)
  dest = _.isEmpty(dest) ? null : pathResolve(dest)
  if (!fs.existsSync(src)) print.fatal(`Source file '%s' not found. Aborted!`, src)
  if (dest) {
    const dir = path.dirname(dest)
    if (!fs.existsSync(dir)) print.fatal(`Destination dir '%s' not found. Aborted!`, dir)
  }
  const spinner = print.ora('Converting...').start()
  let result
  try {
    result = await handler[type].call(this, src)
  } catch (err) {
    spinner.fail(`Error: ${err.message}`)
    process.exit(1)
  }
  spinner.info('Done!')
  if (_.isEmpty(dest)) {
    console.log(result)
  } else {
    fs.writeFileSync(dest, result, 'utf8')
  }
}

export default convert