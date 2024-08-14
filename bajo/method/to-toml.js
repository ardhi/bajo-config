import toml from 'smol-toml'
import fs from 'fs'

function toToml (file, isContent, opts) {
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return toml.stringify(content, opts)
}

export default toToml
