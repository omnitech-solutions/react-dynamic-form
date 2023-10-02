import { noop } from 'lodash'
import {
  assertHintMessage,
  assertInputValue,
  fillInInput,
  findHintFor,
  findInputFor
} from './cyMixins'

import SchemasHandler from './SchemasHandler'
import { RJSFSchemasProps } from '../../../src/common/types'

class DynamicFormControl {
  private readonly handler: SchemasHandler

  constructor(
    schemas: RJSFSchemasProps,
    { handler }: { handler?: SchemasHandler } = {}
  ) {
    this.handler = handler || new SchemasHandler(schemas)
  }

  /**
   * Fills in all fields
   *
   * @return {DynamicFormControl}
   */
  populateFormData() {
    this.populateInputs(this.handler.getFormData())
    return this
  }

  populate(nameOrLabel: string, value: string, callback = noop) {
    const fillField = (name: string, type: string) => {
      switch (type) {
        default:
          return fillInInput({ name, value })
      }
    }

    this.handler.fill(
      nameOrLabel,
      value,
      ({ name, type }: { name: string; type: string }) => {
        callback(fillField(name, type), { name, value })
      }
    )
  }

  /**
   * Populates each filtered field
   *
   * @param {{[string]: *}} formData
   */
  populateInputs(formData: object) {
    this.eachFilteredPair(
      formData,
      ({ name, value }: { name: string; value: string }) => {
        return this.populate(name, value)
      }
    )

    return this
  }

  eachFilteredPair(
    formData: { [index: string]: any },
    callback: ({ name, value }: { name: string; value: string }) => void
  ) {
    this._eachFilteredFieldName({
      namesOrLabels: Object.keys(formData),
      callback: (name: string) => {
        return callback({ name, value: formData[name] })
      }
    })
  }

  /**
   * @param {string} name
   *
   * @return {Cypress.Chainable<Subject>}
   */
  input(name: string) {
    return findInputFor(name)
  }

  methodsFor(name: string) {
    return {
      name,
      fill: (value: string, callback: (...args: any[]) => void) =>
        this.populate(name, value, callback),
      hint: () => findHintFor(name),
      input: () => this.input(name),
      assertValue: () =>
        assertInputValue(name, this.handler.getFilledValueFor(name)),
      assertMessage: (expectedMessage: string) =>
        assertHintMessage(name, expectedMessage)
    }
  }

  eachInput = (
    namesOrLabels: Array<string>,
    callback: (name: Cypress.Chainable<JQuery<HTMLElement>>) => void
  ) => {
    this._eachFilteredFieldName({
      namesOrLabels,
      callback: (name: string) => callback(this.input(name))
    })
    return this
  }

  each(namesOrLabels: Array<string>, callback: (name: object) => void) {
    this._eachFilteredFieldName({
      namesOrLabels,
      callback: (name: string) => callback(this.methodsFor(name))
    })
    return this
  }

  eachFilledMethods(callback: (name: object) => void) {
    this.each(this.handler.getFilledInFieldNames(), callback)
    return this
  }

  lastFilledName() {
    return this.handler.lastFilledFieldName()
  }

  lastFilledMethods() {
    // @ts-ignore
    return this.methodsFor(this.handler.lastFilledFieldName())
  }

  lastFilledInput() {
    // @ts-ignore
    return this.input(this.lastFilledName())
  }

  eachFilledInField(callback: (name: string) => void) {
    // @ts-ignore
    this.eachInput(this.handler.getFilledInFieldNames(), callback)
    return this
  }

  ignore(nameOrLabel: string) {
    this.handler.ignore(nameOrLabel)
    return this
  }

  _eachFilteredFieldName({
    namesOrLabels,
    callback
  }: {
    namesOrLabels: string[]
    callback: (name: string) => void
  }): this {
    this.handler
      .getFilteredFieldNamesFor(namesOrLabels)
      .forEach((name: any) => callback(name))
    return this
  }
}

Object.assign(DynamicFormControl.prototype, {
  fillInInput,
  findInputFor,
  findHintFor,
  assertInputValue,
  assertHintMessage
})

export default DynamicFormControl
