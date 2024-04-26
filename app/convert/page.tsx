'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface PlaylistInfo {
    playlist_name: string;
    playlist_desc: string;
    youtube_url: string;
    playlist_icon_url: string;
    songs: [{
      song_name: string;
      artist_name: string;
      song_icon_url: string;
      song_info: string
    }];
  }

const Convert = () => {
    const [playlistinfo, setPlaylistinfo] = useState<PlaylistInfo | null>(null);
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
                setPlaylistinfo(result.data.playlistinfo);
              })();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            <div>Convert</div>
            {playlistinfo && (
                <div className='flex flex-col'>
                    <div>{playlistinfo.playlist_name}</div>
                    <div>{playlistinfo.playlist_desc}</div>
                    <div className='flex flex-col'>{playlistinfo.songs.map((song) => {
                        return <div>{song.song_name}</div>
                    })}</div>

                    <button onClick={() => {convertToYoutube()}}>Convert</button>
                    {youtubeurl && <div>{youtubeurl}</div>}
                </div>
            )}
        </div>
    )
}

export default Convert