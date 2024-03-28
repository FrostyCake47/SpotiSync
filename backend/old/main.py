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
def signin():
    url = request.json.get('data')
    try:
        playlist_name, playlist_desc, songs = spotifypy.main(url)
        msg = 'Play list received: ' + playlist_name + '\nPlaylist desc: ' + playlist_desc + "\nSongs:\n"
        for song in songs:
            msg += song + '\n'

        return jsonify({'message': msg})
    
    except Exception as e:
        print(e)
        print("script closed")
        return jsonify({'message': 'Something happened. Try again ' + e})

    

if __name__ == '__main__':
    app.run(debug=True)
