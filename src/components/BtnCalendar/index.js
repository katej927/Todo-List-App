import styles from './UpdateTodo.module.scss'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'

export default function BtnCalendar() {
  dayjs.extend(localeData)
  const dateOfToday = dayjs().date()
  const weekdaysMin = dayjs().locale('en-us').localeData().weekdaysMin()
  const firstDayOfMonth = dayjs().startOf('month').day()
  const daysInMonth = dayjs().daysInMonth()
  const blanksInMonth = Array(firstDayOfMonth).fill('')
  const spreadDaysInMonth = Array.from({ length: daysInMonth }, (v, i) => i + 1)
  const shownDaysInMonth = [...blanksInMonth, ...spreadDaysInMonth]

  let weekIndex = -1
  const month = shownDaysInMonth.reduce((acc, cur, i) => {
    if (!(i % 7)) {
      acc.push([cur])
      weekIndex += 1
    } else {
      acc[weekIndex].push(cur)
    }
    return acc
  }, [])

  console.log(dayjs().date())

  return (
    <table className={styles.btnCalendar}>
      <thead>
        <tr>
          {weekdaysMin.map((day) => (
            <th key={day} className={styles.weekDay}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {month.map((week, idx) => (
          <tr key={`week-${idx + 1}`}>
            {week.map((date, index) => (
              <td key={`date-${index + 1}`} className={`date ${dateOfToday === date && 'today'}`}>
                {date}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
