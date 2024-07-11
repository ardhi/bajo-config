import toml from '@iarna/toml'

async function toToml (file, isContent, opts) {
  const { fs } = this.app.bajo.lib
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return toml.stringify(content, opts)
}

export default toToml
