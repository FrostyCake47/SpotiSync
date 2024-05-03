import React from 'react'

interface Playlist{
    name:string;
    external_urls:{
        spotify:string
    }
}

export const PlaylistCard = (props : {playlistList : Playlist[], sendPlaylistNew: Function}) => {
    const {playlistList, sendPlaylistNew} = props;
    return (
        <div className='flex flex-col'>
            {playlistList.map((playlist) => {
                return <div className='bg-neutral-500 rounded-lg px-5 py-2' onClick={() => {sendPlaylistNew(playlist.external_urls.spotify)}}>
                    <p>{playlist.name}</p>
                </div>
            })}
        </div>
    )
}
