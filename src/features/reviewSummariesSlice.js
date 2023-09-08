import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const reviewSummariesInitialState = {
  sentimentDatas: [],
  textSummary: {
    positiveSummary: null,
    negativeSummary: null
  },
  isLoading: false,
  showInputKeyword: false,
  // keywordSentimentData: [],
  // keywordTextSummary: {
  //   keywordPositiveSummary: null,
  //   keywordNegativeSummary: null
  // },
  // keywordMessage: null,
  error: '',
}

export const fetchSummaries = createAsyncThunk('summary/getSummaries', (selectedHotel) => {
  const encodedHotelName = encodeURIComponent(selectedHotel);
  const url = `${process.env.REACT_APP_API_URL}/predict?hotel_name=${encodedHotelName}`
  return axios.get(url)
    .then((response) => { return response.data })
    .catch((error) => { return error.message })
})

// export const fetchKeywordSummaries = createAsyncThunk('keywordSummaries/getKeywordSummaries', ({ selectedHotelValueParams, keyword }) => {
//   console.log('selectedHotelValue: ' + selectedHotelValueParams + ' keyword: ' + keyword)
//   const encodedHotelName = encodeURIComponent(selectedHotelValueParams);
//   const encodedKeyword = encodeURIComponent(keyword);

//   const url = `${process.env.REACT_APP_API_URL}/predict_hotel_keyword?hotel_name=${encodedHotelName}&keyword=${encodedKeyword}`
//   console.log('url: ' + url)
//   return axios.get(url)
//     .then((response) => { return response.data })
//     .catch((error) => { return error.message })
// })

const reviewSummariesSlice = createSlice({
  name: 'reviewSummaries',
  initialState: reviewSummariesInitialState,

  extraReducers: (builders) => {
    builders.addCase(fetchSummaries.pending, (state, action) => {
      state.isLoading = true
      state.showInputKeyword = false
    })
    builders.addCase(fetchSummaries.fulfilled, (state, action) => {
      state.isLoading = false
      // state.showInputKeyword = true
      state.error = ''

      const reviewEntries = Object.entries(action.payload);
      state.sentimentDatas = reviewEntries.filter(([key]) => key !== 'Positive_Review' && key !== 'Negative_Review')
        .map(([key, value]) => {
          return (
            {
              keyword: key,
              percentage: value * 100
            }
          )
        })

      state.textSummary.positiveSummary = action.payload.Positive_Review
      state.textSummary.negativeSummary = action.payload.Negative_Review
    })
    builders.addCase(fetchSummaries.rejected, (state, action) => {
      state.isLoading = false
      state.showInputKeyword = false
      state.error = action.payload
    })
    // builders.addCase(fetchKeywordSummaries.pending, (state, action) => {
    //   state.isLoading = true
    //   state.error = ''
    // })
    // builders.addCase(fetchKeywordSummaries.fulfilled, (state, action) => {
    //   state.isLoading = false
    //   state.error = ''

    //   const reviewEntries = Object.entries(action.payload);
    //   console.log(reviewEntries);
    //   if (reviewEntries.length > 0 && reviewEntries[0][0] === 'message') {
    //     state.keywordMessage = reviewEntries[0][1];
    //     state.keywordTextSummary.keywordPositiveSummary = null
    //     state.keywordTextSummary.keywordNegativeSummary = null
    //     state.keywordSentimentData = []
    //   }
    //   else {
    //     state.keywordMessage = null;
    //     state.keywordSentimentData = reviewEntries.filter(([key]) => key !== 'Positive_Review' && key !== 'Negative_Review')
    //       .map(([key, value]) => {
    //         return (
    //           {
    //             keyword: key,
    //             percentage: value * 100
    //           }
    //         )
    //       })
    //     state.keywordTextSummary.keywordPositiveSummary = action.payload.Positive_Review
    //     state.keywordTextSummary.keywordNegativeSummary = action.payload.Negative_Review
    //   }
    // })
    // builders.addCase(fetchKeywordSummaries, (state, action) => {
    //   state.isLoading = false
    //   state.error = action.payload
    // })
  }
})

const reviewSummariesReducer = reviewSummariesSlice.reducer
export default reviewSummariesReducer
