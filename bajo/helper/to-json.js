async function toJson (file, isContent, opts = 2) {
  const { importPackage } = this.bajo.helper
  const fs = await importPackage('fs-extra::bajo')
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return JSON.stringify(content, null, opts)
}

export default toJson
