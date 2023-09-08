import { useSelector } from "react-redux"
import {SentimentButtonDesktop} from "../contentcomponents/SentimentButton"
import Summarycomponent from "../contentcomponents/Summarycomponent"
import Loadingbar from "../../utils/Loadingbar"

const ContentBarDesktopPage = () => {
  const reviewSummaries = useSelector((state) => {return state.reviewSummaries})

  if (reviewSummaries.isLoading === true) {
    return (<Loadingbar />)
  }

  return (
    <div className='container-fluid d-flex'>
      <div>
        <div className='mb-2'>
          <span className='lead text-primary'>Higher percentage is better</span>
        </div>
        <SentimentButtonDesktop sentimentDatas={reviewSummaries.sentimentDatas} />
        <hr />
        <Summarycomponent positiveSummary={reviewSummaries.textSummary.positiveSummary} negativeSummary={reviewSummaries.textSummary.negativeSummary} />
      </div>
    </div>
  )
}

export default ContentBarDesktopPage
