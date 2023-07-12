async function toJson (file, isContent, opts = 2) {
  const { importPkg } = this.bajo.helper
  const fs = await importPkg('fs-extra::bajo')
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return JSON.stringify(content, null, opts)
}

export default toJson
