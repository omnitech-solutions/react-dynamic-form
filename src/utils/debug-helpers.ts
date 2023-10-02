/* eslint-disable no-console */
import env from './env-helpers'

const { isNotProd } = env

const nonProdConsoleError = (exception: any) => {
  if (isNotProd) console.error(exception)
}

export { nonProdConsoleError }
