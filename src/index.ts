import { capitalize } from '@oc-tech/lodash-ext'

export const greet = (name: string): string => capitalize(`hello ${name}`)
