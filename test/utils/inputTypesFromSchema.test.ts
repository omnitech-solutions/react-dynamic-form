import { expect } from 'chai'
import inputTypesFromSchema from '../../src/utils/inputTypesFromSchema'
import { userSchemas } from '../../data'

describe('inputTypesFromSchema', () => {
  it('extracts all fields with ui:field or ui:widget', () => {
    const { schema, uiSchema } = userSchemas
    // @ts-ignore
    const actual = inputTypesFromSchema({ schema, uiSchema })

    expect(actual).to.eql({
      age: 'number',
      firstName: 'string',
      lastName: 'string'
    })
  })
})
