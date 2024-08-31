import { DateTime, Duration, DurationObjectUnits } from 'luxon'

export const formatDurationFromObject = (dt: DurationObjectUnits): string => {
  const durationString = Duration.fromObject(dt).toFormat('d h m s S')
  const [days = 0, hours = 0, minutes = 0, seconds = 0] = durationString.split(' ').map((x) => parseInt(x, 10))
  let formattedDuration = ''
  if (days > 0) {
    formattedDuration = `${days}d ${hours}h ${minutes}m`
  } else if (hours > 0) {
    formattedDuration = `${hours}h ${minutes}m`
  } else if (minutes > 0) {
    formattedDuration = `${minutes}m ${seconds}s`
  } else if (seconds > 0) {
    formattedDuration = `${seconds}s`
  } else {
    formattedDuration = '1s'
  }
  return formattedDuration
}

export const getDuration = (startDateTime: DateTime, endDateTime: DateTime): DurationObjectUnits =>
  endDateTime.diff(startDateTime, ['days', 'hours', 'minutes', 'seconds', 'milliseconds']).toObject()

export const formatRemaining = (expirationUnixTime: number) =>
  formatDurationFromObject(getDuration(DateTime.fromJSDate(new Date()), DateTime.fromMillis(expirationUnixTime * 1000)))

export const formatUnixTime = (valueUnixTime: number) =>
  DateTime.fromMillis(valueUnixTime * 1000).toLocaleString(DateTime.DATETIME_FULL)
