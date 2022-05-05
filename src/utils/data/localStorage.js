import moment from "moment"

const MAIN_STORAGE_KEY = 'todo'

export const getAllData = () => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData)
}
export const updateAllData = (allData) => {
  try {
    localStorage.setItem(MAIN_STORAGE_KEY, JSON.stringify(allData))    
  } catch(err) {
    console.log(err)
  }
}

export const getUserByNickName = (nickName) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter(val => val.userNickName === nickName)[0]
}
export const getUserByUserId = (userId) => {
  const allData = localStorage.getItem(MAIN_STORAGE_KEY)
  return JSON.parse(allData).filter(val => val.id === userId)[0]
}


export const getCategoryByNickNameAndCategoryId = (nickName, categoryId) => {
  const user = getUserByNickName(nickName)
  return user.data.category.filter(val => val.id === categoryId)[0]
}
export const getPastTodosByNickName = (nickName) => {
  const userData = getUserByNickName(nickName)
  const today = moment().format('YYYY/MM/DD')
  return userData.data.todoList.filter(todo => moment(todo.date).isBefore(today) && !todo.isDone)
}