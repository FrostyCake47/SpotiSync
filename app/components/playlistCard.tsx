import React from 'react'
import Image from 'next/image';

interface Playlist{
    name:string;
    external_urls:{
        spotify:string;
    };
    images: [{
        height: number | null;
        url: string;
        width: number | null;
    }];
    owner: {
        display_name: string;
    };
    tracks: {
        total: number;
    };
}

export const PlaylistCard = (props : {playlistList : Playlist[], sendPlaylistNew: Function}) => {
    const {playlistList, sendPlaylistNew} = props;
    return (
        <div className='flex flex-col overflow-y-scroll max-h-[505px] w-[100%] '>
            {playlistList.map((playlist, index) => {
                if (playlist.owner.display_name === "Spotify") return;
                return <div key={index} className='flex my-1 px-0 py-0 sm:px-2 sm:py-2 bg-neutral-900 justify-between items-center rounded-lg hover:bg-neutral-800 duration-300' onClick={() => {sendPlaylistNew(playlist.external_urls.spotify)}}>
                    <div className='flex justify- items-center'>
                        <div className='w-[48px] aspect-square relative'>
                            <Image className='rounded-lg' src={playlist.images[0].url} alt='' layout={'fill'} objectFit={'contain'}/>
                        </div>
                        <p className='px-5'>{playlist.name}</p>
                    </div>
                    <p className='px-5'>{playlist.tracks.total}</p>
                </div>
            })}
        </div>
    )
}
