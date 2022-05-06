import { useEffect, useState, useCallback } from 'react'
import styles from './UpdateTodo.module.scss'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'

dayjs.extend(localeData)

export default function BtnCalendar() {
  // 선택된 날
  const [selectedDay, setSelectedDay] = useState(dayjs())

  // 단축 월 리스트
  const MONTHS = dayjs.monthsShort()
  // 단축 요일 리스트
  const WEEKDAY = dayjs.weekdaysMin()

  // 보여줄 월의 날짜들과 빈칸들
  const blanks = Array(selectedDay.startOf('month').day()).fill('')
  const dates = Array.from({ length: selectedDay.daysInMonth() }, (v, i) => i + 1)
  const shownDates = [...blanks, ...dates]

  // 연 단위 선택할 때 시작할 연도
  const fromYear = Number(`${selectedDay.year()}`.slice(0, -1) + 0)
  // 달력 종류
  const CALENDAR_TYPE = [
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

  // 보여줄 데이터들
  const [shownData, setShowData] = useState({ position: 2, data: CALENDAR_TYPE[2] })
  const { position } = shownData
  const { isDisabled, column, needThead, arrowStandard, navi, tbodyData } = shownData.data

  useEffect(() => {
    setShowData({
      ...shownData,
      data: {
        ...shownData.data,
        navi: CALENDAR_TYPE[position].navi,
        tbodyData: CALENDAR_TYPE[position].tbodyData,
      },
    })
  }, [selectedDay])

  // tbody에 들어갈 data 배열 정리
  let rowIdx = -1
  const manufacturedTbodyData = tbodyData.reduce((acc, cur, i) => {
    if (!(i % column)) {
      acc.push([cur])
      rowIdx += 1
    } else {
      acc[rowIdx].push(cur)
    }
    return acc
  }, [])

  const handleNaviBtnClick = (idx) => {
    setShowData({ position: idx, data: CALENDAR_TYPE[idx] })
  }

  const handleArrowClick = (direction) => {
    const { step, unit } = arrowStandard
    setSelectedDay(direction === 'up' ? selectedDay.add(step, unit) : selectedDay.subtract(step, unit))
  }

  console.log('selectedDay', selectedDay, 'shownData', shownData)

  return (
    <section>
      <div>
        {navi.map((el, idx) => (
          <button key={el} type='button' onClick={() => handleNaviBtnClick(idx)} disabled={isDisabled}>
            {el}
          </button>
        ))}
        <IoIosArrowUp onClick={() => handleArrowClick('up')} />
        <IoIosArrowDown onClick={() => handleArrowClick('down')} />
      </div>
      <table className={styles.btnCalendar}>
        {needThead && (
          <thead>
            <tr>
              {WEEKDAY.map((day) => (
                <th key={day} className={styles.weekDay}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {manufacturedTbodyData.map((eachRow, idx) => (
            <tr key={`week-${idx + 1}`}>
              {eachRow.map((el, index) => (
                <td key={`date-${index + 1}`} className={`date ${selectedDay.date() === el && 'selected'}`}>
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
