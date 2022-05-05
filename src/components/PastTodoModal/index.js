import styles from './PastTodoModal.module.scss'
import { useState } from 'react'
import { CheckIcon } from '../../assets/svgs'

import PropTypes from 'prop-types'

/** Fake Data */
const INIT_TODO = [
  {
    id: 1,
    todo: "계란 2판 사기",
    categoryId: 3,
    date: '2022/02/01',
    isDone: false,
    color: '#A8A8A9'
  },
  {
    id: 2,
    todo: "맥북 프로 M1 Max CTO 버전 사기",
    categoryId: 3,
    date: '2022/02/01',
    isDone: true,
    color: 'black'
  },
  {
    id: 3,
    todo: "오늘의 TIL 작성하기",
    categoryId: 3,
    date: '2022/02/01',
    isDone: true,
    color: '#7C7CFF'
  },
  {
    id: 4,
    todo: "과제 마무리",
    categoryId: 3,
    date: '2022/02/01',
    isDone: false,
    color: '#B4B4B4'
  },
  {
    id: 5,
    todo: "오늘의 TIL 작성하기",
    categoryId: 3,
    date: '2022/02/01',
    isDone: false,
    color: 'blue'
  },
];


function PastTodoModal({isShow, data = INIT_TODO, userId, close, updatePastTodo}) {
  const [pastTodos, setPastTodos] = useState(data);
  const todoChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setPastTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === Number(id))
      const newList = [...prev]
      newList[targetIndex].isDone = checked
      return newList
    })
  }

  return(
    <div className={isShow ? styles.backBoard : styles.modalOff}>
      <div className={styles.main}>
        <div className={styles.closeBtnWrapper}>
          <button type='button' className={styles.closeBtn} onClick={close} aria-label='close button'/>
        </div>
        <h1 className={styles.modalTitle}>Today&apos;s Tasks에 <br/>추가하시겠습니까?</h1>
        <ul className={styles.taskList}>
          {pastTodos.map(value => 
            <li key={`past_todo_${value.id}`} className={styles.task}>
              <div className={styles.checkboxWrapper}>
                <input 
                  style={{borderColor: value.color, backgroundColor: value.isDone && value.color}}
                  type='checkbox' 
                  data-id={value.id} 
                  checked={value.isDone} 
                  onChange={todoChange}/>
                <CheckIcon />
              </div>
              <p className={styles.taskTitle} style={{color: value.color}}>{value.todo}</p>
            </li>
          )}
        </ul>
        <div className={styles.confirmBtnWrapper}>
          <button type='button' className={styles.confirmBtn} onClick={close}>Confirm</button> {/** TODO close => updatePastTodo */}
        </div>
      </div>
    </div>
  )
}

PastTodoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  data: PropTypes.string.isRequired, // TODO change type to object (pastTodoList)
  userId: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
  updatePastTodo: PropTypes.func.isRequired
}

export default PastTodoModal

