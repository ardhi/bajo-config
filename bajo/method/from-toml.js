import toml from 'smol-toml'
import fs from 'fs'

function fromToml (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return toml.parse(content)
}

export default fromToml
