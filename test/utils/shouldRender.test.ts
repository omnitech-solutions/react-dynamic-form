import shouldRender from '../../src/utils/shouldRender'

describe('shouldRender', () => {
  describe('with no difference', () => {
    it('returns false', () => {
      const actual = shouldRender({ a: 1 }, { a: 1 })

      expect(actual).toEqual(false)
    })
  })

  describe('with different values', () => {
    it('returns true', () => {
      const actual = shouldRender({ a: 1 }, { a: 2 })

      expect(actual).toEqual(true)
    })
  })

  describe('with re-ordered keys', () => {
    it('returns false', () => {
      const actual = shouldRender({ a: 1, b: 2 }, { b: 2, a: 1 })

      expect(actual).toEqual(false)
    })
  })
})
