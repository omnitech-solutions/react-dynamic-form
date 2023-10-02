import { userSchemas } from '../../../../data'
import FormDataHandler from '../FormDataHandler'
import SchemaHandler from '../SchemaHandler'

import SchemasHandler from '../SchemasHandler'

import { expect } from 'chai'
import sinon from 'sinon'

describe('SchemasHandler', () => {
  let subject: SchemasHandler

  const name = 'firstName'
  const label = 'First name'
  const otherValue = 'some-other-value'

  beforeEach(() => {
    subject = new SchemasHandler({
      ...userSchemas
    })
  })
  describe('init', () => {
    it('will init all handlers', () => {
      expect(subject.formDataHandler).to.be.instanceOf(FormDataHandler)
      expect(subject.schemaHandler).to.be.instanceOf(SchemaHandler)
    })

    it('will return frozen inputTypes map', () => {
      expect(subject.inputTypes).to.eql({
        age: 'number',
        firstName: 'string',
        lastName: 'string'
      })

      expect(subject.inputTypes).to.be.frozen()
    })
  })

  describe('getFieldNames', () => {
    it('calls underlying schema handler', () => {
      subject.getFieldNames()

      expect(subject.getFieldNames()).to.eql(['firstName', 'lastName', 'age'])
    })
  })

  describe('type', () => {
    it('returns underlying field base type', () => {
      subject.type(name)

      expect(subject.type(name)).to.eql('string')
    })

    it('handles labels', () => {
      expect(subject.type(label)).to.eql('string')
    })
  })

  describe('ignore', () => {
    it('calls underlying form data handler', () => {
      subject.ignore(name)

      expect(subject.formDataHandler.getIgnored()).to.eql(['firstName'])
    })

    it('handles labels', () => {
      subject = new SchemasHandler({
        ...userSchemas
      })

      subject.ignore('Last name')
      subject.ignore('unexpected')

      expect(subject.formDataHandler.getIgnored()).to.eql(['lastName'])
    })
  })

  describe('fill', () => {
    it('calls underlying form data handler', () => {
      const callback = sinon.spy()
      subject.fill(name, otherValue, callback)

      expect(callback).to.have.been.calledOnce()
      expect(callback).to.have.been.calledWith({
        name,
        value: otherValue,
        type: 'string'
      })
    })

    it('SKIPS callback when given unexpected name', () => {
      subject = new SchemasHandler({
        ...userSchemas
      })

      const callback = sinon.spy()

      subject.fill('unexpected name', otherValue, callback)

      expect(callback).to.not.have.been.called()
    })
  })

  describe('getFormData', () => {
    it('returns formData', () => {
      subject.getFormData()

      expect(subject.getFormData()).to.to.eql(userSchemas.formData)
    })
  })

  describe('getFilteredFieldNamesFor', () => {
    it('returns original form data by default', () => {
      subject = new SchemasHandler({
        ...userSchemas
      })

      expect(subject.getFilteredFieldNamesFor()).to.eql([
        'firstName',
        'lastName',
        'age'
      ])
    })

    it('omits ignored field names', () => {
      subject = new SchemasHandler({
        ...userSchemas
      })

      subject.ignore(name)

      expect(subject.getFilteredFieldNamesFor()).to.eql(['lastName', 'age'])
    })

    it('handles field names passed in', () => {
      const ignored = 'lastName'
      subject = new SchemasHandler({
        ...userSchemas
      })

      subject.ignore(ignored)

      expect(
        subject.getFilteredFieldNamesFor([
          'firstName',
          'lastName',
          'unexpectedName'
        ])
      ).to.eql(['firstName'])
    })
  })
})
