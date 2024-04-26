import React, { useEffect, useState } from 'react'
import SongCard from './songcard';

const PlaylistInfo = (props : {playlistName:String, playlistDesc:String, songs:[{
    song_name: string;
    artist_name: string;
    song_icon_url: string;
    song_info: string
  }];}) => {
    const {playlistName, playlistDesc, songs} = props;

    return (
        <div className='flex flex-col'>
            <div>{playlistName}</div>
            <div>{playlistDesc}</div>
            <div className='flex flex-col'>
                {songs.length > 0 && songs.map((song, index) => {
                    console.log(song);
                    return <div key={index}>
                        <p>{song.song_name}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfo