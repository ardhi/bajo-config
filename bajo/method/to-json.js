import fs from 'fs'

function toJson (file, isContent, opts = 2) {
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return JSON.stringify(content, null, opts)
}

export default toJson
