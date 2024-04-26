'use client';
import { useState } from "react";
import TopWave from "./components/topwave";
import PlaylistInfo from "./components/playlistinfo";
import axios from "axios";
import Navbar from "./components/navbar";



export default function Home() {

  const [url, setUrl] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [songs, setSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});

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
      setPlaylistName(result.data.message.playlistName);
      setPlaylistDesc(result.data.message.playlistDesc);
      setSongs(result.data.message.songs);

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
    <main className="flex flex-col items-center h-screen">
      <Navbar/>
      <div className="flex py-5 px-5 my-10 text-[30px]">Spoti2Youtube</div>
        <form action="" className="flex flex-col bg-neutral-900 px-20 py-10 rounded-[20px] items-center">
          <label htmlFor="">Enter a playlist URL</label>
          <input className="text-black rounded-md" value={url} type="text" onChange={(e) => setUrl(e.target.value)}/>
          <button className="flex bg-green-600 px-5 py-2 my-2  rounded-xl" onClick={handleOnSubmit}>Submit</button>
        </form>
        <div>
          {playlistFetched && <PlaylistInfo playlistName={playlistName} playlistDesc={playlistDesc} songs={songs}/>}
          {error && <p>Error</p>}
        </div>
        <div>
          {playlistFetched && <div>
            <p>Login and convert to Youtube</p>
            <button onClick={() => {newAuth()}} className="w bg-red-500 px-3 py-2 rounded-2xl">New Auth</button>
          </div>}
        </div>
    </main>
  );
}
