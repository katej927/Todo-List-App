import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './CalendarModal.module.scss'
import { ModalCalendarIcon, ModalCheckIcon, ModalTrashIcon } from '../../assets/svgs'
import { useEffect, useMemo } from 'react'

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

// 동적으로 css 값을 다루는 방법이 있을까요??(색상 변경하는 방법 여쭤보기)
// 1. inline - stying은 성능에 좋지 않다.
// 2. 아래의 방법을 써도 괜찮은가??
// https://www.section.io/engineering-education/dynamically-update-react-and-javascript-with-css-variables/

const CalendarModal = function CalendarModal({ modalState, setModalState, todo, category }) {
  const handleCloseModal = () => {
    setModalState(false)
  }

  // changeDateFormat '/' to '-'
  const changeDateFormat = (date) => {
    const dateArr = date.split('/').join('-')

    return dateArr
  }
  const changedDate = useMemo(() => changeDateFormat(todo.date), [todo])

  return (
    <>
      <div className={styles.modalBackground} />
      <section className={styles.modalMain}>
        {/* Children Part */}
        {/* 버튼은 그려야할 지 말아야할 지 여쭤보기 */}
        {/* <button
          type='button'
          className={styles.closeModalButton}
          aria-label='close Button'
          onClick={handleCloseModal}
        /> */}
        <p className={styles.modalCategory} style={{ backgroundColor: category.color }}>
          {category.categoryName}
        </p>
        <label htmlFor='todoName'>내용</label>
        <p id='todoName' className={styles.modalContent}>
          {todo.todo}
        </p>
        <label htmlFor='todoDate'>일정</label>
        <p id='todoDate' className={styles.modalContent}>
          {changedDate}
        </p>
        <div className={styles.buttonList}>
          <button type='button' onClick={handleCloseModal}>
            <ModalCheckIcon />
          </button>
          <button type='button' onClick={handleCloseModal}>
            <ModalCalendarIcon />
          </button>
          <button type='button' onClick={handleCloseModal}>
            <ModalTrashIcon />
          </button>
        </div>
      </section>
    </>
  )
}

CalendarModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  setModalState: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    todo: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired,
}

export default CalendarModal
