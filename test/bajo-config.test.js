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

  it('parses TOML strings', () => {
    expect(config.fromToml('a = 1\n')).to.deep.equal({ a: 1 })
  })

  it('reads parse content from files when readFromFile is true', () => {
    const tomlFile = path.join(root, 'sample.toml')

    fs.writeFileSync(tomlFile, 'name = "toml"\n', 'utf8')

    expect(config.fromToml(tomlFile, { readFromFile: true })).to.deep.equal({ name: 'toml' })
  })

  it('serializes objects to TOML strings', () => {
    const object = { a: 1, b: 'text' }

    const toml = config.toToml(object)

    expect(config.fromToml(toml)).to.deep.equal(object)
  })

  it('writes serialized output to file when writeToFile is true', () => {
    const object = { a: 1 }
    const tomlOut = path.join(root, 'out.toml')

    expect(config.toToml(object, { writeToFile: true, saveAsFile: tomlOut })).to.equal(undefined)

    expect(config.fromToml(tomlOut, { readFromFile: true })).to.deep.equal(object)
  })
})
