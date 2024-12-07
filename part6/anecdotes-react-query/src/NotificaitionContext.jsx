import { useReducer, useContext, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NofificationContext = createContext()

export const NofificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NofificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NofificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NofificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NofificationContext)
  return notificationAndDispatch[1]
}

export default NofificationContext