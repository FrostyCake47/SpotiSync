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


'''@app.route('/api/convert', method=['POST'])
def signin():
    credentials = request.json.get('data')
    youtubepy.main(playlist_name, playlist_desc, songs)'''

if __name__ == '__main__':
    app.run(debug=True)
