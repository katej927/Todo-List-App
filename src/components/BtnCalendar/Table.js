import styles from './UpdateTodo.module.scss'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'

export default function Table({ tbodyData, theadData }) {
  dayjs.extend(localeData)
  const dateOfToday = dayjs().date()

  let weekIndex = -1
  const manufacturedTbody = tbodyData?.reduce((acc, cur, i) => {
    if (!(i % 7)) {
      acc.push([cur])
      weekIndex += 1
    } else {
      acc[weekIndex].push(cur)
    }
    return acc
  }, [])

  return (
    <table className={styles.btnCalendar}>
      {theadData && (
        <thead>
          <tr>
            {theadData.map((day) => (
              <th key={day} className={styles.weekDay}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {manufacturedTbody.map((week, idx) => (
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
