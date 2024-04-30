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


export default function Home() {

  const [url, setUrl] = useState("");
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo | null>(null);

  const [playlistFetched, setPlayListFetched] = useState(false);
  const [error, setError] = useState(false);

  const [playlist_name, setPlaylistName] = useState("");
  const [playlist_desc, setPlaylistDesc] = useState("");

  const [selectedMethod, setSelectedMethod] = useState("");

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
      <div className="flex flex-col bg-gradient-to-b from-black to-neutral-800 my-0 mx-0 items-start">
        <div>
          <div className="mx-5 sm:px-10 pt-8 sm:pt-10">
            <div className="text-[7vw] sm:text-[50px] font-medium mb-8 sm:my-10">Welcome to Spotisync!</div>
            <p className="mt-2 text-[16px] mb-5 sm:text-lg text-slate-700 dark:text-neutral-400">Spotysync is your ultimate tool for seamlessly converting Spotify playlists to your YouTube main account with just one click. Whether you're curating the perfect playlist for a road trip or sharing your music discoveries with friends, Spotysync makes the process fast, easy, and hassle-free.</p>
            <p className="mt-2 text-[16px] sm:text-lg text-slate-700 dark:text-neutral-400">Experience the convenience of Spotysync today and elevate your music streaming experience to a whole new level!</p>
          </div>
        </div>
        <div className="sm:px-10">
          <button className="rounded-lg text-[15px] px-4 py-2 my-8 mx-5 bg-amber-500 transition-colors duration-300 ease-in-out hover:bg-amber-600">Get Started</button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-[20px] sm:min-h-[100px]"></div>
      <div className="bg-neutral-950 min-h-[10px]"></div>

      <div className="bg-neutral-900">
        <div className="flex flex-col sm:flex-row mx-10 my-10 px-5 rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-950">
          <div className="flex flex-col my-4 sm:min-w-[40%]">
            <button onClick={() => {setSelectedMethod("Spotify")}} className="bg-green-500 rounded-lg my-2 py-3 hover:bg-green-600 duration-300">Login with Spotify</button>
            <button onClick={() => {setSelectedMethod("URL")}} className={`bg-amber-500 rounded-lg my-2 py-3 hover:bg-amber-600 duration-300 ${selectedMethod == "URL" ? 'hidden' : ''}`}>Enter URL</button>

            {(selectedMethod == "URL") && 
            <form action="" className={`flex flex-row rounded-[20px] items-center justify-between ${selectedMethod == "URL" ? '' : 'hidden'}`}>
                <input className=" text-neutral-200 sm:min-w-[70%] px-2 py-2 mr-3 my-1 rounded-md w-full  bg-neutral-800 border-amber-500 border-2" value={url} type="text" onChange={(e) => setUrl(e.target.value)}/>
                <button className="flex-1 bg-amber-500 px-5 py-2 my-3 rounded-xl hover:bg-amber-600 duration-300" onClick={handleOnSubmit}>Submit</button>
            </form>}

          </div>

          
          <div className="flex-1 sm:px-6 sm:py-6">
            {playlistInfo && <PlaylistInfo playlist_name={playlistInfo.playlist_name} playlist_desc={playlistInfo.playlist_desc} songs={playlistInfo.songs} playlist_icon_url={playlistInfo.playlist_icon_url} info={playlistInfo.info}/>}
            {error && <p>Error</p>}
            <div className={`flex justify-center items-center h-[100%] mb-5 ${!playlistInfo && !error ? '' : 'hidden'}`}>
              {
                <p className="text-center text-md text-amber-500">Login to your Spotify account<br/>Or enter a url and select your playlist</p>}
            </div>
          </div>
        </div>
        
        {/*<div>
          {playlistFetched && <div>
            <p>Login and convert to Youtube</p>
            <button onClick={() => {newAuth()}} className="w bg-red-500 px-3 py-2 rounded-2xl">New Auth</button>
          </div>}
          </div>*/}
      </div>
    </main>
  );
}
