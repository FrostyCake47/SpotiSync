import React, { useEffect, useState } from 'react'
import SongCard from './songcard';
import Image from 'next/image';
import someting from 'next-auth/providers/spotify'
import axios from 'axios';
import { FaYoutube } from "react-icons/fa6";
import Link from 'next/link';
import usePlaylistInfoStore from '../store/playlistinfoStore';
import { useSession } from 'next-auth/react';

const ConvertPlaylistInfo = (props : {playlist_name:string, playlist_desc:string, playlist_icon_url:string, songs:[{
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
  }, 
}) => {
    const {playlist_name, playlist_desc, songs, playlist_icon_url, info} = props;
    const [youtubeurl, setYoutubeurl] = useState("");
    const [convertStatus, setConvertStatus] = useState("Conversion is not started");

    const selectedSongs = usePlaylistInfoStore((state) => state.selectedSongs);
    const customSelect = usePlaylistInfoStore((state) => state.customSelect);

    const { data: session } = useSession();
    
    let count = 0;
    let time = 0;
    songs.forEach((song, index) => {
        if(selectedSongs[index]) {
            count++;
            time += song.duration[0];
        }
    })
    
    const convertToYoutube = async () => {
        try{
            setConvertStatus("Conversion have started...")
            //const result = await axios.post("https://FrostyCake47.pythonanywhere.com/convert", null, {withCredentials:true})
            const result = await axios.post("http://localhost:5000/convert", {selectedSongs: customSelect ? selectedSongs : null, user:session?.user ?? null}, {withCredentials:true})
            if(result.data.message.youtubeurl){
                setConvertStatus("Conversion has Finished");
                setYoutubeurl(result.data.message.youtubeurl);
            }
            else {

                setConvertStatus("Error in conversion. Try again?");
            }
            
        } catch (error) {
            console.log('Error while converting: ' + error);
        }
    }

    return (
        <div className='flex flex-col md:flex-row mx-8 md:mb-24 items-center md:items-start justify-between w-screen'>
            <div className='flex flex-col flex-1'>
                <div className='flex mb-6 w-100 justify-between md:justify-start'>
                    <div className='w-[204px] md:w-[200px] aspect-square relative'>
                        <Image className='rounded-lg' src={playlist_icon_url} alt="Playlist icon"  layout={'fill'} objectFit={'contain'}/>
                    </div>
                    <div className='flex flex-col justify-center items-start md:px-5'>
                        <p className='px-4 text-neutral-300text-xs font-light'>Playlist</p>
                        <p className='px-4 text-white text-3xl font-semibold'>{playlist_name}</p>
                        <p className='px-4 text-neutral-400 text-md font-light'>{playlist_desc}</p>
                        <div className='px-4 pt-3 flex flex-col'>
                            {info?.user_name && <p className='mr-2'>{info?.user_name ?? ""}</p>}
                            <div className='flex flex-row'>
                                {!customSelect && <p className='mr-2 text-neutral-400'>• {`${info?.duration[0] / 60 < 1 ? info?.duration[0] + ' min' : Math.floor(info?.duration[0]/60) + ' hr ' + (info?.duration[0]%60) + ' min'}`}</p>}
                                {customSelect && <p className='mr-2 text-neutral-400'>• {`${time / 60 < 1 ? time + ' min' : Math.floor(time/60) + ' hr ' + (time%60) + ' min'}`}</p>}
                                <p className='mr-2 text-neutral-400'>• {customSelect ? count : songs?.length} songs</p>
                            </div>
                
                        </div>
                    </div>
                </div>
                <button onClick={() => {convertToYoutube()}} className='bg-red-500 hover:bg-red-600 duration-300 px-3 py-2 mx-0 mr-4 rounded-2xl'>Convert</button>
                <div className='flex mt-5 flex-col justify-center items-center'>
                    <p className={`${convertStatus.endsWith('started') || convertStatus.endsWith('...') ? 'text-amber-500' : 'text-green-500'}`}>{convertStatus}</p>
                    <div className='flex'>
                        <a href={youtubeurl} className={`${youtubeurl ? 'flex flex-row items-center bg-neutral-700 hover:bg-neutral-900 duration-300 px-4 py-2 my-2 rounded-xl' : 'hidden'}`}>
                            <FaYoutube size={30} className=' text-red-500'/>
                            <p className='px-3'>{playlist_name}</p>
                        </a>
                    </div>
                </div>
            </div>

            <div className='flex flex-col md:pb-0 w-[100%] md:w-[70%] overflow-y-scroll max-h-[360px] my-5 md:my-0'>
                {songs.length > 0 && songs.map((song, index) => {
                    return ((!customSelect) || (customSelect && selectedSongs[index])) && <div className='flex my-1 px-2 py-2 bg-neutral-900 justify-between items-center rounded-lg hover:bg-neutral-800 duration-300' key={index}>
                        <div className='flex justify-end items-between'>
                            <div className='w-[48px] aspect-square relative'>
                                <Image className='rounded-lg' src={song.song_icon_url} alt='' layout={'fill'} objectFit={'contain'}/>
                            </div>
                            <div className='flex flex-col items-start justify-center'>
                                <p className='ml-5 text-sm md:text-lg font-semibold'>{song.song_name}</p>
                                <p className='ml-5 text-xs md:text-md font-light'>{song.artist_name}</p>
                            </div> 
                        </div>
                        <p className='mx-10 text-sm font-light text-neutral-400'>{song.album_name}</p>
                        <p className='px-6 text-sm'>{song.duration[0] + ":" + (song.duration[1].toString().length == 1 ? "0" : '') + song.duration[1]}</p>
                    </div>;
                })}
            </div>
        </div>
    )
}

export default ConvertPlaylistInfo