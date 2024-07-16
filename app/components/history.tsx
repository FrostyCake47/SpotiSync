import React from 'react'
import HistoryData from '../model/historyData'
import Image from 'next/image';
import { FaSpotify } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';

const History = (props: {historyDataList: HistoryData[] | null}) => {
    const {historyDataList} = props;
  return (
    <div className=''>
        <p>History</p>
        {!historyDataList && <p>Convert atleast one song and come back</p>}
        {historyDataList && <div className='grid grid-cols-5 my-1 px-0 py-2 sm:px-2 sm:py-2 bg-neutral-900 justify-between items-center'>
            <p>Playlist Name</p>
            <p>Author</p>
            <p>Songs</p>
            <p>Spotify</p>
            <p>Youtube</p>
        </div>}
        {historyDataList && historyDataList.map((history, index) => {
            return <div key={index} className='grid grid-cols-5 my-1 px-0 py-2 sm:px-2 sm:py-2 bg-neutral-900 justify-between items-center rounded-lg hover:bg-neutral-800 duration-300'>
                <div className='flex items-center'>
                    <div className='w-[48px] min-w-[48px] gap-2 aspect-square relative'>
                        <Image className='rounded-lg' src={history.playlist_icon ?? ''} alt='' layout={'fill'} objectFit={'contain'}/>
                    </div>
                    <p className='px-4'>{history.playlist_name}</p>
                </div>
                <p>{history.playlist_author}</p>
                <p>{history.no_songs}</p>
                

                <a href={history.spotify_url.replace('/api.', '/open.').replace('/v1/', '/').replace('/playlists/', '/playlist/')}>
                    <FaSpotify size={30} color='#22C45D'/>
                </a>
                <a href={history.youtube_url}>
                    <FaYoutube size={30} color='#EF4444'/>
                </a>



            </div>
        })}
    </div>
  )
}

export default History