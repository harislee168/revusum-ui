
const Summarycomponent = ({positiveSummary, negativeSummary}) => {
  return (
    <div className='mt-3'>
      <h4 className='text-primary'>Positive Summary:</h4>
      <p className='lead'>{positiveSummary}</p>
      <hr />
      <h4 className='text-danger'>Negative Summary:</h4>
      <p className='lead'>{negativeSummary}</p>
    </div>
  )
}

export default Summarycomponent
