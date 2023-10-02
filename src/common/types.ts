import { RJSFSchema, UiSchema, FormContextType } from '@rjsf/utils'

interface FormData {
  [key: string]: any
}

interface FormFieldError {
  property: string
  value: any
}

interface RJSFSchemasProps {
  schema?: RJSFSchema
  uiSchema?: UiSchema
  formContext?: FormContextType
  conditionalRules?: object
  formData?: FormData
  errors?: Array<FormFieldError>
}

interface KeyValueOption {
  key: string
  value: string
}

export {
  RJSFSchema,
  UiSchema,
  FormContextType,
  FormData,
  FormFieldError,
  RJSFSchemasProps,
  KeyValueOption
}
