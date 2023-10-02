import { isMoment } from 'moment'
import predicate from 'predicate'
import isGreaterThanDaysBefore from './isGreaterThanDaysBeforePredicate'

predicate.moment = date => isMoment(date)
predicate.isGreaterThanDaysBefore = isGreaterThanDaysBefore
