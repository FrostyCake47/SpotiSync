import {create} from "zustand";


export interface PlaylistInfo {
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

interface PlaylistInfoState{
  playlistInfo: PlaylistInfo;
  selectPlaylistInfo : (playlistInfo: PlaylistInfo) => void;
}


const usePlaylistInfoStore = create<PlaylistInfoState>((set) => ({
  playlistInfo: <PlaylistInfo>({}),
  selectPlaylistInfo: (playlistInfo: PlaylistInfo) => set((state) => ({playlistInfo : playlistInfo}))
}))

