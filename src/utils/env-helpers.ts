const isEnv = (env: string) => env === process.env.NODE_ENV

const env = () => ({
  isTest: isEnv('test'),
  isDev: isEnv('development'),
  isStaging: isEnv('staging'),
  isProd: isEnv('production'),
  isNotTest: !isEnv('test'),
  isNotDev: !isEnv('development'),
  isNotStaging: !isEnv('staging'),
  isNotProd: !isEnv('production')
})

export default env()
