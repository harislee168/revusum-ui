import { useSelector } from "react-redux"
import { SentimentButtonDesktop } from "../contentcomponents/SentimentButton"
import Summarycomponent from "../contentcomponents/Summarycomponent"

const KeywordBarDesktop = () => {
  const reviewSummaries = useSelector((state) => {return state.reviewSummaries})
  return (
    <div className='container-fluid d-flex'>
      <div>
        <hr />
        <span className='lead'>The positive sentiment of {reviewSummaries.keywordSentimentData[0].keyword} keyword is: </span><SentimentButtonDesktop sentimentDatas={reviewSummaries.keywordSentimentData} />
        <Summarycomponent positiveSummary={reviewSummaries.keywordTextSummary.keywordPositiveSummary} negativeSummary={reviewSummaries.keywordTextSummary.keywordNegativeSummary} />
      </div>
    </div>
  )
}

export default KeywordBarDesktop
