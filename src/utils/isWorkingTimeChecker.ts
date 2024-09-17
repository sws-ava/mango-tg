import moment from 'moment';
import momentTimezone from 'moment-timezone';

export const isWorkingTimeChecker = ():boolean => {
  const format = 'HH:mm:ss';

  const momentTimezoneTime = momentTimezone().tz("Europe/Kiev")

  const time = moment(momentTimezoneTime);
  const beforeTime = moment('10:00:00', format);
  const afterTime = moment('21:30:00', format);

  return time.isBetween(beforeTime, afterTime);
}