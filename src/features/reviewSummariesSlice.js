import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const reviewSummariesInitialState = {
  sentimentDatas: [],
  textSummary: {
    positiveSummary: null,
    negativeSummary: null
  },
  isLoading: false,
  showInputKeyword: false,
  keywordSentimentData: [],
  keywordTextSummary: {
    keywordPositiveSummary: null,
    keywordNegativeSummary: null
  },
  error: ''
}

export const fetchSummaries = createAsyncThunk('summary/getSummaries', (selectedHotel) => {
  console.log('selectedHotel: ' + selectedHotel)
  const encodedHotelName = encodeURIComponent(selectedHotel);
  const url = `${process.env.REACT_APP_API_URL}/predict?hotel_name=${encodedHotelName}`
  console.log('url: ' + url)
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {return response.data})
    .catch((error) => {return error.message})
})

export const fetchKeywordSummaries = createAsyncThunk('summary/getKeywordSummaries', ({selectedHotelValue, keyword}) =>{
  console.log('selectedHotelValue: ' + selectedHotelValue + ' keyword: ' + keyword)
  const encodedHotelName = encodeURIComponent(selectedHotelValue);
  const encodedKeyword = encodeURIComponent(keyword);

  const url = `${process.env.REACT_APP_API_URL}/predict_hotel_keyword?hotel_name=${encodedHotelName}&keyword=${keyword}`
  console.log('url: ' + url)
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {return response.data})
    .catch((error) => {return error.message})
})

const reviewSummariesSlice = createSlice({
  name:'reviewSummaries',
  initialState: reviewSummariesInitialState,

  extraReducers: (builders) => {
    builders.addCase(fetchSummaries.pending, (state, action) => {
      state.isLoading = true
      state.showInputKeyword = false
    })
    builders.addCase(fetchSummaries.fulfilled, (state, action) => {
      console.log(action.payload)
      state.sentimentDatas = action.payload.slice(0, 5).map((data, index) => {
        return (
          {
            keyword: data.username,
            percentage: (index + 1) * 20
          }
        )
      })
      state.textSummary.positiveSummary = action.payload[0].company.name
      state.textSummary.negativeSummary = action.payload[0].company.catchPhrase

      state.isLoading = false
      state.showInputKeyword = true
      state.error = ''
    })
    builders.addCase(fetchSummaries.rejected, (state, action) => {
      state.isLoading = false
      state.showInputKeyword = false
      state.error = action.payload
    })
    builders.addCase(fetchKeywordSummaries.pending, (state, action) => {
      state.isLoading = true
    })
    builders.addCase(fetchKeywordSummaries.fulfilled, (state, action) => {
      state.isLoading = false
      state.keywordSentimentData = [{
        keyword: action.payload[6].username,
        percentage: 65
      }]
      state.keywordTextSummary.keywordPositiveSummary = action.payload[6].company.name
      state.keywordTextSummary.keywordNegativeSummary = action.payload[6].company.catchPhrase
    })
    builders.addCase(fetchKeywordSummaries, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

const reviewSummariesReducer = reviewSummariesSlice.reducer
export default reviewSummariesReducer
