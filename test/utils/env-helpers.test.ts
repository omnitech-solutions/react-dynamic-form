import env from '../../src/utils/env-helpers'

describe('isEnv', () => {
  it('returns true for current env', () => {
    expect(env.isTest).to.be.true
    expect(env.isDev).to.be.false
    expect(env.isNotTest).to.be.false
    expect(env.isNotDev).to.be.false
    expect(env.isStaging).to.be.false
    expect(env.isNotStaging).to.be.false
    expect(env.isProd).to.be.false
    expect(env.isNotProd).to.be.false
  })
})
