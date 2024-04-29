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
            <div className='flex'>
                <Image src={playlist_icon_url} alt="Playlist icon" width={20} height={20}/>
                <div>
                    <p className='text-white'>{playlist_name}</p>
                    <p className='text-white'>{playlist_desc}</p>
                </div>
            </div>

            <div className='flex flex-col'>
                {songs.length > 0 && songs.map((song, index) => {
                    return <div key={index}>
                        <p>{song.song_name}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfo