import React from 'react'
import DynamicForm from '../../../src/components/DynamicForm'
import DynamicFormControl from '../../support/DynamicFormControl'
import { userSchemas } from '../../../data'

describe('<DynamicForm />', () => {
  const { schema } = userSchemas
  let control

  beforeEach(() => {
    control = new DynamicFormControl(userSchemas)
  })

  it('renders', () => {
    cy.mount(<DynamicForm schema={schema} />)

    control.populateFormData()

    control.input('firstName').should('have.value', 'Desmond')
    control.input('lastName').should('have.value', "O'Leary")
    control.input('age').should('have.value', '34')
  })
})
