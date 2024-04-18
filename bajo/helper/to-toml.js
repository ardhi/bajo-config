import toml from '@iarna/toml'

async function toToml (file, isContent, opts) {
  const { fs } = this.bajo.helper
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return toml.stringify(content, opts)
}

export default toToml
