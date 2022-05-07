import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'

dayjs.extend(localeData)

// 단축 월 리스트
export const MONTHS = dayjs.monthsShort()
// 단축 요일 리스트
export const WEEKDAY = dayjs.weekdaysMin()

export const calendarType = (selectedDay) => {
  const blanks = Array(selectedDay.startOf('month').day()).fill('')
  const dates = Array.from({ length: selectedDay.daysInMonth() }, (v, i) => i + 1)
  const shownDates = [...blanks, ...dates]

  const fromYear = Number(`${selectedDay.year()}`.slice(0, -1) + 0)

  return [
    {
      id: 'months',
      isDisabled: true,
      column: 4,
      needThead: false,
      arrowStandard: { unit: 'year', step: 1 },
      navi: [selectedDay.year()],
      tbodyData: MONTHS,
    },
    {
      id: 'years',
      isDisabled: true,
      column: 4,
      needThead: false,
      arrowStandard: { unit: 'year', step: 10 },
      navi: [`${fromYear}-${fromYear + 9}`],
      tbodyData: [...Array(10)].map((e, i) => fromYear + i),
    },
    {
      id: 'main',
      isDisabled: false,
      column: 7,
      needThead: true,
      arrowStandard: { unit: 'month', step: 1 },
      navi: [selectedDay.format('MMMM'), selectedDay.year()],
      tbodyData: shownDates,
    },
  ]
}
