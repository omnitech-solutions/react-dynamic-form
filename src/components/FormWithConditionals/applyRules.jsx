/* eslint-disable react/prop-types */
// Copied directly from https://github.com/RxNT/rjsf-conditionals/blob/master/src/applyRules.js and then changes applied to suit our needs.

import Engine from 'json-rules-engine-simplified'
import PropTypes from 'prop-types'

import React, { useState } from 'react'

import { DEFAULT_ACTIONS } from 'rjsf-conditionals/lib/actions'
import validateAction from 'rjsf-conditionals/lib/actions/validateAction'
import { isDevelopment } from 'rjsf-conditionals/lib/utils'
import { deepEquals } from 'react-jsonschema-form/lib/utils'
import { nonProdConsoleError } from '../helpers/debug-helper'

import extraActions from './extraActions'
import FormWithConditionalsExt from './FormWithConditionalsExt'

const applyRules = (schema, uiSchema, rules) => {
  if (isDevelopment()) {
    const propTypes = {
      Engine: PropTypes.func.isRequired,
      rules: PropTypes.arrayOf(
        PropTypes.shape({
          conditions: PropTypes.object.isRequired,
          order: PropTypes.number,
          event: PropTypes.oneOfType([
            PropTypes.shape({
              type: PropTypes.string.isRequired
            }),
            PropTypes.arrayOf(
              PropTypes.shape({
                type: PropTypes.string.isRequired
              })
            )
          ])
        })
      ).isRequired,
      extraActions: PropTypes.object
    }

    PropTypes.checkPropTypes(
      propTypes,
      { rules, Engine, extraActions },
      'props',
      'react-jsonschema-form-manager'
    )

    rules
      .reduce((agg, { event }) => agg.concat(event), [])
      .forEach(({ type, params }) => {
        // Find associated action
        const action = extraActions[type]
          ? extraActions[type]
          : DEFAULT_ACTIONS[type]
        if (action === undefined) {
          nonProdConsoleError(`Rule contains invalid action "${type}"`)
          return
        }

        validateAction(action, params, schema, uiSchema)
      })
  }

  return FormComponent => props => {
    const metadata = {}

    const [currentSchema, setSchema] = useState(schema)
    const [currentUiSchema, setUiSchema] = useState(uiSchema)
    const [currentFormData, setSetFormData] = useState(props.formData)
    const [rerenderCount, setSetRenderCount] = useState(0)

    const nextState = {
      schema: props.schema,
      uiSchema: props.uiSchema,
      formData: props.formData
    }

    const prevState = {
      schema: currentSchema,
      uiSchema: currentUiSchema,
      formData: currentFormData
    }

    if (!deepEquals(prevState, nextState)) {
      setSchema(nextState.schema)
      setUiSchema(nextState.uiSchema)
      setSetFormData(nextState.formData)
      setSetRenderCount(rerenderCount + 1)
    }

    return (
      <FormWithConditionalsExt
        {...props}
        Form={FormComponent}
        origSchema={schema}
        origUiSchema={uiSchema}
        metadata={metadata.formData}
      />
    )
  }
}

export default applyRules
