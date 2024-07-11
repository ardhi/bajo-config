async function fromJson (file, isContent) {
  const { fs } = this.app.bajo.lib
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return JSON.parse(content)
}

export default fromJson
