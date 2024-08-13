import toml from '@iarna/toml'

function fromToml (file, isContent) {
  const { fs } = this.app.bajo.lib
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return toml.parse(content)
}

export default fromToml
