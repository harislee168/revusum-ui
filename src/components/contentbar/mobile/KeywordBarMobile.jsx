import { useSelector } from "react-redux"
import { SentimentButtonMobile } from "../contentcomponents/SentimentButton"
import Summarycomponent from "../contentcomponents/Summarycomponent"

const KeywordBarMobile = () => {
  const reviewSummaries = useSelector((state) => {return state.reviewSummaries})
  return (
    <div className='container-fluid d-flex justify-content-center align-items-center'>
      <div>
        <hr />
        <span className='lead'>The positive sentiment of {reviewSummaries.keywordSentimentData[0].keyword} keyword is: </span><SentimentButtonMobile sentimentDatas={reviewSummaries.keywordSentimentData} />
        <Summarycomponent positiveSummary={reviewSummaries.keywordTextSummary.keywordPositiveSummary} negativeSummary={reviewSummaries.keywordTextSummary.keywordNegativeSummary} />
      </div>
    </div>
  )
}

export default KeywordBarMobile
