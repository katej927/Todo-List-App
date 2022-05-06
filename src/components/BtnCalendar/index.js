import { useState } from 'react'
import styles from './UpdateTodo.module.scss'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'

export default function BtnCalendar() {
  const [selected, setSelected] = useState({ year: dayjs().year(), month: dayjs().month(), date: dayjs().date() })
  const [navi, setNavi] = useState([dayjs().format('MMMM'), dayjs().year()])

  const { year, month, date } = selected
  let selectedDay = dayjs(`${year}-${month}-${date}`)

  dayjs.extend(localeData)

  const MONTHS = dayjs.monthsShort()
  const WEEKDAY = dayjs.weekdaysMin()

  const firstDayOfMonth = dayjs().startOf('month').day()
  const daysInMonth = dayjs().daysInMonth()
  const blanksInMonth = Array(firstDayOfMonth).fill('')
  const spreadDaysInMonth = Array.from({ length: daysInMonth }, (v, i) => i + 1)
  const shownDaysInMonth = [...blanksInMonth, ...spreadDaysInMonth]

  let rowIdx = -1
  const manufacturedTbodyData = shownDaysInMonth.reduce((acc, cur, i) => {
    if (!(i % 7)) {
      acc.push([cur])
      rowIdx += 1
    } else {
      acc[rowIdx].push(cur)
    }
    return acc
  }, [])

  console.log(
    dayjs(),
    'month',
    MONTHS,
    'selectedDay',
    selectedDay,
    'firstDayOfMonth',
    dayjs('2021-1-02').startOf('month').day(),
    'daysInMonth',
    dayjs('2021-2-02').daysInMonth()
  )

  return (
    <section>
      <div>
        {navi.map((el) => (
          <button key={el} type='button'>
            {el}
          </button>
        ))}
      </div>
      <table className={styles.btnCalendar}>
        <thead>
          <tr>
            {WEEKDAY.map((day) => (
              <th key={day} className={styles.weekDay}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {manufacturedTbodyData.map((eachRow, idx) => (
            <tr key={`week-${idx + 1}`}>
              {eachRow.map((el, index) => (
                <td key={`date-${index + 1}`} className={`date ${date === el && 'selected'}`}>
                  {el}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
