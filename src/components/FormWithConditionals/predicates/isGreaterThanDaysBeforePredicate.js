import predicate from 'predicate'

import { toMoment } from '../../helpers/lang-helper'
import { isGreaterThanDaysBefore as isGreaterThanDaysBeforeHelper } from '../../helpers/moment-helper'

const isGreaterThanDaysBefore = predicate.curry((val, getOpts = {}) => {
  const { other, days } = getOpts()

  const date = toMoment(val)
  const otherDate = toMoment(other)
  return (
    predicate.moment(date) &&
    predicate.moment(otherDate) &&
    isGreaterThanDaysBeforeHelper({ date, referenceDate: otherDate, days })
  )
})

export default isGreaterThanDaysBefore
