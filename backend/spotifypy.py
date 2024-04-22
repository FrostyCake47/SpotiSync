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

        user = results["items"][0]["added_by"]["external_urls"]["spotify"].split("/")[-1].split("?")[0]

        user_name = sp.user(user=user)["display_name"]

        print(f"Parsing songs from '{playlist_name['name']}' by {user_name}...")
        

        track_list = results["items"]
        songs = []

        while results['next']:
            results = sp.next(results)
            track_list.extend(results['items'])

        for track in track_list:
            song = track["track"]["name"] + " by " + track["track"]["artists"][0]["name"]
            songs.append(song)
        
        return playlist_name["name"], playlist_desc["description"], songs
    
    except Exception:        
        print("Invalid url or private playlist")

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
