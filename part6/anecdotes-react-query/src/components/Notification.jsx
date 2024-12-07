import { useNotificationValue } from "../NotificaitionContext"

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification