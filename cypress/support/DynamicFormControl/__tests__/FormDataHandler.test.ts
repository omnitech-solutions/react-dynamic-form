import { expect } from 'chai'
import sinon from 'sinon'
import FormDataHandler from '../FormDataHandler'

describe('FormDataHandler', () => {
  const formData = { firstName: 'Desmond', lastName: "O'Leary" }
  const name = 'firstName'
  const otherValue = 'Des'

  let subject: FormDataHandler

  beforeEach(() => {
    subject = new FormDataHandler(formData)
  })

  describe('init', () => {
    it('holds original form data', () => {
      expect(subject.originalFormData).to.eql(formData)
      expect(subject.originalFormData).to.be.frozen()
    })

    it('hold other locals', () => {
      expect(subject.filledInFields).to.eql({})
      expect(subject.getLastFilledInFieldName()).to.eql(null)
      expect(subject.ignored).to.be.empty()
    })
  })

  describe('ignore', () => {
    it('add to ignore field', () => {
      subject.ignore('firstName')

      expect(subject.ignored).to.include('firstName')
    })
  })

  describe('isIgnored', () => {
    it('returns true if field is marked as ignored', () => {
      subject.ignore(name)

      expect(subject.isIgnored(name)).to.eql(true)
    })

    it('returns false if field is NOT marked as ignored', () => {
      expect(subject.isIgnored('firstName')).to.eql(false)
    })
  })

  describe('fill', () => {
    it('populates filledInFields', () => {
      subject.fill(name, otherValue)

      expect(subject.filledInFields).to.eql({ [name]: otherValue })
    })

    it('populates lastFilledInField', () => {
      subject.fill(name, otherValue)

      expect(subject.getLastFilledInFieldName()).to.eql(name)
    })

    it('calls callback with given name and value', () => {
      const spy = sinon.spy()

      subject.fill(name, otherValue, spy)

      expect(spy).to.be.calledOnce()
      expect(spy).to.be.calledWith({ name, value: otherValue })
    })

    it('SKIPS callback when name is ignored', () => {
      const spy = sinon.spy()

      subject.ignore(name)
      subject.fill(name, otherValue, spy)

      expect(spy).to.not.be.called()
    })
  })

  describe('getFormData', () => {
    it('returns original form data by default', () => {
      expect(subject.getFormData()).to.eql(formData)
    })

    it('filled in fields overwrite original form data', () => {
      subject.fill(name, otherValue)

      expect(subject.getFormData()).to.eql({ ...formData, [name]: otherValue })
    })
  })
})
