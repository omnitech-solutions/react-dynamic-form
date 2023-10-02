import userSchemas from '../../../../data/user.schemas'

import DynamicFormControl from '../DynamicFormControl'
import sinon from 'sinon'

describe('Dynamic Form Control', () => {
  describe('populate', () => {
    it('Handles text/number fields', () => {
      const formControl = new DynamicFormControl({
        ...userSchemas,
        formData: {
          name: 'test name',
          age: '43'
        }
      })

      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInInput').withArgs({
        name: 'fullName',
        value: 'other-value'
      })

      formControl.populate('fullName', 'other-value')

      expect(stub).to.have.been.calledOnce
    })

    it('Does not populate inputs for ignored fields using .ignore', () => {
      const formControl = new DynamicFormControl({
        ...userSchemas,
        formData: {
          fullName: 'test name'
        }
      })

      // @ts-ignore
      sinon.stub(formControl, 'fillInInput')

      formControl.ignore('fullName')
      formControl.populate('fullName', 'other-value')

      // @ts-ignore
      expect(formControl.fillInInput).not.to.have.been.called
    })
  })

  describe.skip('populateInputs', () => {
    it('Handles text/number fields', () => {
      const formData = {
        fullName: 'test name'
      }
      const formControl = new DynamicFormControl({ ...userSchemas, formData })
      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInInput')

      formControl.populateFormData()

      expect(stub).to.have.been.calledOnce()
    })

    it('Does not populate inputs for ignored fields using .ignore', () => {
      const formData = {
        fullName: 'test name'
      }

      const formControl = new DynamicFormControl({ ...userSchemas, formData })
      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInInput')

      formControl.ignore('fullName')
      formControl.populateFormData()

      expect(stub).not.to.have.been.called()
    })

    it.skip('Handles radio-with-popover fields', () => {
      const formData = {
        nonUkRev: true
      }
      const formControl = new DynamicFormControl({ ...userSchemas, formData })
      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInRadio')

      formControl.populateFormData()

      expect(stub).to.have.been.calledOnce()
    })

    it.skip('Handles radio fields', () => {
      const formData = {
        lawSocietyOfScotlandMember: true
      }
      const formControl = new DynamicFormControl({ ...userSchemas, formData })
      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInRadio')

      formControl.populateFormData()

      expect(stub).to.have.been.calledOnce()
    })

    it.skip('Handles select fields', () => {
      const formData = {
        overallLimit: 100000.0
      }
      const formControl = new DynamicFormControl({ ...userSchemas, formData })
      // @ts-ignore
      const stub = sinon.stub(formControl, 'fillInSelect')

      // @ts-ignore
      formControl.ignoreKeys(['overallLimit'])
      formControl.populateFormData()

      expect(stub).not.to.have.been.called()
    })
  })
})
