/* global describe, it */

import { expect } from 'chai'

import handlers from '../extend/bajo/config-handlers.js'

describe('Config Handlers', () => {
  it('exports handlers for yml, yaml and toml extensions', () => {
    expect(handlers).to.be.an('array').with.lengthOf(3)
    expect(handlers.map(item => item.ext)).to.deep.equal(['.yml', '.yaml', '.toml'])
  })

  it('reuses yaml handlers for both yml and yaml extensions', () => {
    const yml = handlers.find(item => item.ext === '.yml')
    const yaml = handlers.find(item => item.ext === '.yaml')

    expect(yml.readHandler).to.equal(yaml.readHandler)
    expect(yml.writeHandler).to.equal(yaml.writeHandler)
  })

  it('delegates yaml read/write handlers to instance methods', async () => {
    const yaml = handlers.find(item => item.ext === '.yaml')
    const calls = []
    const ctx = {
      fromYaml: (text, opts) => {
        calls.push(['fromYaml', text, opts])
        return { parsed: true }
      },
      toYaml: (object, opts) => {
        calls.push(['toYaml', object, opts])
        return 'yaml-output'
      }
    }

    const readOpts = { readFromFile: true }
    const writeOpts = { writeToFile: true, saveAsFile: '/tmp/out.yaml' }

    const parsed = await yaml.readHandler.call(ctx, 'a: 1\n', readOpts)
    const output = await yaml.writeHandler.call(ctx, { a: 1 }, writeOpts)

    expect(parsed).to.deep.equal({ parsed: true })
    expect(output).to.equal('yaml-output')
    expect(calls).to.deep.equal([
      ['fromYaml', 'a: 1\n', readOpts],
      ['toYaml', { a: 1 }, writeOpts]
    ])
  })

  it('delegates toml read/write handlers to instance methods', async () => {
    const toml = handlers.find(item => item.ext === '.toml')
    const calls = []
    const ctx = {
      fromToml: (text, opts) => {
        calls.push(['fromToml', text, opts])
        return { parsed: true }
      },
      toToml: (object, opts) => {
        calls.push(['toToml', object, opts])
        return 'toml-output'
      }
    }

    const readOpts = { readFromFile: true }
    const writeOpts = { writeToFile: true, saveAsFile: '/tmp/out.toml' }

    const parsed = await toml.readHandler.call(ctx, 'a = 1\n', readOpts)
    const output = await toml.writeHandler.call(ctx, { a: 1 }, writeOpts)

    expect(parsed).to.deep.equal({ parsed: true })
    expect(output).to.equal('toml-output')
    expect(calls).to.deep.equal([
      ['fromToml', 'a = 1\n', readOpts],
      ['toToml', { a: 1 }, writeOpts]
    ])
  })
})
