import { IChangeEvent } from '@rjsf/core'
import FormRjsf from '@rjsf/antd'
import ajv8Validator from '@rjsf/validator-ajv8'
import { noop } from 'lodash'
import React, { ReactNode } from 'react'
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  UiSchema
} from '@rjsf/utils'

export interface DynamicFormProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
> {
  schema: S
  uiSchema?: UiSchema<T, S, F>

  formData?: T
  formContext?: F
  children?: ReactNode
  onChange?: (data: IChangeEvent<T, S, F>, id?: string) => void
  onBlur?: (id: string, data: any) => void
}

function DynamicForm({
  schema,
  uiSchema,
  formData = {},
  formContext = {},
  onChange = noop,
  onBlur = noop,
  children
}: DynamicFormProps) {
  return children ? (
    <FormRjsf
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      formContext={formContext}
      onBlur={onBlur}
      onChange={onChange}
      validator={ajv8Validator}
    >
      {children}
    </FormRjsf>
  ) : (
    <FormRjsf
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onBlur={onBlur}
      onChange={onChange}
      validator={ajv8Validator}
    />
  )
}

export default DynamicForm
