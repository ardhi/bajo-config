async function toJson (file, isContent, opts = 2) {
  const { fs } = this.app.bajo.lib
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return JSON.stringify(content, null, opts)
}

export default toJson
