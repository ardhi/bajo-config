async function fromJson (file, isContent) {
  const { importPackage } = this.bajo.helper
  const fs = await importPackage('fs-extra::bajo')
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return JSON.parse(content)
}

export default fromJson
