import { Route, Routes } from 'react-router-dom'
import Calendar from './Calendar'
import Login from './Login'
import styles from './Routes.module.scss'
import TodoList from './TodoList'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<TodoList />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
