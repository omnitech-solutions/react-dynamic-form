import { get } from 'lodash'
import { RJSFSchema, UiSchema } from '@rjsf/utils'

const inputTypesFromSchema = ({
  schema,
  uiSchema
}: {
  schema: RJSFSchema
  uiSchema: UiSchema
}): { [key: string]: string } => {
  const { properties = {} } = schema

  return Object.keys(properties).reduce<{ [key: string]: string }>(
    (memo, field) => {
      const uiWidget = get(uiSchema, `${field}['ui:widget']`)
      const uiField = get(uiSchema, `${field}['ui:field']`)

      const uiType = uiWidget || uiField
      // @ts-ignore
      memo[field] = uiType || (properties[field].type as string) || 'default'

      return memo
    },
    {}
  )
}

export default inputTypesFromSchema
