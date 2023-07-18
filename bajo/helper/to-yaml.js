import yaml from 'js-yaml'

async function toYaml (file, isContent, opts) {
  const { importPkg } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return yaml.dump(content, opts)
}

export default toYaml
