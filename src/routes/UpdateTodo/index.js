import styles from './UpdateTodo.module.scss'
import BtnCalendar from '../../components/BtnCalendar'

function UpdateTodo() {
  // test. merge시, 삭제
  const getDate = (date) => {
    console.log('getDate', date)
  }
  return (
    <div className={styles.UpdateTodo}>
      <span>UpdateTodo</span>
      {/* test. merge시, props 수정 */}
      <BtnCalendar getDate={getDate} forUpdateDate='' />
    </div>
  )
}

export default UpdateTodo
