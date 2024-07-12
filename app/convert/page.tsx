'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import ConvertPlaylistInfo from '../components/convertplaylistinfo';
import PlaylistInfo from '../model/playlistinfoInterface';



const Convert = () => {
    const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null);

    useEffect(() => {
        try{
            (async () => {
                //const result = await axios.post("https://FrostyCake47.pythonanywhere.com/getplaylistinfo", null, {withCredentials: true });
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
            <div className='flex flex-row py-5 bg-gradient-to-b from-black to-neutral-800'>
                {playlistInfo && <ConvertPlaylistInfo playlist_name={playlistInfo.playlist_name} playlist_desc={playlistInfo.playlist_desc} songs={playlistInfo.songs} playlist_icon_url={playlistInfo.playlist_icon_url} info={playlistInfo.info}/>}
            </div>          
        </main>
    )
}

export default Convert