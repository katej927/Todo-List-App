import styles from './UpdateTodo.module.scss'
import BtnCalendar from '../../components/BtnCalendar'

function UpdateTodo() {
  const getDate = (date) => {
    console.log('getDate', date)
  }
  return (
    <div className={styles.UpdateTodo}>
      <span>UpdateTodo</span>
      <BtnCalendar getDate={() => getDate()} />
    </div>
  )
}

export default UpdateTodo
