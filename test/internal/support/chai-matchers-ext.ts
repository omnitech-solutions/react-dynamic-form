import chai from 'chai'
import assertArrays from 'chai-arrays'
import chaiAsPromised from 'chai-as-promised'
import chaiDateTime from 'chai-datetime'
// @ts-ignore
import chaiJestDiff from 'chai-jest-diff'
// @ts-ignore
import chaiSorted from 'chai-sorted'
// @ts-ignore
import chaiUrl from 'chai-url'
import chaiDeepEqualInAnyOrder from 'deep-equal-in-any-order'
import chaiDirty from 'dirty-chai'
// @ts-ignore
import sinonChai from '@cypress/sinon-chai'

// Adds https://github.com/domenic/sinon-chai#assertions expect(textWidgetSpy).to.have.been.calledOnce;
chai.use(sinonChai)

// https://github.com/domenic/chai-as-promised#shouldexpect-interface promPromise.resolve(2 + 2).should.eventually.equal(4);
chai.use(chaiAsPromised)

// https://github.com/deliciousinsights/chai-jest-diff Adds much more detailed diff and implements jest-diff and jest-matcher-utils
chai.use(chaiJestDiff())

// https://www.chaijs.com/plugins/deep-equal-in-any-order/  expect({ foo: [1, 2], bar: { baz: ['a', 'b', { lorem: [5, 6] }] } }).to.deep.equalInAnyOrder({ foo: [2, 1], bar: { baz: ['b', 'a', { lorem: [6, 5] }] } });
chai.use(chaiDeepEqualInAnyOrder)

// http://www.chaijs.com/plugins/chai-sorted/ expect(["b","apples"]).to.be.sorted({descending: true})
chai.use(chaiSorted)

// https://www.chaijs.com/plugins/chai-url/ expect('http://example.com/foo/bar').to.contain.path('/foo');
chai.use(chaiUrl)

// https://www.chaijs.com/plugins/chai-datetime/ e.g. expect(d1).to.equalDate(d2)
chai.use(chaiDateTime)

// https://www.chaijs.com/plugins/chai-arrays/
chai.use(assertArrays)

// https://www.chaijs.com/plugins/dirty-chai/ expect(true).to.be.true('The fabric of logic has torn').and.not.false();
chai.use(chaiDirty)

export default chai
