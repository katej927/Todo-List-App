import { useEffect, useState } from 'react'
import styles from './UpdateTodo.module.scss'
import cn from 'classnames/bind'
import * as F from './functions'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import * as dayjs from 'dayjs'
import * as localeData from 'dayjs/plugin/localeData'
import 'dayjs/locale/bs'
import PropTypes from 'prop-types'

dayjs.extend(localeData)
const cx = cn.bind(styles)

function BtnCalendar({ getDate, forUpdateDate }) {
  // 선택된 날
  const [selectedDay, setSelectedDay] = useState(dayjs())
  const [selectedBtn, setSelectedBtn] = useState({ isOpen: false, showDate: false })
  const { isOpen, showDate } = selectedBtn

  // [수정할 때] 투두의 date update
  useEffect(() => {
    if (forUpdateDate) {
      setSelectedDay(dayjs(forUpdateDate))
      setSelectedBtn((prev) => ({ ...prev, showDate: true }))
    }
  }, [forUpdateDate])

  // 선택된 날짜 state를 Parent로 보내기
  useEffect(() => {
    if (selectedDay && showDate) {
      getDate(selectedDay.format('YYYY/MM/DD'))
    }
  }, [getDate, selectedDay, showDate])

  const calendarType = F.calendarType(selectedDay)

  // 보여줄 데이터들
  const [shownData, setShowData] = useState({ position: 2, data: calendarType[2] })
  const { position } = shownData
  const { id, isDisabled, column, needThead, arrowStandard, navi, tbodyData } = shownData.data

  useEffect(() => {
    setSelectedBtn((prev) => ({
      ...prev,
      showDate: prev.showDate,
    }))
    setShowData({
      ...shownData,
      data: {
        ...shownData.data,
        navi: calendarType[position].navi,
        tbodyData: calendarType[position].tbodyData,
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

  const handleSelectedBtnClick = () => {
    setSelectedBtn({
      isOpen: !isOpen,
      showDate: true,
    })
  }

  const handleNaviBtnClick = (idx) => {
    setShowData({ position: idx, data: calendarType[idx] })
  }

  const handleArrowClick = (direction) => {
    const { step, unit } = arrowStandard
    setSelectedDay(direction === 'up' ? selectedDay.add(step, unit) : selectedDay.subtract(step, unit))
    setSelectedBtn((prev) => ({ ...prev, isOpen: true }))
  }

  const handleTdBtnClick = (el) => {
    if (id === 'main') {
      setSelectedDay(selectedDay.date(el))
      setSelectedBtn((prev) => ({ ...prev, isOpen: false }))
    }
    if (id === 'months') {
      setSelectedDay(selectedDay.month(F.MONTHS.indexOf(el)))
      setShowData({ position: 2, data: calendarType[2] })
    }
    if (id === 'years') {
      setSelectedDay(selectedDay.year(el))
      setShowData({ position: 2, data: calendarType[2] })
    }
  }

  return (
    <section className={cx('btnCalendarWrap')}>
      <button className={cx('datePickBtn')} type='button' onClick={handleSelectedBtnClick}>
        {showDate ? selectedDay.format('YYYY/MM/DD') : '날짜 선택'}
      </button>
      <section className={cx('calendarWrap', { hide: !isOpen })}>
        <div className={cx('naviWrap')}>
          <div className={cx('btnWrap')}>
            {navi.map((el, idx) => (
              <button
                className={cx('navi', [`${calendarType[idx].id}`], { loadedMain: shownData.data.id === 'main' })}
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
            <IoIosArrowUp className={cx('icon')} onClick={() => handleArrowClick('up')} size={20} />
            <IoIosArrowDown className={cx('icon')} onClick={() => handleArrowClick('down')} size={20} />
          </div>
        </div>
        <table className={cx('calendarTable')}>
          <thead className={cx('calendarThead', { show: needThead })}>
            <tr className={cx('calendarTr1')}>
              {F.WEEKDAY.map((day) => (
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
                          selected: (selectedDay.date() || F.MONTHS[selectedDay.month()] || selectedDay.year()) === el,
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
  forUpdateDate: PropTypes.string,
}

export default BtnCalendar
