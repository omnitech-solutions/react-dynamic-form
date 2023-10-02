import { noop } from 'lodash'
import './support/setupTestfiles'

Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
window.HTMLElement.prototype.scrollIntoView = () => {}
