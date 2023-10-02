import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import {
  act,
  create,
  ReactTestInstance,
  ReactTestRenderer
} from 'react-test-renderer'
import FormWithConditionals from '../../../src/components/FormWithConditionals/FormWithConditionals'
import { RJSFSchemasProps } from '../../../src/common/types'

const props: RJSFSchemasProps = {
  schema: {
    type: 'object',
    required: ['firstName'],
    properties: {
      firstName: {
        type: 'string',
        title: 'First name'
      },
      lastName: {
        type: 'string',
        title: 'Last name'
      }
    }
  },
  uiSchema: {
    firstName: {
      'ui:autofocus': true,
      'ui:emptyValue': ''
    }
  },
  formData: { firstName: 'some-first-name', lastName: 'some-last-name' },
  errors: [{ property: 'firstName', value: 'some-first-name-error' }],
  formContext: { currencySymbol: '$' }
}

let subject: ReactTestInstance | null
let root: ReactTestRenderer | null

const sandbox = sinon.createSandbox()
let prototype: any = null

describe('FormWithConditionals', () => {
  const setPropsWithField = ({
    name,
    value
  }: {
    name: string
    value: string
  }) => {
    act(() => {
      // @ts-ignore
      root.update(
        <FormWithConditionals
          {...props}
          formData={{ ...props.formData, [name]: value }}
        />
      )
    })
  }

  beforeEach(() => {
    root = create(<FormWithConditionals {...props} />)
    subject = root.getInstance()

    prototype = FormWithConditionals.prototype
    sandbox.spy(prototype, 'shouldComponentUpdate')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('sets state from given props', () => {
    // @ts-ignore
    const { state } = subject

    expect(Object.keys(state)).to.eql([
      'schema',
      'uiSchema',
      'formData',
      'errors',
      'formContext'
    ])

    // // @ts-ignore
    const { formData, errors, formContext } = state

    expect(formData).to.eql(props.formData)
    expect(errors).to.eql(props.errors)
    expect(formContext).to.eql(props.formContext)
  })

  it('ignores unexpected props', () => {
    // make assertions on root
    // @ts-ignore
    expect(root.toJSON()).to.matchSnapshot()

    act(() => {
      // @ts-ignore
      root.update(<FormWithConditionals {...props} unknown={2} />)
    })

    // update with some different props
    // @ts-ignore
    expect(root.toJSON()).to.matchSnapshot()
    // sandbox

    expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
    expect(prototype.shouldComponentUpdate.returned(false)).to.be.true
  })

  describe('formData prop', () => {
    context('with changes', () => {
      it('should render', () => {
        setPropsWithField({ name: 'firstName', value: 'some-other-first-name' })

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.returned(true)).to.be.true
      })

      context('with multiple changes', () => {
        it('re-renders twice', () => {
          setPropsWithField({
            name: 'firstName',
            value: 'some-other-first-name'
          })
          setPropsWithField({ name: 'firstName', value: 'another-first-name' })

          expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })

      context('with duplicate changes', () => {
        it('skips rendering when no changes detected', () => {
          setPropsWithField({
            name: 'firstName',
            value: 'some-other-first-name'
          })
          setPropsWithField({
            name: 'firstName',
            value: 'some-other-first-name'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(false)).to
            .be.true
        })
      })

      context('with another duplicate changes', () => {
        it('re-renders once', () => {
          // @ts-ignore
          setPropsWithField({})
          setPropsWithField({
            name: 'firstName',
            value: 'some-other-first-name'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to
            .be.true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })
    })

    context('with no formData changes', () => {
      it('should not render', () => {
        // @ts-ignore
        setPropsWithField({ ...props.formData })

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to.be
          .true
      })
    })
  })

  describe('errors prop', () => {
    const getFieldErrorFor = ({
      name,
      message
    }: {
      name: string
      message: string
    }) => ({
      property: name,
      name: 'required',
      message,
      stack: `.${name} ${message}`,
      schemaPath: `#/fields/${name}/required`
    })

    const setPropsWithError = ({
      name,
      message
    }: {
      name: string
      message: string
    }) => {
      act(() => {
        // @ts-ignore
        root.update(
          <FormWithConditionals
            {...props}
            errors={[getFieldErrorFor({ name, message })]}
          />
        )
      })
    }

    context('with changes', () => {
      it('should render', () => {
        setPropsWithError({ name: 'firstName', message: 'some-field-error' })

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
          .true
      })

      context('with multiple changes', () => {
        it('re-renders twice', () => {
          setPropsWithError({
            name: 'firstName',
            message: 'some-other-first-name-field-error'
          })

          setPropsWithError({
            name: 'firstName',
            message: 'another-first-name-field-error'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })

      context('with duplicate changes', () => {
        it('skips rendering when no changes detected', () => {
          setPropsWithError({
            name: 'firstName',
            message: 'some-other-first-name-field-error'
          })

          setPropsWithError({
            name: 'firstName',
            message: 'some-other-first-name-field-error'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(false)).to
            .be.true
        })
      })

      context('with another duplicate changes', () => {
        it('re-renders once', () => {
          // @ts-ignore
          setPropsWithField({})

          setPropsWithError({
            name: 'firstName',
            message: 'some-other-first-name-field-error'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to
            .be.true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })
    })

    context('with no errors changes', () => {
      it('should not render', () => {
        // @ts-ignore
        setPropsWithField({})

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to.be
          .true
      })
    })
  })

  describe('formContext prop', () => {
    const setPropsWithFormContextChanges = ({
      currencySymbol
    }: {
      currencySymbol: string
    }) => {
      act(() => {
        // @ts-ignore
        root.update(
          <FormWithConditionals
            {...props}
            formContext={{ ...props.formContext, currencySymbol }}
          />
        )
      })
    }

    context('with changes', () => {
      it('should render', () => {
        setPropsWithFormContextChanges({ currencySymbol: '£' })

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
          .true
      })

      context('with multiple changes', () => {
        it('re-renders twice', () => {
          setPropsWithFormContextChanges({
            currencySymbol: '£'
          })

          setPropsWithFormContextChanges({
            currencySymbol: '€'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })

      context('with duplicate changes', () => {
        it('skips rendering when no changes detected', () => {
          setPropsWithFormContextChanges({
            currencySymbol: '£'
          })

          setPropsWithFormContextChanges({
            currencySymbol: '£'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(true)).to.be
            .true
          expect(prototype.shouldComponentUpdate.secondCall.returned(false)).to
            .be.true
        })
      })

      context('with another duplicate changes', () => {
        it('re-renders once', () => {
          // @ts-ignore
          setPropsWithField({})

          setPropsWithFormContextChanges({
            currencySymbol: '£'
          })

          expect(prototype.shouldComponentUpdate.calledTwice).to.be.true
          expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to
            .be.true
          expect(prototype.shouldComponentUpdate.secondCall.returned(true)).to
            .be.true
        })
      })
    })

    context('with no errors changes', () => {
      it('should not render', () => {
        // @ts-ignore
        setPropsWithField({})

        expect(prototype.shouldComponentUpdate.calledOnce).to.be.true
        expect(prototype.shouldComponentUpdate.firstCall.returned(false)).to.be
          .true
      })
    })
  })
})
