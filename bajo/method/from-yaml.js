import yaml from 'js-yaml'

function fromYaml (file, isContent) {
  const { fs } = this.app.bajo.lib
  const content = isContent ? file : fs.readFileSync(file, 'utf8')
  return yaml.load(content)
}

export default fromYaml
