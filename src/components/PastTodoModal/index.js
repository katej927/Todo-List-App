import styles from './PastTodoModal.module.scss'
import { useState } from 'react'
import { CheckIcon } from '../../assets/svgs'
import PropTypes from 'prop-types'
import { IoIosClose } from 'react-icons/io'

function PastTodoModal({isShow, data, nickName, close, submit, getCategoryByNickNameAndId}) {
  const [pastTodos, setPastTodos] = useState(data)
  const todoChange = (e) => {
    const { dataset, checked } = e.currentTarget
    const { id } = dataset

    setPastTodos((prev) => {
      const targetIndex = prev.findIndex((todo) => todo.id === id)
      const newList = [...prev]
      newList[targetIndex].isDone = checked
      return newList
    })
  }

  return(
    <div className={isShow ? styles.backBoard : styles.modalOff}>
      <div className={styles.main}>
        <div className={styles.closeBtnWrapper}>
          <IoIosClose color='#A8A8A8' className={styles.closeBtn} onClick={close} />
        </div>
        <h1 className={styles.modalTitle}>Today&apos;s Tasks에 <br/>추가하시겠습니까?</h1>
        <ul className={styles.taskList}>
          {pastTodos.map(value => 
            <li key={`past_todo_${value.id}`} className={styles.task}>
              <div className={styles.checkboxWrapper}>
                <input 
                  style={
                    { borderColor: getCategoryByNickNameAndId(nickName, value.categoryId).color, 
                      backgroundColor: value.isDone && getCategoryByNickNameAndId(nickName, value.categoryId).color
                    }}
                  type='checkbox' 
                  data-id={value.id} 
                  checked={value.isDone} 
                  onChange={todoChange}/>
                <CheckIcon />
              </div>
              <p className={styles.taskTitle} style={{color: getCategoryByNickNameAndId(nickName, value.categoryId).color}}>{value.todo}</p>
            </li>
          )}
        </ul>
        <div className={styles.confirmBtnWrapper}>
          <button 
            type='button' 
            className={styles.confirmBtn} 
            onClick={() => submit(nickName, data, pastTodos)}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

PastTodoModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    todo: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    isDone: PropTypes.bool,
  })).isRequired,
  nickName: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  getCategoryByNickNameAndId: PropTypes.func.isRequired
}

export default PastTodoModal

