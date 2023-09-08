import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSummaries } from '../../features/reviewSummariesSlice'

const HotelInput = () => {
  const [hotelList, setHotelList] = useState([{key: null, value: null}])
  const [selectedHotelValue, setSelectedHotelValue] = useState({key:'Your Favorite Hotel', value:''})
  const [keyword, setKeyword] = useState('')

  const reviewSummaries = useSelector((state) => {return state.reviewSummaries})
  const dispatch = useDispatch()

  useEffect(() => {
    //call api to set the values of the hotels
    setHotelList([
      {key: 'Holiday Inn Express Katong', value: 'Holiday Inn Express Singapore Katong, an IHG Hotel'},
      {key: 'Ibis Budget SG Pearl', value: 'Ibis Budget Singapore Pearl'},
      {key: 'Ibis Styles SG Albert', value: 'ibis Styles Singapore Albert'},
      {key: 'Village Hotel Albert Court', value: 'Village Hotel Albert Court by Far East Hospitality'},
      {key: 'Lyf Farrer Park SG', value: 'lyf Farrer Park Singapore'},
    ])
  }, [])

  const hotelSelectHandler = (hotelKey, hotelValue) => {
    setSelectedHotelValue({key: hotelKey, value: hotelValue})
    dispatch(fetchSummaries(hotelValue))
  }

  const processKeywordHandler = () => {
    const selectedHotelValueParams = selectedHotelValue.value
    // dispatch(fetchKeywordSummaries({selectedHotelValueParams, keyword}))
  }

  return (
    <div className='card border border-dark'>
      <div className='card-header bg-info'>
        Select your hotel
      </div>
      <div className='card-body'>
        <div className='dropdown'>
          <button className='btn btn-light dropdown-toggle' type='button' id='hotelIdButton' data-bs-toggle='dropdown' aria-expanded='false'>
            {selectedHotelValue.key}
          </button>
          <ul className='dropdown-menu' aria-labelledby='hotelIdButton'>
            {
              hotelList.map((hotel, index) => {
                return (
                  <li key={index} onClick={() => hotelSelectHandler(hotel.key, hotel.value)}>
                    <a href='#' className='dropdown-item'>{hotel.key}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <hr />
        {
          reviewSummaries.showInputKeyword &&
          <div>
            <label htmlFor='keywordId' className='lead'>Keyword:</label>
            <input type='text' className='form-control mt-3' id='keywordId' placeholder='Enter your keyword' onChange={(e) => {setKeyword(e.target.value)}}></input>
            <button type="submit" className="btn btn-primary mt-3" onClick={processKeywordHandler}>Process</button>
          </div>
        }
      </div>
    </div>
  )
}

export default HotelInput
