async function fromJson (file, isContent) {
  const { importPkg } = this.bajo.helper
  const fs = await importPkg('fs-extra::bajo')
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return JSON.parse(content)
}

export default fromJson
