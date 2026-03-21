import toml from 'smol-toml'
import fs from 'fs'

function fromToml (data, opts = {}) {
  const content = opts.readFromFile ? fs.readFileSync(data, 'utf8') : data
  return toml.parse(content)
}

export default fromToml
