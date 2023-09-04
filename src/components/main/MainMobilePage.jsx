import { useSelector } from "react-redux"
import ContentBarMobilePage from "../contentbar/mobile/ContentBarMobilePage"
import HotelInput from "../sidebar/HotelInput"
import KeywordBarMobile from "../contentbar/mobile/KeywordBarMobile"

const MainMobilePage = () => {
  const reviewSummaries = useSelector((state) => { return state.reviewSummaries })

  return (
    <div className='container d-lg-none mt-2 justify-content-center align-items-center'>
      <HotelInput />
      {
        reviewSummaries.sentimentDatas.length !== 0 &&
        <div className='mt-3'>
          <ContentBarMobilePage />
        </div>
      }
      {
        reviewSummaries.keywordSentimentData.length !== 0 &&
        (<div>
          <hr />
          <KeywordBarMobile />
        </div>)
      }
    </div>
  )
}

export default MainMobilePage
