import { useSelector } from "react-redux"
import { SentimentButtonMobile } from "../contentcomponents/SentimentButton"
import Summarycomponent from "../contentcomponents/Summarycomponent"
import Loadingbar from "../../utils/Loadingbar"

const ContentBarMobilePage = () => {

  const reviewSummaries = useSelector((state) => { return state.reviewSummaries })
  if (reviewSummaries.isLoading === true) {
    return (<Loadingbar />)
  }
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div>
        <div className='mb-2'>
          {/* <h4 style={{ display: 'inline', marginRight: '10px' }}>Keyword sentiments</h4> */}
          <span className='lead text-primary'>Higher percentage is better</span>
        </div>
        <SentimentButtonMobile sentimentDatas={reviewSummaries.sentimentDatas} />
        <hr />
        <Summarycomponent positiveSummary={reviewSummaries.textSummary.positiveSummary} negativeSummary={reviewSummaries.textSummary.negativeSummary} />
      </div>
    </div>
  )
}

export default ContentBarMobilePage
