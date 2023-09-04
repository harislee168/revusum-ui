import { useSelector } from "react-redux"
import ContentBarDesktopPage from "../contentbar/desktop/ContentBarDesktopPage"
import HotelInput from "../sidebar/HotelInput"
import KeywordBarDesktop from "../contentbar/desktop/KeywordBarDesktop"

const MainDesktopPage = () => {

  const reviewSummaries = useSelector((state) => { return state.reviewSummaries })

  return (
    <div className='container d-none d-lg-block mt-2'>
      <div className='row'>
        <div className='col-3 mt-2'>
          <HotelInput />
        </div>
        <div className='col m-3'>
          {
            reviewSummaries.sentimentDatas.length !== 0 &&
            (<div>
              <ContentBarDesktopPage />
            </div>)
          }
          {
            reviewSummaries.keywordSentimentData.length !== 0 &&
            (<div>
              <hr />
              <KeywordBarDesktop />
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default MainDesktopPage
