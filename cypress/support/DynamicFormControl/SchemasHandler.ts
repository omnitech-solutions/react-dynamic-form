import { difference, intersection } from 'lodash'
import { isPresent } from '@oc-tech/lodash-ext'
import inputTypesFromSchema from '../../../src/utils/inputTypesFromSchema'

import FormDataHandler from './FormDataHandler'
import SchemaHandler from './SchemaHandler'
import { RJSFSchema, UiSchema } from '@rjsf/utils'
import { FormData } from '../../../src/common/types'

class SchemasHandler {
  readonly inputTypes: Readonly<{ [p: string]: string }>
  formDataHandler: FormDataHandler
  schemaHandler: SchemaHandler

  /**
   *
   * @param {{schema: object, uiSchema: object, formData: object}|*} options
   */
  constructor(options: {
    formDataHandler?: FormDataHandler
    schemaHandler?: SchemaHandler
    schema?: RJSFSchema
    uiSchema?: UiSchema
    formData?: FormData
  }) {
    const { schema, uiSchema, formData } = options

    this.inputTypes = Object.freeze(
      // @ts-ignore
      inputTypesFromSchema({ schema, uiSchema })
    )

    this.formDataHandler =
      options.formDataHandler || new FormDataHandler(formData)
    this.schemaHandler = options.schemaHandler || new SchemaHandler(schema)
  }

  type(nameOrLabel: string) {
    const name = this.fieldNameFor(nameOrLabel)
    return this.inputTypes[name]
  }

  ignore(fieldName: string) {
    this.formDataHandler.ignore(this.fieldNameFor(fieldName))
  }

  fill(
    nameOrLabel: string,
    value: string,
    callback: ({ name, type }: { name: string; type: string }) => void
  ) {
    const name = this.fieldNameFor(nameOrLabel)
    if (!name) return

    this.formDataHandler.fill(this.fieldNameFor(name), value, () =>
      callback({
        name,
        // @ts-ignore
        value,
        type: this.type(name)
      })
    )
  }

  getFieldNames() {
    return this.schemaHandler.getFieldNames()
  }

  getFilteredFieldNamesFor(fieldNames: Array<string> = []) {
    const allFieldNames = this.schemaHandler.getFieldNames()
    const matchingFieldNames =
      (isPresent(fieldNames) &&
        intersection(
          this.schemaHandler.getFieldNamesFor(fieldNames),
          allFieldNames
        )) ||
      allFieldNames

    return difference(matchingFieldNames, this.formDataHandler.getIgnored())
  }

  getFilledInFields() {
    return this.formDataHandler.getFilledInFields()
  }

  getFilledValueFor(name: string) {
    return this.getFilledInFields()[name]
  }

  getFilledInFieldNames() {
    return Object.keys(this.getFilledInFields())
  }

  getFormData() {
    return this.formDataHandler.getFormData()
  }

  fieldNameFor(nameOrLabel: string) {
    return this.schemaHandler.getFieldName(nameOrLabel)
  }

  lastFilledFieldName() {
    return this.formDataHandler.getLastFilledInFieldName()
  }
}

export default SchemasHandler
