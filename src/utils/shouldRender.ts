import { isPresent } from '@oc-tech/lodash-ext'
import { pick } from 'lodash'
import { deepEquals } from '@rjsf/utils'

export interface ShouldRenderOptions {
  keysToPick?: Array<string>
}

const shouldRender = (
  prevProps: object,
  nextProps: object,
  { keysToPick = [] }: ShouldRenderOptions = {}
) => {
  const objA = isPresent(keysToPick) ? pick(prevProps, keysToPick) : prevProps
  const objB = isPresent(keysToPick) ? pick(nextProps, keysToPick) : nextProps

  return !deepEquals(objA, objB)
}

export default shouldRender
