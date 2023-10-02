import { userSchemas } from '../../../../data'
import SchemaHandler from '../SchemaHandler'

import { expect } from 'chai'

const { schema } = userSchemas

describe('SchemaHandler', () => {
  let subject: SchemaHandler
  const name = 'firstName'

  beforeEach(() => {
    subject = new SchemaHandler(schema)
  })

  describe('init', () => {
    it('holds frozen schema ', () => {
      expect(subject.schema).to.eql(schema)
      expect(subject.schema).to.be.frozen()
    })

    it('will set frozen fieldNames', () => {
      expect(subject.getFieldNames()).to.eql(['firstName', 'lastName', 'age'])
      expect(subject.schema).to.be.frozen()
    })
  })

  describe('getFieldName', () => {
    it('returns field name associated with title', () => {
      expect(subject.getFieldName('First name')).to.eql(name)
    })

    it('handles field name', () => {
      expect(subject.getFieldName('firstName')).to.eql('firstName')
    })
  })

  describe('getFieldNamesFor', () => {
    it('returns field names with matching field name or label', () => {
      expect(
        subject.getFieldNamesFor([
          'First name',
          'First name',
          'unexpected name',
          'lastName'
        ])
      ).to.eql(['firstName', 'lastName'])
    })
  })
})
