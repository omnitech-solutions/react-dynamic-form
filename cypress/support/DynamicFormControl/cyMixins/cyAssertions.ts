import { findHintFor, findInputFor } from './cyQueries'

export function assertInputValue(fieldName: string, expectedValue: string) {
  return findInputFor(fieldName).should('have.value', expectedValue)
}

export function assertHintMessage(fieldName: string, expectedMessage: string) {
  return findHintFor(fieldName).should('have.text', expectedMessage)
}
