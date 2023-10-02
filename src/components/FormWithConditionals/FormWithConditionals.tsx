// @ts-ignore
import Engine from 'json-rules-engine-simplified'

import { intersection, omit } from 'lodash'
import React, { Component } from 'react'
// @ts-ignore
import rulesRunner from 'rjsf-conditionals/lib/rulesRunner'
import { shouldRender, deepEquals } from '../../utils'
import { FormData, FormFieldError, FormContextType } from '../../common/types'
import { nonProdConsoleError } from '../../utils/debug-helpers'
import extraActions from './extraActions'

const ALLOWED_PROPS = ['formData', 'formContext', 'errors']
interface FormWithConditionalsState {
  formData: FormData
  errors: Array<FormFieldError>
  formContext: FormContextType
}

interface ShouldRenderOptions {
  keysToPick: Array<string>
}

type Props = {
  children?: React.ReactNode
  formData?: FormData
  errors?: Array<FormFieldError>
  formContext?: FormContextType
  metadata?: any
  onChange: any
  rules: any[]
  origUiSchema: any
  origSchema: any
}

/**
 * Used solely to limit the number of renders performed
 */
class FormWithConditionals extends Component<Props> {
  private formData: FormData
  private runRules: any

  private shouldUpdate: boolean

  constructor(props: Props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.updateConf = this.updateConf.bind(this)

    const { formData = {}, origSchema, origUiSchema } = this.props
    this.formData = formData

    this.shouldUpdate = false
    this.state = { schema: origSchema, uiSchema: origUiSchema }

    this.runRules = rulesRunner(
      origSchema,
      origUiSchema,
      props.rules || [],
      Engine,
      extraActions
    )

    this.updateConf(formData)
  }

  UNSAFE_componentWillReceiveProps(
    nextProps: Readonly<Props>,
    _nextContext: any
  ) {
    const formDataChanged =
      nextProps.formData && !deepEquals(nextProps.formData, this.formData)

    if (formDataChanged) {
      this.updateConf(nextProps.formData)
      this.shouldUpdate = true
    } else {
      this.shouldUpdate =
        this.shouldUpdate ||
        !deepEquals(nextProps, { ...this.props, formData: nextProps.formData })
    }
  }

  // NOTE: DO NOT CHANGE UNLESS YOU WANT A VERY BAD DAY
  // This is used to ensure that we only re-render on change of form data
  // Changing this can introduce performance issues and bugs that are very difficult to fix
  shouldComponentUpdate(nextProps: Props) {
    const shouldRenderOpts: ShouldRenderOptions = {
      keysToPick: ALLOWED_PROPS
    }
    // @ts-ignore
    return shouldRender(nextProps, this.state, shouldRenderOpts)
  }

  // NOTE: DO NOT CHANGE UNLESS YOU WANT A VERY BAD DAY
  // This is used to ensure that we only re-render on change of form data
  // Changing this can introduce performance issues and bugs that are very difficult to fix
  static getDerivedStateFromProps(
    props: Props,
    state: FormWithConditionalsState
  ) {
    const allowedPropsNotFound =
      intersection(ALLOWED_PROPS, Object.keys(props)).length === 0
    if (allowedPropsNotFound) return null

    const shouldUpdateState = shouldRender(state, props, {
      keysToPick: ALLOWED_PROPS
    })
    if (!shouldUpdateState) return null

    const { formData, errors, formContext } = props

    return {
      formData,
      errors,
      formContext
    }
  }

  handleChange(change: any) {
    const { formData } = change
    const updTask = this.updateConf(formData)

    const { onChange } = this.props
    if (onChange) {
      updTask
        .then((conf: any) => {
          const confFormData = {
            ...omit(conf.formData, 'metadata')
          }
          const updChange = { ...change, ...conf, formData: confFormData }

          onChange(updChange)
          return conf
        })
        .catch((ex: any) => {
          nonProdConsoleError(ex)
        })
    }
  }

  updateConf(formData: FormData) {
    this.formData = formData
    return this.runRules({ ...formData, metadata: this.props.metadata }).then(
      (conf: { formData: any; schema: any; uiSchema: any }) => {
        const confFormDataCpy = omit(conf.formData, 'metadata')
        const dataChanged = !deepEquals(this.formData, confFormDataCpy)
        this.formData = confFormDataCpy

        const newState = { schema: conf.schema, uiSchema: conf.uiSchema }
        const confChanged = !deepEquals(newState, this.state)
        if (dataChanged || confChanged) {
          this.shouldUpdate = true
          this.setState(newState)
        }

        return conf
      }
    )
  }

  render() {
    const { children }: Props = this.props
    return <span>{children}</span>
  }
}

export default FormWithConditionals
