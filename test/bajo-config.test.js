/* global describe, it, beforeEach, afterEach */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { expect } from 'chai'

import factory from '../index.js'

const createTempRoot = () => fs.mkdtempSync(path.join(os.tmpdir(), 'bajo-config-test-'))

describe('BajoConfig', () => {
  let root
  let config

  beforeEach(async () => {
    root = createTempRoot()
    const app = {
      lib: {
        fs,
        _: {
          omit: (obj, keys) => Object.fromEntries(
            Object.entries(obj ?? {}).filter(([key]) => !keys.includes(key))
          )
        }
      },
      baseClass: {
        Base: class Base {
          constructor (pkgName, appRef) {
            this.pkgName = pkgName
            this.app = appRef
          }
        }
      }
    }

    const BajoConfig = await factory.call({ app }, 'bajo-config')
    config = new BajoConfig()
  })

  afterEach(() => {
    if (root) fs.rmSync(root, { recursive: true, force: true })
  })

  it('initializes with empty config object', () => {
    expect(config.config).to.deep.equal({})
  })

  it('parses JSON, YAML and TOML strings', () => {
    expect(config.fromJson('{"a":1}')).to.deep.equal({ a: 1 })
    expect(config.fromYaml('a: 1\n')).to.deep.equal({ a: 1 })
    expect(config.fromToml('a = 1\n')).to.deep.equal({ a: 1 })
  })

  it('reads parse content from files when readFromFile is true', () => {
    const jsonFile = path.join(root, 'sample.json')
    const yamlFile = path.join(root, 'sample.yaml')
    const tomlFile = path.join(root, 'sample.toml')

    fs.writeFileSync(jsonFile, '{"name":"json"}', 'utf8')
    fs.writeFileSync(yamlFile, 'name: yaml\n', 'utf8')
    fs.writeFileSync(tomlFile, 'name = "toml"\n', 'utf8')

    expect(config.fromJson(jsonFile, { readFromFile: true })).to.deep.equal({ name: 'json' })
    expect(config.fromYaml(yamlFile, { readFromFile: true })).to.deep.equal({ name: 'yaml' })
    expect(config.fromToml(tomlFile, { readFromFile: true })).to.deep.equal({ name: 'toml' })
  })

  it('keeps yml aliases equivalent to yaml methods', () => {
    const obj = config.fromYml('x: 3\n')
    expect(obj).to.deep.equal({ x: 3 })

    const yaml = config.toYaml({ x: 3 })
    const yml = config.toYml({ x: 3 })

    expect(config.fromYaml(yaml)).to.deep.equal(config.fromYml(yml))
  })

  it('serializes objects to JSON, YAML and TOML strings', () => {
    const object = { a: 1, b: 'text' }

    const json = config.toJson(object)
    const yaml = config.toYaml(object)
    const toml = config.toToml(object)

    expect(JSON.parse(json)).to.deep.equal(object)
    expect(config.fromYaml(yaml)).to.deep.equal(object)
    expect(config.fromToml(toml)).to.deep.equal(object)
  })

  it('writes serialized output to file when writeToFile is true', () => {
    const object = { a: 1 }
    const jsonOut = path.join(root, 'out.json')
    const yamlOut = path.join(root, 'out.yaml')
    const tomlOut = path.join(root, 'out.toml')

    expect(config.toJson(object, { writeToFile: true, saveAsFile: jsonOut })).to.equal(undefined)
    expect(config.toYaml(object, { writeToFile: true, saveAsFile: yamlOut })).to.equal(undefined)
    expect(config.toToml(object, { writeToFile: true, saveAsFile: tomlOut })).to.equal(undefined)

    expect(config.fromJson(jsonOut, { readFromFile: true })).to.deep.equal(object)
    expect(config.fromYaml(yamlOut, { readFromFile: true })).to.deep.equal(object)
    expect(config.fromToml(tomlOut, { readFromFile: true })).to.deep.equal(object)
  })
})
