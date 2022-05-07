import { useEffect, useState } from 'react'
import styles from './UpdateTodo.module.scss'
import cn from 'classnames/bind'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'
import PropTypes from 'prop-types'

dayjs.extend(localeData)
const cx = cn.bind(styles)

// export default function BtnCalendar({}) {
function BtnCalendar({ getDate }) {
  // 선택된 날
  const [selectedDay, setSelectedDay] = useState(dayjs())
  const [selectedBtn, setSelectedBtn] = useState({ date: '', isOpen: false, showDate: false })

  // 수정할 투두의 date update
  // useEffect(() => {
  //   if (dateProps) {
  //     setSelectedDay(dateProps) // 재가공 해야 할 수 있음
  //     setSelectedBtn(dateProps)
  //   }
  // }, [dateProps])

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
  const { id, isDisabled, column, needThead, arrowStandard, navi, tbodyData } = shownData.data

  useEffect(() => {
    setSelectedBtn((prev) => ({
      ...prev,
      date: selectedDay.format('YYYY/MM/DD'),
      // isOpen: !prev.isOpen,
      showDate: prev.showDate,
    }))
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
    // setSelectedBtn((prev) => ({ ...prev, isOpen: false }))
    setSelectedBtn((prev) => ({ ...prev, isOpen: true }))
  }

  const handleTdBtnClick = (el) => {
    if (id === 'main') {
      setSelectedDay(selectedDay.date(el))
      setSelectedBtn((prev) => ({ ...prev, isOpen: !prev.isOpen }))
    }
    if (id === 'months') {
      setSelectedDay(selectedDay.month(MONTHS.indexOf(el)))
      setShowData({ position: 2, data: CALENDAR_TYPE[2] })
    }
    if (id === 'years') {
      setSelectedDay(selectedDay.year(el))
      setShowData({ position: 2, data: CALENDAR_TYPE[2] })
    }
  }

  const handleSelectedBtnClick = () => {
    setSelectedBtn({ date: selectedDay.format('YYYY/MM/DD'), isOpen: !selectedBtn.isOpen, showDate: true })
  }

  console.log(
    'selectedDay',
    selectedDay,
    selectedDay.format('YYYY/MM/DD'),
    'shownData',
    shownData,
    'selectedBtn',
    selectedBtn,
    'test',
    MONTHS[selectedDay.month()]
  )

  return (
    <section className={cx('btnCalendarWrap')}>
      <button className={cx('datePickBtn')} type='button' onClick={handleSelectedBtnClick}>
        {selectedBtn.showDate ? selectedBtn.date : '날짜 선택'}
      </button>
      <section className={cx('calendarWrap', { hide: !selectedBtn.isOpen })}>
        <div className={cx('naviWrap')}>
          <div className={cx('btnWrap')}>
            {navi.map((el, idx) => (
              <button
                className={cx('navi', [`${CALENDAR_TYPE[idx].id}`], { loadedMain: shownData.data.id === 'main' })}
                key={el}
                type='button'
                onClick={() => handleNaviBtnClick(idx)}
                disabled={isDisabled}
              >
                {el}
              </button>
            ))}
          </div>
          <div className={cx('iconsWrap')}>
            <IoIosArrowUp className={cx('icon')} onClick={() => handleArrowClick('up')} />
            <IoIosArrowDown className={cx('icon')} onClick={() => handleArrowClick('down')} />
          </div>
        </div>
        <table className={cx('calendarTable')}>
          <thead className={cx('calendarThead', { show: needThead })}>
            <tr className={cx('calendarTr1')}>
              {WEEKDAY.map((day) => (
                <th key={day} className={cx('calendarTh')}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={cx('calendarTbody')}>
            {manufacturedTbodyData.map((eachRow, idx) => (
              <tr key={`tr-${idx + 1}`} className={cx('calendarTr2')}>
                {eachRow.map((el, index) => (
                  <td key={`td-${index + 1}`} className={cx('eachTd')}>
                    {el !== '' && (
                      <button
                        type='button'
                        className={cx('eachTdbtn', {
                          selected: (selectedDay.date() || MONTHS[selectedDay.month()] || selectedDay.year()) === el,
                          main: id === 'main',
                        })}
                        onClick={() => handleTdBtnClick(el)}
                      >
                        {el}
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}

BtnCalendar.propTypes = {
  getDate: PropTypes.func,
}

export default BtnCalendar
