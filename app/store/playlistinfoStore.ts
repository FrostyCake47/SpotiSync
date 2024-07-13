import zustand from "zustand";
import {create} from "zustand";
import {persist, PersistOptions } from "zustand/middleware";
import PlaylistInfo from "../model/playlistinfoInterface";

interface PlaylistInfoState{
    playlistInfo: PlaylistInfo | null;
    customSelect: boolean;
    selectedSongs: boolean[];
    
    selectPlaylistInfo : (playlistInfo: PlaylistInfo) => void;
    removePlaylistInfo : () => void;
 
    setSelectSongs : (selectedSongs: boolean[]) => void;
    setCustomSelect : (mode: boolean) => void;
  }
  
type MyPersist = (
    config: (set: any, get: any, api: any) => PlaylistInfoState,
    options: PersistOptions<PlaylistInfoState>
) => (set: any, get: any, api: any) => PlaylistInfoState;
  
const usePlaylistInfoStore = create<PlaylistInfoState>(
    (persist as MyPersist)(
        (set, get) => ({
            playlistInfo: null,
            selectedSongs: [],
            customSelect: false,

            selectPlaylistInfo: (playlistInfo: PlaylistInfo) => set(() => ({playlistInfo : playlistInfo})),
            removePlaylistInfo : () => set(() => ({playlistInfo: null})),
            setSelectSongs: (selectedSongs: boolean[]) => set(() => ({selectedSongs: selectedSongs})),
            setCustomSelect: (mode: boolean) => {
                if(mode === false) set(() => ({selectedSongs: []}));
                else {
                    let newSelectedSongs = [];
                    const playlistInfo: PlaylistInfo | null = get().playlistInfo;
                    if(playlistInfo) newSelectedSongs = new Array(playlistInfo.songs.length).fill(false);
                    set(() => ({selectedSongs: newSelectedSongs}));   
                }
                set(() => ({customSelect: mode}));
                console.log(`${get().customSelect} ${get().selectedSongs}`);
            },
        }),
        {
            name: 'playlistInfo-Storage'
        }
    )
)

export default usePlaylistInfoStore;