import fs from 'fs'

function fromJson (file, isContent) {
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return JSON.parse(content)
}

export default fromJson
