
const MessageComponent = ({message}) => {
  return (
    <div className='mt-3'>
      <h4 className='text-primary'>Message:</h4>
      <p className='lead'>{message}</p>
    </div>
  )
}

export default MessageComponent
