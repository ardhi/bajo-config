import yaml from 'js-yaml'

async function toYaml (file, isContent, opts) {
  const { importPackage } = this.bajo.helper
  const fs = await importPackage('fs-extra::bajo')
  const content = isContent ? file : JSON.parse(fs.readFileSync(file, 'utf8'))
  return yaml.dump(content, opts)
}

export default toYaml
