import React, { useEffect, useState } from 'react'
import SongCard from './songcard';
import Image from 'next/image';

const PlaylistInfo = (props : {playlist_name:string, playlist_desc:string, playlist_icon_url:string, songs:[{
    song_name: string;
    artist_name: string;
    song_icon_url: string;
    song_info: string
  }];}) => {
    const {playlist_name, playlist_desc, songs, playlist_icon_url} = props;
    console.log("consolling name");
    console.log(playlist_name, playlist_desc);

    return (
        <div className='flex flex-col'>
            <div className='flex mb-6'>
                <div className='w-[20vw] sm:w-[200px] aspect-square relative'>
                    <Image className='' src={playlist_icon_url} alt="Playlist icon"  layout={'fill'} objectFit={'contain'}/>
                </div>
                <div className='flex flex-col justify-center items-start sm:px-5'>
                    <p className='text-white px-2 text-2xl font-semibold'>{playlist_name}</p>
                    <p className='text-neutral-200 px-2 font-light'>{playlist_desc}</p>
                </div>
            </div>

            <div className='flex flex-col pb-4'>
                {songs.length > 0 && songs.map((song, index) => {
                    return <div className='flex my-1 bg-neutral-900 justify-start items-center' key={index}>
                        <div className='w-[48px] aspect-square relative rounded-lg'>
                            <Image src={song.song_icon_url} alt='' layout={'fill'} objectFit={'contain'}/>
                        </div>
                        <p className='ml-5'>{song.song_name}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfo