'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface PlaylistInfo {
    playlistName: string;
    playlistDesc: string;
    youtubeurl: string;
    songs: string[];
}


const Convert = () => {
    const [playlistinfo, setPlaylistinfo] = useState<PlaylistInfo | null>(null);

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
                <div>
                    <div>{playlistinfo.playlistName}</div>
                    <div>{playlistinfo.youtubeurl}</div>
                    <div>{playlistinfo.playlistDesc}</div>
                    <div>{playlistinfo.songs.map((song) => {
                        return <div>{song}</div>
                    })}</div>
                </div>
            )}
        </div>
    )
}

export default Convert