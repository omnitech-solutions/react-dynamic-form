import { chain, once, get } from 'lodash'
import { RJSFSchema } from '@rjsf/utils'

class SchemaHandler {
  schema: RJSFSchema
  private readonly fieldNames: Readonly<string[]>
  constructor(schema?: RJSFSchema) {
    this.schema = Object.freeze({ ...schema })
    this.fieldNames = Object.freeze(
      Object.keys({ ...this.#schemaProperties() })
    )
  }

  getFieldNames(): ReadonlyArray<string> {
    return this.fieldNames
  }

  getFieldName(nameOrLabel: string) {
    const matchedProperty = get(this.schema, `properties.${nameOrLabel}`)
    if (matchedProperty) return nameOrLabel

    return get(this.#memorizedTitleFieldNameMap(), nameOrLabel)
  }

  getFieldNamesFor(nameOrLabelList: Array<string>) {
    return chain(nameOrLabelList)
      .map(nameOrLabel => this.getFieldName(nameOrLabel))
      .compact()
      .uniq()
      .value()
  }

  #memorizedTitleFieldNameMap() {
    const mapTitle = once(() =>
      // @ts-ignore
      Object.entries(this.#schemaProperties()).reduce(
        (memo, [k, { title }]) => ({ ...memo, [title]: k }),
        {}
      )
    )

    return mapTitle()
  }

  #schemaProperties() {
    return get(this.schema, 'properties', {})
  }

  #schemaPropertyFor(nameOrLabel: string) {
    return get(this.#schemaProperties(), nameOrLabel)
  }
}

export default SchemaHandler
