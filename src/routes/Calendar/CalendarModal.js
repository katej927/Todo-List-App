import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { deleteTodo } from '../../utils/data/localStorage'
import PropTypes from 'prop-types'
import styles from './CalendarModal.module.scss'
import { ModalCalendarIcon, ModalCheckIcon, ModalTrashIcon } from '../../assets/svgs'

// modalState 대신에 userNickName 받아올 것
const CalendarModal = function CalendarModal({ nickName, setModalState, todo, category }) {
  const handleCloseModal = () => {
    setModalState(false)
  }

  const handleDeleteTodo = () => {
    deleteTodo(nickName, todo)
    setModalState(false)
  }

  // changeDateFormat '/' to '-'
  const changeDateFormat = (date) => {
    const changedFormatDate = date.split('/').join('-')
    return changedFormatDate
  }
  const changedDate = useMemo(() => changeDateFormat(todo.date), [todo])

  return (
    <>
      <div className={styles.modalBackground} />
      <section className={styles.modalMain}>
        {/* Children Part */}
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
          <button type='button'>
            <Link to='/updateTodo'>
              <ModalCalendarIcon />
            </Link>
          </button>
          <button type='button' onClick={handleDeleteTodo}>
            <ModalTrashIcon />
          </button>
        </div>
      </section>
    </>
  )
}

CalendarModal.propTypes = {
  nickName: PropTypes.string.isRequired,
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

// {
//   /* 버튼은 그려야할 지 말아야할 지 여쭤보기 */
// }
// {
//   /* <button
//           type='button'
//           className={styles.closeModalButton}
//           aria-label='close Button'
//           onClick={handleCloseModal}
//         /> */
// }

// 동적으로 css 값을 다루는 방법이 있을까요??(색상 변경하는 방법 여쭤보기)
// 1. inline - stying은 성능에 좋지 않다.
// 2. 아래의 방법을 써도 괜찮은가??
// https://www.section.io/engineering-education/dynamically-update-react-and-javascript-with-css-variables/
