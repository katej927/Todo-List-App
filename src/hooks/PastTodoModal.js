import { useEffect, useState } from 'react'
import { getPastTodosByNickName, updatePastTodos } from '../utils/data/localStorage'

export const usePastTodoModal = (nickname) => {
  const [isShow, setIsShow] = useState(false)

  const close = () => {
    setIsShow(false)
  }

  const submit = (nickName, data, pastTodoWithHandle) => {
    const willDeleteData = pastTodoWithHandle.filter(val => !val.isDone)
    updatePastTodos(nickName, data, willDeleteData)
    close()
  }

  useEffect(() => {
    const tempTodos = getPastTodosByNickName(nickname)
    const isResult = tempTodos.length !== 0
    setIsShow(isResult)
  }, [])

  return [isShow, submit, close]
}