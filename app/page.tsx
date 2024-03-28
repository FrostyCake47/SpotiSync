'use client';
import { useState } from "react";
import TopWave from "./components/topwave";


export default function Home() {
  const [url, setUrl] = useState("");

  const handleOnSubmit = (event:any) => {
    event.preventDefault();
    sendPlaylistUrl(url);
  }

  const sendPlaylistUrl = async (url: String) => {
    try{
      const response = await fetch('http://localhost:5000/api/playlisturl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:url})
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col items-center h-screen">
      <div className="flex py-5 px-5 my-10">Spoti2Youtube</div>
        <form action="" className="flex flex-col bg-neutral-900 px-20 py-10 rounded-[20px] items-center">
          <label htmlFor="">Enter a playlist URL</label>
          <input className="text-black" value={url} type="text" onChange={(e) => setUrl(e.target.value)}/>
          <button className="flex bg-green-600 px-5 py-2 my-2  rounded-xl" onClick={handleOnSubmit}>Submit</button>
        </form>
    </main>
  );
}
