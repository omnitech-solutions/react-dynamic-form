import { RJSFSchema } from '@rjsf/utils'

const schema: RJSFSchema = {
  title: 'Test form',
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      title: 'First name'
    },
    lastName: {
      type: 'string',
      title: 'Last name'
    },
    age: {
      type: 'number',
      title: 'Age'
    }
  }
}

const uiSchema = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': ''
  }
}

const formContext = {}

const conditionalRules = {}

const formData = { firstName: 'Desmond', lastName: "O'Leary", age: 34 }

export default {
  schema,
  uiSchema,
  formContext,
  conditionalRules,
  formData
}
