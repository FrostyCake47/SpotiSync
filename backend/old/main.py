from flask import Flask, request, jsonify
from google_auth_oauthlib.flow import InstalledAppFlow
import json
from flask_cors import CORS
import spotifypy
import youtubepy


app = Flask(__name__)
CORS(app)

'''def main():
    try:
        playlist_name, playlist_desc, songs = spotifypy.main()
        print(f"Parsing successful. \nTotal songs: {len(songs)}")
        print()
        print(playlist_name, songs)

        youtubepy.main(playlist_name, playlist_desc, songs)
    except Exception as e:
        print(e)
        print("script closed")'''





@app.route('/api/playlisturl', methods=['POST'])
def playlisturl():
    url = request.json.get('data')
    try:
        playlist_name, playlist_desc, songs = spotifypy.main(url)
        msg = {'playlistName':playlist_name, 'playlistDesc':playlist_desc, 'songs':songs}

        return jsonify({'message': msg})
    
    except Exception as e:
        print(e)
        print("script closed")
        return jsonify({'message': 'Something happened. Try again ' + e})


@app.route('/api/signin', methods=['POST'])
def signin():
    id_token = request.json.get('idToken')
    playlistinfo = request.json.get('playlistInfo')

    # Exchange ID token for OAuth 2.0 credentials
    flow = InstalledAppFlow.from_client_secrets_file(
        'client_secrets.json',
        scopes=['https://www.googleapis.com/auth/youtube']
    )
    flow.fetch_token(id_token=id_token)

    # Get credentials from flow
    credentials = flow.credentials

    status, youtubeurl = youtubepy.main(playlistinfo.playlist_name, playlistinfo.playlist_desc, playlistinfo.songs)
    if status:
        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})

if __name__ == '__main__':
    app.run(debug=True)
