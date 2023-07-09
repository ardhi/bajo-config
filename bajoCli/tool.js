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
  const { importPackage, print, pathResolve } = this.bajo.helper
  const { _, fs, prompts } = await importPackage('lodash:_:bajo', 'fs-extra:fs:bajo',
    '@inquirer/prompts:prompts:bajo-cli')
  const { input, select } = prompts
  let [src, dest] = args
  if (!path) {
    path = await select({
      message: 'Please select a method:',
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
      message: `Source file (${_.map(from, f => '*' + f).join(', ')}):`,
      validate: (item) => {
        if (_.isEmpty(item)) return false
        const ext = Path.extname(item)
        if (from.includes(ext)) return true
        return 'Invalid extention'
      }
    })
    let defVal = src
    _.each(from, f => {
      defVal = defVal.replaceAll(f, to)
    })
    dest = await input({
      message: `Destination file (*${to}). Left empty to show on screen:`,
      default: defVal,
      validate: (item) => {
        if (_.isEmpty(item)) return true
        const ext = Path.extname(item)
        if (to === ext) return true
        return 'Invalid extention'
      }
    })
  }
  if (!_.keys(handler).includes(path)) print.fatal(`Choose only one of these: ${_.map(_.keys(handler), c => `'bajoConfig:${c}'`).join(', ')}`)
  if (!src) print.fatal(`You must provide a source file`)
  src = pathResolve(src)
  dest = _.isEmpty(dest) ? null : pathResolve(dest)
  if (!fs.existsSync(src)) print.fatal(`Source file '%s' not found. Aborted!`, src)
  if (dest) {
    const dir = Path.dirname(dest)
    if (!fs.existsSync(dir)) print.fatal(`Destination dir '%s' not found. Aborted!`, dir)
  }
  const spinner = print.ora('Converting...').start()
  let result
  try {
    result = await handler[path].call(this, src)
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

export default tool
