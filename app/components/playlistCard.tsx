import React from 'react'
import Image from 'next/image';

interface Playlist{
    name:string;
    external_urls:{
        spotify:string;
    };
    href:string;
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

export const PlaylistCard = (props : {playlistList : Playlist[], sendPlaylistNew: Function, playlistIndex: number}) => {
    const {playlistList, sendPlaylistNew, playlistIndex} = props;
    return (
            <div className='w-[100%]'>
            <div className='flex justify-between my-2'>
                <p className='ml-16'>Playlist</p>
                <p className='mr-4'>songs</p>
            </div>
            <div className='flex flex-col overflow-y-scroll max-h-[505px] w-[100%] '>
                {playlistList.map((playlist, index) => {
                    if (playlist.owner.display_name === "Spotify") return;
                    return <div key={index} className={`flex my-1 px-0 py-2 sm:px-2 sm:py-2 ${index == playlistIndex ? 'bg-neutral-800' : 'bg-neutral-900'} justify-between items-center rounded-lg hover:bg-neutral-800 duration-300`} onClick={() => {sendPlaylistNew(playlist.href, index)}}>
                        <div className='flex justify- items-center'>
                            <div className='w-[48px] min-w-[48px] aspect-square'>
                                <Image className='rounded-lg w-[48px] min-w-[48px]' src={playlist.images[0].url} alt='' width={48} height={48}/>
                            </div>
                            <p className='px-5'>{playlist.name}</p>
                        </div>
                        <p className='px-5'>{playlist.tracks.total}</p>
                    </div>
                })}
            </div>
        </div>
    )
}
