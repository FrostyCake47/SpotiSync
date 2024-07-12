from flask import Flask, request, jsonify, session
import logging
from flask_cors import CORS
from google_auth_oauthlib.flow import InstalledAppFlow
import spotifypy
import youtubepy
from sys import stderr


flow = InstalledAppFlow.from_client_secrets_file(
        'client_secrets.json',
        scopes=['https://www.googleapis.com/auth/youtube'],
        redirect_uri='http://localhost:5000/'
    )


app = Flask(__name__)
#CORS(app)

@app.route('/playlisturl', methods=['POST'])
def playlisturl():
    try:
        data = request.json  # Assuming data is sent as JSON
        url = data.get('data')
    
        playlist_name, playlist_desc, songs = spotifypy.main(url)
        msg = {'playlistName':playlist_name, 'playlistDesc':playlist_desc, 'songs':songs}

        return jsonify({'message': msg})
    
    except Exception as e:
        print(e)
        print("script closed")
        return jsonify({'message': 'Something happened. Try again ' + e})


@app.route('/getauthurl', methods=['POST'])
def getauthurl():
    playlistinfo = request.json.get('data')
    print(playlistinfo, file=stderr)
    session['playlistinfo'] = playlistinfo
    
    authorization_url, state = flow.authorization_url()
    return jsonify({"url":authorization_url})


@app.route('/', methods=['GET'])
def callback():
    code = request.args.get('code')
    print("got the code " + code, file=stderr)
    flow.fetch_token(code=code)
    credentials = flow.credentials
    print("Login successful!", file=stderr)
    # Continue with credentials handling

    status, youtubeurl = youtubepy.main(session['playlistinfo'].playlist_name, session['playlistinfo'].playlist_desc, session['playlistinfo'].songs, credentials)
    if status:
        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})



@app.route('/login', methods=['POST'])
def signin():
    id_token = request.json.get('idToken')
    playlistinfo = request.json.get('playlistInfo')

    print(id_token, file=stderr)
    
    #id_token = "4/0AeaYSHB3O0fL2mqo_ww53a6qeZo__5Gb5TBKkrG5SpR28_M2d4JgS_sLskvnVafO3_JgWw"
    #playlistinfo = {"playlist_name":"pretty playlist", "playlist_desc": "ayaya", "songs": ["if i dont like you Lily williams", "Young Love Ada LeAan"]}

    # Exchange ID token for OAuth 2.0 credentials

    auth_url, _ = flow.authorization_url(prompt='consent')

    print('Please go to this URL: {}'.format(auth_url))
    #flow.fetch_token(id_token=id_token)
    return jsonify({"message": id_token})
    # Get credentials from flow
    credentials = flow.credentials
    

    status, youtubeurl = youtubepy.main(playlistinfo.playlist_name, playlistinfo.playlist_desc, playlistinfo.songs, credentials)
    if status:
        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})

if __name__ == '__main__':
    app.run(debug=True)