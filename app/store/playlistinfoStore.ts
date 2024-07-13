import zustand from "zustand";
import {create} from "zustand";
import PlaylistInfo from "../model/playlistinfoInterface";

interface PlaylistInfoState{
    playlistInfo: PlaylistInfo | null;
    selectPlaylistInfo : (playlistInfo: PlaylistInfo) => void;
    removePlaylistInfo : () => void;
  }
  
  
const usePlaylistInfoStore = create<PlaylistInfoState>((set) => ({
    playlistInfo: null,
    selectPlaylistInfo: (playlistInfo: PlaylistInfo) => set((state) => ({playlistInfo : playlistInfo})),
    removePlaylistInfo : () => set((state) => ({playlistInfo: null}))
}))

export default usePlaylistInfoStore;