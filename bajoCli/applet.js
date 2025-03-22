import fromJson from '../bajo/method/from-json.js'
import fromToml from '../bajo/method/from-toml.js'
import fromYaml from '../bajo/method/from-yaml.js'
import toJson from '../bajo/method/to-json.js'
import toToml from '../bajo/method/to-toml.js'
import toYaml from '../bajo/method/to-yaml.js'
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
    const content = await fromYaml.call(this, file)
    return toJson.call(this, content, true)
  },
  async yaml2toml (file) {
    return toToml.call(this, await fromYaml.call(this, file), true)
  }
}

async function applet (path, ...args) {
  const { importPkg, resolvePath } = this.app.bajo
  const { fs } = this.lib
  const { map, keys, isEmpty, each } = this.lib._
  const [prompts, delay] = await importPkg('bajoCli:@inquirer/prompts', 'delay')
  const { input, select } = prompts
  let [src, dest] = args
  if (!path) {
    path = await select({
      message: this.print.write('Please select a method:'),
      choices: map(keys(handler), k => ({ value: k }))
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
      message: this.print.write('Source file (%s):', map(from, f => '*' + f).join(', ')),
      validate: (item) => {
        if (isEmpty(item)) return false
        const ext = Path.extname(item)
        if (from.includes(ext)) return true
        return this.print.write('Invalid extention')
      }
    })
    let defVal = src
    each(from, f => {
      defVal = defVal.replaceAll(f, to)
    })
    dest = await input({
      message: this.print.write('Destination file (*%s). Left empty to show on screen:', to),
      default: defVal,
      validate: (item) => {
        if (isEmpty(item)) return true
        const ext = Path.extname(item)
        if (to === ext) return true
        return this.print.write('Invalid extention')
      }
    })
  }
  if (!keys(handler).includes(path)) this.print.fatal('Choose only one of these: %s', map(keys(handler), c => `'bajoConfig:${c}'`).join(', '))
  if (!src) this.print.fatal('You must provide a source file')
  src = resolvePath(src)
  dest = isEmpty(dest) ? null : resolvePath(dest)
  if (!fs.existsSync(src)) this.print.fatal('Source file \'%s\' not found. Aborted!', src)
  if (dest) {
    const dir = Path.dirname(dest)
    if (!fs.existsSync(dir)) this.print.fatal('Destination dir \'%s\' not found. Aborted!', dir)
  }
  const spin = this.print.start('Converting...')
  await delay(3000)
  let result
  try {
    result = await handler[path].call(this, src)
  } catch (err) {
    console.log(err)
    spin.fatal('Error: %s', err.message)
  }
  spin.info('Done!')
  if (isEmpty(dest)) {
    console.log(result)
  } else {
    fs.writeFileSync(dest, result, 'utf8')
  }
}

export default applet
