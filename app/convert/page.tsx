'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import ConvertPlaylistInfo from '../components/convertplaylistinfo';
import PlaylistInfo from '../model/playlistinfoInterface';
import usePlaylistInfoStore from '../store/playlistinfoStore';
import Footer from '../components/footer';



const Convert = () => {
    const playlistInfo = usePlaylistInfoStore((state) => state.playlistInfo);
    
    console.log(playlistInfo);

    /*useEffect(() => {
        try{
            (async () => {
                //const result = await axios.post("https://FrostyCake47.pythonanywhere.com/getplaylistinfo", null, {withCredentials: true });
                const result = await axios.post("http://localhost:5000/getplaylistinfo", null, {withCredentials: true });
                setPlaylistInfo(result.data.playlistinfo);
              })();
        } catch (error) {
            console.log(error);
        }
    }, [])*/

    return (
        <main className="flex flex-col h-screen">
            <Navbar/>
            <div className='flex flex-row py-5 bg-gradient-to-b from-black to-neutral-800'>
                {playlistInfo && <ConvertPlaylistInfo playlist_name={playlistInfo.playlist_name} playlist_desc={playlistInfo.playlist_desc} songs={playlistInfo.songs} playlist_icon_url={playlistInfo.playlist_icon_url} info={playlistInfo.info}/>}
                {!playlistInfo && <div className='flex flex-col w-full py-[14rem] justify-center items-center'>
                    <p className='text-2xl text-amber-500 font-semibold'>No Playlist is selected!</p>
                    <p className='text-amber-400'>Go back to homescreen to select a playlist to be converted</p>
                </div>}
            </div>
            <Footer/>      
        </main>
    )
}

export default Convert