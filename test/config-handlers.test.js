/* global describe, it */

import { expect } from 'chai'

import handlers from '../extend/bajo/config-handlers.js'

describe('Config Handlers', () => {
  it('exports handlers toml extensions', () => {
    expect(handlers).to.be.an('array').with.lengthOf(1)
    expect(handlers.map(item => item.ext)).to.deep.equal(['.toml'])
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
