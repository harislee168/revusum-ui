import React from "react"

export const SentimentButtonDesktop = ({sentimentDatas}) => {
  return (
    <React.Fragment>
      {
        sentimentDatas.map((sentimentData) => {
          const styles = getStyles(sentimentData.percentage)
          return (<button type='button' key={sentimentData.keyword} className='btn me-2' style={styles}>{sentimentData.keyword} | {sentimentData.percentage}%</button>)
        })
      }
    </React.Fragment>
  )
}

export const SentimentButtonMobile = ({sentimentDatas}) => {
  return (
    <React.Fragment>
      {
        sentimentDatas.map((sentimentData) => {
          const styles = getStyles(sentimentData.percentage)
          return(<button type='button' key={sentimentData.keyword} className='btn me-2 mt-2' style={styles}>{sentimentData.keyword} | {sentimentData.percentage}%</button>)
        })
      }
    </React.Fragment>
  )
}

const getStyles = (percentage) => {
  let styles = {
    backgroundColor: '#FF0000',
    color: '#FFFFFF'
  }

  {
    if (percentage > 20 && percentage <= 40) {
      styles = {
        backgroundColor: '#FF8989',
        color: '#000000'
      }
    }
    if (percentage > 40 && percentage <= 60) {
      styles = {
        backgroundColor: '#F7A521',
        color: '#000000'
      }
    }
    if (percentage > 60 && percentage <= 80) {
      styles = {
        backgroundColor: '#95F997',
        color: '#000000'
      }
    }
    if (percentage > 80) {
      styles = {
        backgroundColor: '#1EF223',
        color: '#000000'
      }
    }
  }
  return styles
}
