import React, { useEffect, useState } from 'react'
import SongCard from './songcard';
import Image from 'next/image';
import someting from 'next-auth/providers/spotify'
import { Checkbox } from 'pretty-checkbox-react';
import usePlaylistInfoStore from '../store/playlistinfoStore';

const PlaylistInfoBlock = (props : {playlist_name:string, playlist_desc:string, playlist_icon_url:string, songs:[{
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
  }
  /*,selectedSongsIndex:boolean[],
  selectSong:Function,
  selectDeselectAll:Function*/;}) => {
    const {playlist_name, playlist_desc, songs, playlist_icon_url, info /*, selectedSongsIndex, selectSong, selectDeselectAll*/} = props;
    //selectDeselectAll(info.num_songs, true);
    const customSelect = usePlaylistInfoStore((state) => state.customSelect);
    const setCustomSelect = usePlaylistInfoStore((state) => state.setCustomSelect);

    const selectedSongs = usePlaylistInfoStore((state) => state.selectedSongs);

    return (
        <div className='flex flex-col'>
            <div className='flex mb-6'>
                <div className='w-[104px] sm:w-[200px] aspect-square relative'>
                    <Image className='rounded-lg' src={playlist_icon_url} alt="Playlist icon"  layout={'fill'} objectFit={'contain'}/>
                </div>
                <div className='flex flex-col justify-center items-start sm:px-5'>
                    <p className='px-4 text-neutral-300text-xs font-light'>Playlist</p>
                    <p className='px-4 text-white text-3xl font-semibold'>{playlist_name}</p>
                    <p className='px-4 text-neutral-400 text-md font-light'>{playlist_desc}</p>
                    <div className='px-4 pt-3 flex'>
                        {info?.user_name && <p className='mr-2'>{info?.user_name ?? ""}</p>}
                        <p className='mr-2 text-neutral-400'>• {`${info?.duration[0] / 60 < 1 ? info?.duration[0] + ' min' : Math.floor(info?.duration[0]/60) + ' hr ' + (info?.duration[0]%60) + ' min'}`}</p>
                        <p className='mr-2 text-neutral-400'>• {info.num_songs} songs</p>
                    </div>
                </div>
            </div>  

            <div>
                <form action="" className='flex justify-end my-2 mx-2'>
                    <input type="checkbox" checked={customSelect} onChange={() => {setCustomSelect(!customSelect); /*console.log(customSelect)*/}} className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-default-checkbox"/>
                    <label htmlFor="customSelect" className='px-2 text-md font-light'>Custom select</label>
                </form>
            </div>


            <div className='flex flex-col sm:pb-4 overflow-y-scroll max-h-[360px]'>
                {songs.length > 0 && songs.map((song, index:number) => {
                    return <div className={`flex my-1 px-0 py-2 sm:px-2 sm:py-2 bg-neutral-900 justify-between items-center rounded-lg hover:bg-neutral-800 duration-300`} key={index} onClick={() => {/*selectSong(index)*/}}>
                        {/*${selectSong(index) ? ' bg-gradient-to-r from-neutral-900 to-green-950' : 'bg-neutral-900'}*/}
                        <div className='flex justify-start items-center'>
                            <div className='w-[48px] aspect-square relative'>
                                <Image className='rounded-lg' src={song.song_icon_url} alt='' layout={'fill'} objectFit={'contain'}/>
                            </div>
                            <div className='flex flex-col items-start justify-center'>
                                <p className='ml-5 text-sm sm:text-lg font-semibold'>{song.song_name}</p>
                                <p className='ml-5 text-xs sm:text-md font-light'>{song.artist_name}</p>
                            </div>  
                        </div>
                        
                        <div className='flex flex-1 justify-end items-center'>
                            <p className='mx-10 text-sm font-light text-neutral-400'>{song.album_name}</p>
                            <p className='px-6 text-sm'>{song.duration[0] + ":" + (song.duration[1].toString().length == 1 ? "0" : '') + song.duration[1]}</p>
                        </div>
                        {customSelect && <div>
                            <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-default-checkbox"/>  
                        </div>}
                    </div>;
                })}
            </div>
        </div>
    )
}

export default PlaylistInfoBlock