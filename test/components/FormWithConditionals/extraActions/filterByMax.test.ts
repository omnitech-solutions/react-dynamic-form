import { RJSFSchema } from '@rjsf/utils'
import { expect } from 'chai'
import { FormData } from '../../../../src/common/types'
import filterByMax from '../../../../src/components/FormWithConditionals/extraActions/filterByMax'

const ageOptions = [
  { key: 'Two', value: '2' },
  { key: 'Ten', value: '10' }
]

const origSchema = {
  properties: {
    age: {
      type: 'string',
      enum: ['2', '10'],
      enumNames: ['Two', 'Ten']
    },
    maxAge: {
      type: 'string'
    }
  }
}

const uiSchema = {}

const params = {
  field: 'age',
  options: ageOptions,
  maxValueKey: 'maxAge'
}

describe('filterByMax', () => {
  let formData: FormData
  let filteredSchema: RJSFSchema

  describe('When max value is below the highest options', () => {
    beforeEach(() => {
      formData = {
        maxAge: '2'
      }

      filteredSchema = {
        properties: {
          age: {
            type: 'string',
            enum: ['2'],
            // @ts-ignore
            enumNames: ['Two']
          },
          maxAge: {
            type: 'string'
          }
        }
      }
    })

    it('limits max value for a list of dropdowns', () => {
      const schema = { ...origSchema }
      // @ts-ignore
      filterByMax(params, schema, uiSchema, formData)

      expect(schema).to.eql(filteredSchema)
    })
  })

  describe('When max value is equal to the highest options', () => {
    beforeEach(() => {
      formData = {
        maxAge: '10'
      }
    })

    it('does not change the schema', () => {
      const schema = { ...origSchema }
      // @ts-ignore
      filterByMax(params, schema, uiSchema, formData)

      expect(schema).to.eql(origSchema)
    })
  })
})
