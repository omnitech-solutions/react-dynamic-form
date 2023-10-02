import { isPresent } from '@oc-tech/lodash-ext'

export interface FileInInputProps {
  name: string
  value: string
}

function cyFillInInput({ name, value }: FileInInputProps) {
  // @ts-ignore
  const $chain = cy.get(`input#root_${name}`).clear()
  if (isPresent(value)) {
    $chain.type(value, { force: true })
  }

  return $chain
}

export default cyFillInInput
