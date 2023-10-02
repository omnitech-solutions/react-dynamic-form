import { expect } from 'chai'
import { render, screen } from '@testing-library/react'
import { RJSFSchema } from '@rjsf/utils'
import React from 'react'
import DynamicForm from '../../src/components/DynamicForm'

const schema: RJSFSchema = {
  title: 'Test form',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
}

describe('DynamicForm', () => {
  it('renders successfully', () => {
    render(<DynamicForm schema={schema} />)

    screen.debug()
  })
})
