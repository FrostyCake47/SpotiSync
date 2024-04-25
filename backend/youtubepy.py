from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import os
import pickle


def make_playlist(youtube, playlist_name, playlist_desc):
    request = youtube.playlists().insert(
        part="snippet,status",
        body={
          "snippet": {
            "title": playlist_name,
            "description": playlist_desc
          },
          "status": {
            "privacyStatus": "public"
          }
        }
    )
    response = request.execute()
    return response["id"]


def search_song(youtube, track):
    search_request = youtube.search().list(
            part= "snippet",
            maxResults= 1,
            q= track,
            type= "video"
        )

    search_response = search_request.execute()

    song_id = search_response["items"][0]["id"]["videoId"]
    song_name = search_response["items"][0]["snippet"]["title"]
    return song_id, song_name

def add_song(youtube, playlist_id, song_id, song_name):
    request = youtube.playlistItems().insert(
        part="snippet",
        body={
          "snippet": {
            "playlistId": playlist_id,
            "resourceId": {
              "kind": "youtube#video",
              "videoId": song_id
            }
          }
        }
    )
    response = request.execute()


def main(playlist_name, playlist_desc, songs, credentials = None):
  try:
    youtube = build("youtube", "v3", credentials=credentials)

    playlist_id = make_playlist(youtube, playlist_name, playlist_desc)
    print("\nPlaylist created...\n")

    count = 1
    print("Adding songs...")
    for track in songs:
      song_id, song_name = search_song(youtube, track)
      add_song(youtube, playlist_id, song_id, song_name)
      print(f"{count} : {song_name}" )
      count += 1

    youtube_url = "https://www.youtube.com/playlist?list=" + playlist_id
    print("\neverything successfully added.")
    print(f"playlist URL: {youtube_url}")
    return 0, youtube_url
  
  except Exception as e:
    return 1, ""
    
  
    