import { useState, useEffect } from 'react'
import CalendarModal from './CalendarModal'
import styles from './Calendar.module.scss'

function Calendar() {
  useEffect(() => {
    localStorage.setItem(
      'todo',
      JSON.stringify([
        {
          id: '1234sol',
          userNickName: 'sol',
          isLogined: false,
          data: {
            category: [
              { id: '1School', categoryName: 'School', color: '#A8A8A8' },
              { id: '2Business', categoryName: 'Business', color: '#7373eb' },
              { id: '3zip', categoryName: 'zip', color: '#FF5252' },
            ],
            todoList: [
              {
                id: '1아이스크림먹기',
                todo: '아이스크림먹기',
                categoryId: '1School',
                date: '2022/05/04',
                isDone: false,
              },
              { id: '3과제하기', todo: '과제하기', categoryId: '1School', date: '2022/05/03', isDone: false },
              { id: '12기상하기', todo: '기상하기', categoryId: '1카테고리', date: '2022/05/06', isDone: false },
              { id: '1234강의듣기', todo: '강의듣기', categoryId: '2카테고리', date: '2022/05/05', isDone: false },
              {
                id: '123러닝 다녀오기',
                todo: '러닝 다녀오기',
                categoryId: '3카테고리',
                date: '2022/05/05',
                isDone: false,
              },
            ],
          },
        },
      ])
    )
  }, [])

  const [modalState, setModalState] = useState(false)
  const [nickName, setNickName] = useState('sol')
  const [todo, setTodoInfo] = useState({
    id: '1아이스크림먹기',
    todo: '아이스크림먹기',
    categoryId: '1School',
    date: '2022/05/04',
    isDone: false,
  })
  const [category, setCategory] = useState({
    id: '1School',
    categoryName: 'School',
    color: '#A8A8A8',
  })

  const handleOpenModal = () => {
    setModalState(true)
  }

  return (
    <>
      {modalState && (
        <CalendarModal nickName={nickName} setModalState={setModalState} todo={todo} category={category} />
      )}
      <div className={styles.calendarWrapper}>캘린더 페이지.</div>
      <button type='button' onClick={handleOpenModal}>
        open
      </button>
    </>
  )
}

export default Calendar

// 말씀드릴 것
// 모달이 꺼졌을 때 화면을 다시 그려야함
// props 넘겨주는 것 modalState -> nickName
