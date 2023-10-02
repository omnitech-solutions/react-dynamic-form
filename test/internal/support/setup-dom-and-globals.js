/* eslint-disable no-console */
import jsdom from 'jsdom'
import global from 'global'

import { prettyPrint } from 'html'

const { JSDOM } = jsdom

// Setup the jsdom environment
// @see https://github.com/facebook/react/issues/5046
if (!Object.keys(global).includes('window')) {
  const dom = new JSDOM(`<!doctype html><html><body></body></html>`, {
    url: 'https://example.org/',
    referrer: 'https://example.com/',
    contentType: 'text/html',
    includeNodeLocations: true,
    storageQuota: 10000000
  })

  global.document = dom.window.document
  global.window = dom.window
  global.navigator = global.window.navigator
}

// HTML debugging helper
global.d = function d(node) {
  console.log(prettyPrint(node.outerHTML, { indent_size: 2 }))
}

global.matchMedia = () => ({
  matches: false,
  addListener: () => {},
  removeListener: () => {}
})

global.context = describe
