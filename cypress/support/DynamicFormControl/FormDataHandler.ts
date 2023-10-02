import { chain, noop } from 'lodash'
import { FormData } from '../../../src/common/types'

class FormDataHandler {
  readonly originalFormData: object
  readonly filledInFields: { [key: string]: string }

  private lastFilledInFieldName: string | null
  readonly ignored: Set<string>

  constructor(formData?: FormData) {
    this.originalFormData = Object.freeze({ ...formData })
    this.filledInFields = {}
    this.lastFilledInFieldName = null
    this.ignored = new Set()
  }

  fill(name: string, value: string, callback = noop) {
    if (this.isIgnored(name)) return

    this.filledInFields[name] = value
    this.lastFilledInFieldName = name

    callback({ name, value })
  }

  ignore(fieldName: string) {
    this.ignored.add(fieldName)
    return this
  }

  isIgnored(name: string) {
    return this.ignored.has(name)
  }

  getIgnored() {
    return chain(Array.from(this.ignored)).compact().value()
  }

  getFilledInFields() {
    return this.filledInFields
  }

  getFormData() {
    return { ...this.originalFormData, ...this.filledInFields }
  }

  getLastFilledInFieldName() {
    return this.lastFilledInFieldName
  }
}

export default FormDataHandler
