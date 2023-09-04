import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeywordSummaries, fetchSummaries } from '../../features/reviewSummariesSlice'

const HotelInput = () => {
  const [hotelList, setHotelList] = useState([])
  const [selectedHotelValue, setSelectedHotelValue] = useState('Your Favorite Hotel')
  const [keyword, setKeyword] = useState('')

  const baseUrl = process.env.REACT_APP_API_URL

  const reviewSummaries = useSelector((state) => {return state.reviewSummaries})
  const dispatch = useDispatch()

  useEffect(() => {
    //call api to set the values of the hotels
    setHotelList(['Ibis Hotel', 'Holiday Inn', 'Shangri-La', 'Hyatt', 'Sheraton'])
  }, [])

  const hotelSelectHandler = (hotelSelected) => {
    setSelectedHotelValue(hotelSelected)
    dispatch(fetchSummaries(hotelSelected))
  }

  const processKeywordHandler = () => {
    dispatch(fetchKeywordSummaries({selectedHotelValue, keyword}))
  }

  return (
    <div className='card border border-dark'>
      <div className='card-header bg-info'>
        Select your hotel
      </div>
      <div className='card-body'>
        <div className='dropdown'>
          <button className='btn btn-light dropdown-toggle' type='button' id='hotelIdButton' data-bs-toggle='dropdown' aria-expanded='false'>
            {selectedHotelValue}
          </button>
          <ul className='dropdown-menu' aria-labelledby='hotelIdButton'>
            {
              hotelList.map((hotel) => {
                return (
                  <li key={hotel} onClick={() => hotelSelectHandler(hotel)}>
                    <a href='#' className='dropdown-item'>{hotel}</a>
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
