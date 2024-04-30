import React, { useEffect, useState } from 'react'
import SongCard from './songcard';
import Image from 'next/image';

const PlaylistInfo = (props : {playlist_name:string, playlist_desc:string, playlist_icon_url:string, songs:[{
    song_name: string;
    artist_name: string;
    album_name: string
    song_icon_url: string;
    song_info: string;
    duration: number[]
  }],
  info: {
    user_name: string;
    num_songs: string;
    duration: number[];
  };}) => {
    const {playlist_name, playlist_desc, songs, playlist_icon_url, info} = props;

    return (
        <div className='flex flex-col'>
            <div className='flex mb-6'>
                <div className='w-[20vw] sm:w-[200px] aspect-square relative'>
                    <Image className='rounded-lg' src={playlist_icon_url} alt="Playlist icon"  layout={'fill'} objectFit={'contain'}/>
                </div>
                <div className='flex flex-col justify-center items-start sm:px-5'>
                    <p className='px-4 text-neutral-300text-xs font-light'>Playlist</p>
                    <p className='px-4 text-white text-3xl font-semibold'>{playlist_name}</p>
                    <p className='px-4 text-neutral-200 text-md font-light'>{playlist_desc}</p>
                    <div className='px-4 flex'>
                        <p className='mr-2'>{info.user_name}</p>
                        {/*<p className='mr-2'>{`${info.duration/60 == 0 ? '' : info.duration/60}:${info.duration%60}`}</p>*/}
                        <p className='mr-2'>{`${info.duration[0]}:${info.duration[1]}`}</p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col pb-4 overflow-y-scroll max-h-[300px]'>
                {songs.length > 0 && songs.map((song, index) => {
                    return <div className='flex my-1 px-2 bg-neutral-900 justify-between items-center py-2 rounded-lg hover:bg-neutral-800 duration-300' key={index}>
                        <div className='flex justify-start items-center'>
                            <div className='w-[48px] aspect-square relative'>
                                <Image className='rounded-lg' src={song.song_icon_url} alt='' layout={'fill'} objectFit={'contain'}/>
                            </div>
                            <div className='flex flex-col items-start justify-center'>
                                <p className='ml-5 text-lg'>{song.song_name}</p>
                                <p className='ml-5 text-md font-light'>{song.artist_name}</p>
                            </div>  
                        </div>
                        <p className='px-6'>{song.duration[0] + ":" + song.duration[1]}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfo