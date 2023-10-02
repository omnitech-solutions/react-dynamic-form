/**
 * @param {string} fieldName
 * @return {Cypress.Chainable<Subject>}
 */
export function findHintFor(fieldName: string) {
  return cy.get(`[data-cy-hint="${fieldName}"]`)
}

/**
 @param {string} fieldName
 * @return {Cypress.Chainable<Subject>}
 */
export function findFieldFor(fieldName: string) {
  return cy.get(`[data-cy-field="${fieldName}"]`)
}

/**
 * @param {string} fieldName
 * @return {Cypress.Chainable<Subject>}
 */
export function findLabelFor(fieldName: string) {
  return cy.get(`[data-cy-label="${fieldName}"]`)
}

/**
 * @param {string} fieldName
 * @return {Cypress.Chainable<Subject>}
 */
export function findInputFor(fieldName: string) {
  return cy.get(`input#root_${fieldName}`)
}

/**
 * @param {string} fieldName
 * @return {Cypress.Chainable<Subject>}
 */
export function findSelectFor(fieldName: string) {
  return cy.get(`#root_${fieldName} .ant-select-selection-selected-value`)
}
