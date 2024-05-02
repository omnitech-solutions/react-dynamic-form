import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import DynamicForm from './DynamicForm'

const formConfig = {
  schema: {
    type: 'object',
    required: ['description'],
    properties: {
      name: {
        type: 'string',
        title: 'Name'
      },
      description: {
        type: 'string',
        title: 'Description'
      },
      diskUsage: {
        type: 'number',
        title: 'Disk Usage'
      },
      createdAt: {
        type: 'string',
        title: 'Created At'
      },
      updatedAt: {
        type: 'string',
        title: 'Updated At'
      }
    }
  },
  uiSchema: {
    name: {
      'ui:options': {
        disabled: true
      }
    },
    description: {
      'ui:widget': 'textarea'
    },
    diskUsage: {
      'ui:options': {
        disabled: true
      }
    },
    createdAt: {
      'ui:options': {
        disabled: true
      }
    },
    updatedAt: {
      'ui:options': {
        disabled: true
      }
    }
  },
  formContext: {
    colSpan: 12
  },
  formData: {
    name: 'some-name',
    description: 'some-description',
    diskUsage: 121,
    createdAt: '2024-04-26T00:14:54Z',
    updatedAt: '2024-05-02T18:25:40Z'
  }
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dynamic Form',
  component: DynamicForm,
  parameters: formConfig,
  argTypes: {}
} satisfies Meta<typeof DynamicForm>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: formConfig
}
