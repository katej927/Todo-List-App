import styles from './PastTodoModal.module.scss'
import { useState } from 'react'
import { CheckIcon } from '../../assets/svgs'
import PropTypes from 'prop-types'
import { getCategoryByNickNameAndCategoryId } from '../../utils/data/localStorage'

function PastTodoModal({isShow, data, nickName, close, updateData}) {
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

  const onSubmit = () => {
    const willDeleteData = pastTodos.filter(val => !val.isDone)
    updateData(nickName, data, willDeleteData)
    close()
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
                  style={{borderColor: getCategoryByNickNameAndCategoryId(nickName, value.categoryId).color, backgroundColor: value.isDone && getCategoryByNickNameAndCategoryId(nickName, value.categoryId).color}}
                  type='checkbox' 
                  data-id={value.id} 
                  checked={value.isDone} 
                  onChange={todoChange}/>
                <CheckIcon />
              </div>
              <p className={styles.taskTitle} style={{color: getCategoryByNickNameAndCategoryId(nickName, value.categoryId).color}}>{value.todo}</p>
            </li>
          )}
        </ul>
        <div className={styles.confirmBtnWrapper}>
          <button type='button' className={styles.confirmBtn} onClick={onSubmit}>Confirm</button>
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
  updateData: PropTypes.func.isRequired
}

export default PastTodoModal

