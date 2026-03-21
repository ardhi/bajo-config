import fs from 'fs'

function fromJson (data, opts = {}) {
  const content = opts.readFromFile ? fs.readFileSync(data, 'utf8') : data
  return JSON.parse(content)
}

export default fromJson
