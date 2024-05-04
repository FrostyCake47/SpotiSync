'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import PlaylistInfo from '../components/playlistinfo';

interface PlaylistInfo {
    playlist_name: string;
    playlist_desc: string;
    youtube_url: string;
    playlist_icon_url: string;
    info: {
        user_name: string;
        num_songs: string;
        duration: number[];
    }
    songs: [{
      song_name: string;
      artist_name: string;
      album_name: string
      song_icon_url: string;
      song_info: string;
      duration: number[];
    }];
  }

const Convert = () => {
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null);
    const [youtubeurl, setYoutubeurl] = useState("");

    const convertToYoutube = async () => {
        try{
            const result = await axios.post("http://localhost:5000/convert", null, {withCredentials:true})
            setYoutubeurl(result.data.message.youtubeurl)
        } catch (error) {
            console.log('Error while converting: ' + error);
        }
    }

    useEffect(() => {
        try{
            (async () => {
                const result = await axios.post("http://localhost:5000/getplaylistinfo", null, {withCredentials: true });
                setPlaylistInfo(result.data.playlistinfo);
              })();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <main className="flex flex-col h-screen">
            <Navbar/>
            <div className='flex flex-row'>
                <div className='flex flex-col mx-10 my-5 justify-center'>
                    <div>
                        {playlistInfo && <PlaylistInfo playlist_name={playlistInfo.playlist_name} playlist_desc={playlistInfo.playlist_desc} songs={playlistInfo.songs} playlist_icon_url={playlistInfo.playlist_icon_url} info={playlistInfo.info}/>}
                    </div>
                    <button onClick={() => {convertToYoutube()}} className='bg-red-500 hover:bg-red-600 duration-300 px-3 py-2 mx-5 rounded-2xl'>Convert</button>
                </div> 
                <div>
                    <p>Click the convert button</p>
                </div>
            </div>          
            
        </main>
    )

    {/*return (
        <div>
            <div>Convert</div>
            {playlistInfo && (
                <div className='flex flex-col'>
                    <div>{playlistInfo.playlist_name}</div>
                    <div>{playlistInfo.playlist_desc}</div>
                    <div className='flex flex-col'>{playlistInfo.songs.map((song) => {
                        return <div>{song.song_name}</div>
                    })}</div>

                    <button onClick={() => {convertToYoutube()}}>Convert</button>
                    {youtubeurl && <div>{youtubeurl}</div>}
                </div>
            )}
        </div>
    )*/}
}

export default Convert