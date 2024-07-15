import React from 'react'
import HistoryData from '../model/historyData'

const History = (props: {historyDataList: HistoryData[] | null}) => {
    const {historyDataList} = props;
  return (
    <div>
        <p>History</p>
        {!historyDataList && <p>Convert atleast one song and come back</p>}
        {historyDataList && historyDataList.map((history, index) => {
            return <div key={index}>
                <p>{history.playlist_name}</p>
            </div>
        })}
    </div>
  )
}

export default History