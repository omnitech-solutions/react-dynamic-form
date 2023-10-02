import moment from 'moment'
import predicate from 'predicate'

import { daysAfterNow } from '../../../helpers/moment-helper'

const assertIsGreaterThanDaysBefore = ({
  days,
  daysDelta = 0,
  expectedValue
}) => {
  expect(
    predicate.isGreaterThanDaysBefore(moment(), () => ({
      other: daysAfterNow(days + daysDelta),
      days
    })),
    days
  ).to.eq(expectedValue)
}

describe('isGreaterThanDaysBefore', () => {
  const days = 6

  context('with date > num days in the past', () => {
    it('returns true', () => {
      assertIsGreaterThanDaysBefore({
        days,
        daysDelta: +1,
        expectedValue: true
      })
    })
  })

  context('with date === num days in the past', () => {
    it('returns true', () => {
      assertIsGreaterThanDaysBefore({
        days,
        expectedValue: false
      })
    })
  })

  context('with date < num days in the past', () => {
    it('returns true', () => {
      assertIsGreaterThanDaysBefore({
        days,
        daysDelta: -1,
        expectedValue: false
      })
    })
  })
})
