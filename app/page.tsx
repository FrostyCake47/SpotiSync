'use client';
import { useState } from "react";
import TopWave from "./components/topwave";
import PlaylistInfo from "./components/playlistinfo";
import axios from "axios";
import Navbar from "./components/navbar";

import { IoMdMusicalNote } from "react-icons/io";
import { IoIosMusicalNote } from "react-icons/io";
import { IoMusicalNotes } from "react-icons/io5";

interface PlaylistInfo {
  playlistName: string;
  playlistDesc: string;
  youtubeurl: string;
  playlist_icon_url: string;
  songs: [{
    song_name: string;
    artist_name: string;
    song_icon_url: string;
    song_info: string
  }];
}


export default function Home() {

  const [url, setUrl] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null);

  const [playlistFetched, setPlayListFetched] = useState(false);
  const [error, setError] = useState(false);

  const handleOnSubmit = (event:any) => {
    event.preventDefault();
    sendPlaylistNew(url);
  }

  const sendPlaylistNew = async (url:String) => {
    try {

      const result = await axios.post('http://localhost:5000/playlisturl', {data:url}, { withCredentials: true });
      console.log('Response:', result.data);

      setPlaylistInfo(result.data.message);
      setPlayListFetched(true);
      setError(false);

      console.log("playlistfetched" + playlistFetched);
      
    } catch (error) {
      console.error('Error:', error);
      setError(true);
      setPlayListFetched(false);
    }
  }

  const newAuth = async () => {
      try{
        const result = await axios.post('http://localhost:5000/getauthurl', {data:playlistInfo}, { withCredentials: true });
        const authorization_url = result.data.url;
        window.location.href = authorization_url;

      } catch (err) {
        console.log("new auth error " + err)
      }
  }

  return (
    <main className="flex flex-col h-screen">
      <Navbar/>
      <div className="flex flex-col bg-gradient-to-b from-neutral-900 to-neutral-800 my-8 mx-5 rounded-lg items-start">
        <div>
          <div className="mx-5 sm:px-10 pt-8 sm:pt-10">
            <div className="text-[25px] sm:text-[50px] font-medium">Convert Spotify playlists to YouTube easily!</div>
            <p className="text-[15px] sm:text-[25px]">Fetch songs from playlist and display for conversion.</p>
          </div>
        </div>
        <div className="sm:px-10">
          <button className="rounded-lg text-[15px] px-4 py-2 my-8 mx-5 bg-amber-500 transition-colors duration-300 ease-in-out hover:bg-amber-600">Get Started</button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mx-5 px-5 rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-950">

        <form action="" className="flex flex-col flex-1 sm:px-10 py-10 rounded-[20px] items-start">
          <label htmlFor="" className="text-[25px] my-1">Enter a playlist URL</label>
          <input className="text-neutral-200 px-2 py-2 my-1 rounded-md w-full sm:w-[80%] bg-neutral-800 border-amber-500 border-2" value={url} type="text" onChange={(e) => setUrl(e.target.value)}/>
          <button className="flex bg-green-600 px-5 py-2 my-3  rounded-xl" onClick={handleOnSubmit}>Submit</button>
        </form>

        <div className="flex-1">
          {playlistInfo && <PlaylistInfo playlistName={playlistInfo.playlistName} playlistDesc={playlistInfo.playlistDesc} songs={playlistInfo.songs}/>}
          {error && <p>Error</p>}
        </div>
      </div>
      
      {/*<div>
        {playlistFetched && <div>
          <p>Login and convert to Youtube</p>
          <button onClick={() => {newAuth()}} className="w bg-red-500 px-3 py-2 rounded-2xl">New Auth</button>
        </div>}
        </div>*/}
    </main>
  );
}
