import { useState, useCallback } from 'react'
import CalendarModal from './CalendarModal'
import styles from './Calendar.module.scss'

function Calendar() {
  // props:{
  //   modalState: boolean
  //   setModalState: func
  //   todo: {
  //     categoryId: "test3"
  //     date: "2022/06/01"
  //     id: "5"
  //     isDone: false
  //     todo: "test3"
  //   }
  //   category: {
  //     categoryName: "카테고리"
  //     color: "#CCCCCC"
  //     id: "test3"
  //   }
  // }

  const [modalState, setModalState] = useState(false)
  const [todo, setTodoInfo] = useState({
    categoryId: 'test3',
    date: '2022/06/01',
    id: '5',
    isDone: false,
    todo: 'test3',
  })
  const [category, setCategory] = useState({
    categoryName: '카테고리',
    color: '#CCCCCC',
    id: 'test3',
  })

  const handleOpenModal = () => {
    setModalState(true)
  }

  return (
    <>
      {modalState && (
        <CalendarModal modalState={modalState} setModalState={setModalState} todo={todo} category={category} />
      )}
      <div className={styles.calendarWrapper}>캘린더 페이지.</div>
      <button type='button' onClick={handleOpenModal}>
        open
      </button>
    </>
  )
}

export default Calendar
