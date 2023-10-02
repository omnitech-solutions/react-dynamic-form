import { RJSFSchema, UiSchema } from '@rjsf/utils'
import { FormData, KeyValueOption } from '../../../common/types'

interface FilterByMaxParams {
  field: string
  options: Array<KeyValueOption>
  maxValueKey: string
}

const filterByMax = (
  params: FilterByMaxParams,
  schema: RJSFSchema,
  _uiSchema: UiSchema,
  formData: FormData
) => {
  const { field, maxValueKey, options } = params
  const maxValue = formData[maxValueKey]

  const filteredOptions = options.filter(
    option => parseInt(option.value, 10) <= parseInt(maxValue, 10)
  )

  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  schema.properties[field].enumNames = filteredOptions.map(option => option.key)

  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  schema.properties[field].enum = filteredOptions.map(option => option.value)
}

export default filterByMax
