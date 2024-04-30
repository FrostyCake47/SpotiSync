from unittest import result
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os 


def getTrackNames(sp, playlist_link):
    
    if not playlist_link:
        playlist_link = 'https://open.spotify.com/playlist/54VkrE3MGN1CS01zdntNYl?si=6918db21ae00485f'

    try:
        playlist_URI = playlist_link.split("/")[-1].split("?")[0]

        results = sp.playlist_tracks(playlist_URI)
        playlist_name = sp.user_playlist(user=None, playlist_id=playlist_URI, fields="name")
        playlist_desc = sp.user_playlist(user=None, playlist_id=playlist_URI, fields="description")

        playlist_info = sp.playlist(playlist_URI, fields="name, description, images, tracks.items.track.duration_ms")
        playlist_icon_url = playlist_info["images"][0]["url"] if playlist_info["images"] else None

        user = results["items"][0]["added_by"]["external_urls"]["spotify"].split("/")[-1].split("?")[0]

        #playlist info
        user_name = sp.user(user=user)["display_name"]
        num_songs = len(playlist_info["tracks"]["items"])
        print(playlist_info["tracks"]["items"])

        #calc playlist duration
        total_duration_ms = sum(track['track']["duration_ms"] for track in playlist_info["tracks"]["items"])
        total_duration_sec = total_duration_ms / 1000
        total_duration_min = int(total_duration_sec // 60)
        total_duration_sec = int(total_duration_sec % 60)

        print(f"Parsing songs from '{playlist_name['name']}' by {user_name}...")
        
        info = {'user_name':user_name, 'num_songs':num_songs, 'duration':[total_duration_min, total_duration_sec]}

        track_list = results["items"]
        songs = []

        while results['next']:
            results = sp.next(results)
            track_list.extend(results['items'])

        for track in track_list:
            #song = track["track"]["name"] + " by " + track["track"]["artists"][0]["name"]

            song_name = track["track"]["name"]
            artist_name = track["track"]["artists"][0]["name"]
            song_icon_url = track["track"]["album"]["images"][0]["url"] if track["track"]["album"]["images"] else None
            album_name = track["track"]["album"]["name"]
            
            duration_ms = track['track']["duration_ms"]
            duration_sec = duration_ms / 1000
            duration_min = int(duration_sec // 60)
            duration_sec = int(duration_sec % 60)
            
            songs.append({"song_name": song_name, "artist_name": artist_name, 'album_name':album_name , "song_icon_url": song_icon_url, "duration":[duration_min, duration_sec]})
        
        return playlist_name["name"], playlist_desc["description"], songs, playlist_icon_url, info
    
    except Exception as e:        
        print(f"Invalid url or private playlist: {e}")

def main(playlist_url=None):
    SPOTIPY_CLIENT_ID = os.environ["SPOTIPY_CLIENT_ID"]
    SPOTIPY_CLIENT_SECRET= os.environ["SPOTIPY_CLIENT_SECRET"]
    
    CLIENT_CREDENTIALS_MANAGER = SpotifyClientCredentials(
        client_id=SPOTIPY_CLIENT_ID, client_secret=SPOTIPY_CLIENT_SECRET
    )
    sp = spotipy.Spotify(client_credentials_manager=CLIENT_CREDENTIALS_MANAGER)

    if playlist_url == None : playlist_url = input("Enter Spotify playlist url: ")
    
    if playlist_url == "":
        playlist_url = None

    return getTrackNames(sp, playlist_url)
