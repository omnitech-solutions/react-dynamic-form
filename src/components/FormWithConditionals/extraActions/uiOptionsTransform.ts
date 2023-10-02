import { set, reduce, toArray, isFunction } from 'lodash'
import { object } from 'prop-types'
// @ts-ignore
import { validateFields } from 'rjsf-conditionals'
import TRANSFORMS from '../transforms'

interface Params {
  [key: string]: any
}

/**
 * Replace original field in uiSchema's ui:options  with defined configuration
 *
 * @param params
 * @param schema
 * @param uiSchema
 * @param formData
 * @returns {{schema: *, uiSchema: *}}
 */
export default function uiOptionsTransform(
  params: Params,
  schema: object,
  uiSchema: object,
  formData: object
) {
  Object.keys(params).forEach((field: string) => {
    const valueOrFunc = params[field]

    if (isFunction(valueOrFunc)) {
      valueOrFunc({ params, schema, uiSchema, formData })
    } else {
      set(uiSchema, `${field}[ui:options]`, applyTransform(params[field]))
    }
  })
}

const applyTransform = (opts: any) =>
  reduce(
    opts,
    (memo, _actions, key) => {
      const actions = toArray(_actions)
      let value: any

      actions.forEach(action => {
        // @ts-ignore
        value = TRANSFORMS[action](value)
      })

      return { ...memo, [key]: value }
    },
    {}
  )

uiOptionsTransform.propTypes = object.isRequired
uiOptionsTransform.validate = validateFields(
  'uiOptionsReplace',
  function (params: any) {
    return Object.keys(params)
  }
)
