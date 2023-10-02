import { expect } from 'chai'

import { inputTypesFromSchema, shouldRender } from '../../src/utils'

describe('exports', () => {
  ;[inputTypesFromSchema, shouldRender].forEach(func => {
    it(`${func.name} returns a function`, () => {
      expect(typeof func).to.eql('function')
    })
  })
})
