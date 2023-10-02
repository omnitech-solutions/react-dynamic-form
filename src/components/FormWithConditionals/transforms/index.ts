import dayjs from 'dayjs'

export default {
  tomorrow: () => dayjs().add(1, 'day'),
  iso: (date: string) => dayjs(date).toISOString()
}
