'use client';
import './types';
import { useEffect, useState } from "react";
import PlaylistInfoBlock from "./components/playlistinfo";
import axios from "axios";
import Navbar from "./components/navbar";

import { signIn, signOut, useSession } from 'next-auth/react';

import { FaSpotify } from "react-icons/fa";
import { PlaylistCard } from './components/playlistCard';
import { FaYoutube } from "react-icons/fa6";
import Footer from './components/footer';
import History from './components/history';
import Playlist from './model/playlist';
import PlaylistInfo from './model/playlistinfoInterface';
import usePlaylistInfoStore from './store/playlistinfoStore';
import HistoryData from './model/historyData';


export default function Home() {
  const { data: session } = useSession();

  const [url, setUrl] = useState("");
  
  const playlistInfo = usePlaylistInfoStore((state) => state.playlistInfo);
  const setPlaylistInfo = usePlaylistInfoStore((state) => state.selectPlaylistInfo);
  const removePlaylistInfo = usePlaylistInfoStore((state) => state.removePlaylistInfo);

  const [playlistFetched, setPlayListFetched] = useState(false);
  const [error, setError] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState("");
  const [playlistList, setPlaylistList] = useState<Playlist[] | null>(null);

  const setCustomSelect = usePlaylistInfoStore((state) => state.setCustomSelect);
  const [historyDataList, SetHistoryDataList] = useState<HistoryData[]|null>(null)

  const handleOnSubmit = (event:any) => {
    event.preventDefault();
    sendPlaylistNew(url);
  }

  const handleSpotifyLogin = async (event:any) => {
    event.preventDefault();
    setSelectedMethod("Spotify");

    if(!session){
      await signIn('spotify');
    } 
  }

  const sendPlaylistNew = async (url:String) => {
    try {
      console.log("sending palylist")
      //const result = await axios.post('https://FrostyCake47.pythonanywhere.com/playlisturl', {data:url}, { withCredentials: true });
      const result = await axios.post('http://localhost:5000/playlisturl', {data:url}, { withCredentials: true });
      console.log('Response:', result.data);

      
      setPlaylistInfo(result.data.message);
      setCustomSelect(false);

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
        //const result = await axios.post('https://FrostyCake47.pythonanywhere.com/getauthurl', {data:playlistInfo}, { withCredentials: true });
        const result = await axios.post('http://localhost:5000/getauthurl', {data:playlistInfo}, { withCredentials: true });
        if(result.data.status) window.location.href = 'http://localhost:5000/convert'
        else {
          const authorization_url = result.data.url;
          window.location.href = authorization_url;
        }

      } catch (err) {
        console.log("new auth error " + err)
      }
  }

  const spotifyAuthPlaylist = async () => {
    try{
      if(session){
        const accessToken = session?.access_token;
        console.log(accessToken);
        const result = await axios.get('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(result.data);
        return result.data.items;
      }
    } catch (err) {
      console.log("Spotify login error: " + err);
      setPlaylistList(null);
      return "error";
    }
  }

  const fetchHistory = async () => {
    try{
      if(session){
        const result = await axios.post('http://localhost:5000/history', {'email':session.user?.email}, { withCredentials: true });
        console.log(result.data['historyList']);
        return result.data['historyList'];
      }
    } catch (err) {
      console.log(`error in fetchHistory: ${err}`)
      return null;
    }

  }


  useEffect(() => {
    if(session){
      removePlaylistInfo();
      (async () => {       
          const newplaylistList = await spotifyAuthPlaylist();
          if(newplaylistList !== "error"){
            setPlaylistList(newplaylistList);
            console.log("setPlaylistList ");
          }

          const newHistoryDataList = await fetchHistory();
          SetHistoryDataList(newHistoryDataList);

      })();
    }
  }, [session])

  
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
          <div className="rounded-lg text-[15px] px-4 py-2 my-8 mx-5 bg-amber-500 transition-colors duration-300 ease-in-out hover:bg-amber-600">
            <a  href='#playlistblock'>Get Started</a>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-[20px] sm:min-h-[100px]"></div>
      <div className="bg-neutral-950 min-h-[10px]"></div>

      <div className="bg-neutral-900">
        <div id='playlistblock' className="flex flex-col md:flex-row mx-0 sm:mx-10 pb-6 sm:my-10 px-5 sm:rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-950">
          <div className="flex flex-col my-4 sm:min-w-[40%]">
            {!session && <button onClick={handleSpotifyLogin} className="bg-green-500 rounded-lg my-2 py-3 flex items-center justify-center hover:bg-green-600 duration-300">
              <FaSpotify size={30}/>
              <p className='px-3'>Login to Spotify</p>
            </button>}
            {session && <button onClick={() => signOut()} className="bg-green-500 rounded-lg my-2 py-3 flex items-center justify-center hover:bg-green-600 duration-300">
              <FaSpotify size={30}/>

              <p className='px-3'>Logout of Spotify</p>  
            </button>}
            <button onClick={() => {setSelectedMethod("URL")}} className={`bg-amber-500 rounded-lg my-2 py-3 hover:bg-amber-600 duration-300 ${selectedMethod == "URL" ? 'hidden' : ''}`}>Enter URL</button>

            {(selectedMethod == "URL") && 
            <form action="" className={`flex flex-row rounded-[20px] items-center justify-between ${selectedMethod == "URL" ? '' : 'hidden'}`}>
                <input className=" text-neutral-200 sm:min-w-[70%] px-2 py-2 mr-3 my-1 rounded-md w-full  bg-neutral-800 border-amber-500 border-2" value={url} type="text" onChange={(e) => setUrl(e.target.value)}/>
                <button className="flex-1 bg-amber-500 px-5 py-2 my-3 rounded-xl hover:bg-amber-600 duration-300" onClick={handleOnSubmit}>Submit</button>
            </form>}
            <div className={`flex justify-center ${session ? 'item-start my-4' : 'items-center'} h-[100%]`}>
              {!session && <p className={`hidden text-center text-md text-amber-500 ${playlistInfo ? 'sm:block' : 'hidden'}`}>Login with your spotify to<br/>directly access your personal playlists</p>}
              {session && playlistList && <PlaylistCard playlistList={playlistList} sendPlaylistNew={sendPlaylistNew}/>}
            </div>
          </div>

          <div className="flex-1 sm:px-6 sm:py-6">
            {playlistInfo && <PlaylistInfoBlock playlist_name={playlistInfo.playlist_name} playlist_desc={playlistInfo.playlist_desc} songs={playlistInfo.songs} playlist_icon_url={playlistInfo.playlist_icon_url} info={playlistInfo.info} /*selectedSongsIndex={selectedSongsIndex} selectSong={selectSong} selectDeselectAll={selectDeselectAll}*//>}
            {error && <p>Error</p>}
            <div className={`flex justify-center items-center h-[100%] mb-5 ${!playlistInfo && !error ? '' : 'hidden'}`}>
              {
                <p className={`text-center text-md text-amber-500`}>Login to your Spotify account<br/>Or enter a url and select your playlist</p>}
            </div>

            {playlistInfo && <div className='flex flex-1 py-5 my-1 items-center justify-end'>
              <p>Login and convert to Youtube</p>
              <button onClick={() => {newAuth()}} className="flex justify-center items-center bg-red-500 hover:bg-red-600 duration-300 px-3 py-2 mx-5 rounded-2xl">
                <FaYoutube size={30}/>
                <p className='px-3'>Youtube Login</p>
              </button>
            </div>}
          </div>
        </div>

        <div className='flex-1 w-[100%] bg-neutral-900 sm:bg-neutral-950 min-h-3'></div>
        <div className='py-14 bg-gradient-to-b from-neutral-900 to-neutral-950'>
          <History historyDataList={historyDataList}/>
        </div>
      </div>


      <div className='flex-1 w-[100%] bg-neutral-900 sm:bg-neutral-950 min-h-1'></div>
      <div id='contacts'>
        <Footer/>
      </div>
    </main>
  );
}
