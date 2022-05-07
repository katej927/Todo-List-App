import { useEffect, useState } from 'react'
import { getPastTodosByNickName, updatePastTodos } from '../utils/data/localStorage'

export const usePastTodoModal = (nickname, setTodoList) => {
  const [isShow, setIsShow] = useState(false)

  const close = () => {
    setIsShow(false)
  }

  const submit = (nickName, data, pastTodoWithHandle) => {
    const willDeleteData = pastTodoWithHandle.filter(val => !val.isDone)
    updatePastTodos(nickName, data, willDeleteData)
    /** TODO todoList 상태 변경 로직
     *  오늘의 투두가 변경되기 때문에 상태를 변경해줘야 한다.
     *  오늘의 투두 가져오는 함수가 만들어지면 setTodoList를 prop으로 받아서 todoList의 상태를 변경하도록 한다.
     *  const todayTodoList = 오늘 해야하는 투두 가져오는 함수 호출 
     *  setTodoList(todayTodoList)
    */
    close()
  }

  useEffect(() => {
    const tempTodos = getPastTodosByNickName(nickname)
    const isResult = tempTodos.length !== 0
    setIsShow(isResult)
  }, [])

  return [isShow, submit, close]
}