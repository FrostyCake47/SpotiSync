import React, { useEffect, useState } from 'react'
import SongCard from './songcard';

const PlaylistInfo = (props : {playlistName:String, playlistDesc:String, songs:String[]}) => {
    const {playlistName, playlistDesc, songs} = props;

    return (
        <div className='flex flex-col'>
            <div>{playlistName}</div>
            <div>{playlistDesc}</div>
            <div className='flex flex-col'>
                {songs.length > 0 && songs.map((song, index) => {
                    console.log(song);
                    return <div key={index}>
                        <p>{song}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfo