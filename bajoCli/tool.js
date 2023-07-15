import fromJson from '../bajo/helper/from-json.js'
import fromToml from '../bajo/helper/from-toml.js'
import fromYaml from '../bajo/helper/from-yaml.js'
import toJson from '../bajo/helper/to-json.js'
import toToml from '../bajo/helper/to-toml.js'
import toYaml from '../bajo/helper/to-yaml.js'
import Path from 'path'

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

async function tool ({ path, args = []}) {
  const { importPkg, print, pathResolve } = this.bajo.helper
  const [_, fs, prompts, delay] = await importPkg('lodash::bajo', 'fs-extra::bajo',
    '@inquirer/prompts::bajo-cli', 'delay::bajo')
  const { input, select } = prompts
  let [src, dest] = args
  if (!path) {
    path = await select({
      message: print.format('Please select a method:'),
      choices: _.map(_.keys(handler), k => ({ value: k }))
    })
    let from = []
    if (path.startsWith('json')) from = ['.json']
    else if (path.startsWith('toml')) from = ['.toml']
    else from = ['.yaml', '.yml']
    let to = []
    if (path.endsWith('json')) to = '.json'
    else if (path.endsWith('toml')) to = '.toml'
    else to = '.yaml'

    src = await input({
      message: print.format(`Source file (%s):`, _.map(from, f => '*' + f).join(', ')),
      validate: (item) => {
        if (_.isEmpty(item)) return false
        const ext = Path.extname(item)
        if (from.includes(ext)) return true
        return print.format('Invalid extention')
      }
    })
    let defVal = src
    _.each(from, f => {
      defVal = defVal.replaceAll(f, to)
    })
    dest = await input({
      message: print.format(`Destination file (*%s). Left empty to show on screen:`, to),
      default: defVal,
      validate: (item) => {
        if (_.isEmpty(item)) return true
        const ext = Path.extname(item)
        if (to === ext) return true
        return print.format('Invalid extention')
      }
    })
  }
  if (!_.keys(handler).includes(path)) print.fatal(`Choose only one of these: %s`, _.map(_.keys(handler), c => `'bajoConfig:${c}'`).join(', '))
  if (!src) print.fatal(`You must provide a source file`)
  src = pathResolve(src)
  dest = _.isEmpty(dest) ? null : pathResolve(dest)
  if (!fs.existsSync(src)) print.fatal(`Source file '%s' not found. Aborted!`, src)
  if (dest) {
    const dir = Path.dirname(dest)
    if (!fs.existsSync(dir)) print.fatal(`Destination dir '%s' not found. Aborted!`, dir)
  }
  const spinner = print.bora('Converting...').start()
  await delay(3000)
  let result
  try {
    result = await handler[path].call(this, src)
  } catch (err) {
    spinner.fatal(`Error: %s`, err.message)
  }
  spinner.info('Done!')
  if (_.isEmpty(dest)) {
    console.log(result)
  } else {
    fs.writeFileSync(dest, result, 'utf8')
  }
}

export default tool
