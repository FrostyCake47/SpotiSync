from flask import Flask, request, jsonify, session
from flask_session import Session
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
app.secret_key = 'cmon dawg'
CORS(app, supports_credentials=True)

@app.route('/playlisturl', methods=['POST'])
def playlisturl():
    data = request.json  # Assuming data is sent as JSON
    url = data.get('data')
    try:
        playlist_name, playlist_desc, songs = spotifypy.main(url)
        session['playlist_name'] = playlist_name
        session['playlist_desc'] = playlist_desc
        session['songs'] = songs

        msg = {'playlistName':playlist_name, 'playlistDesc':playlist_desc, 'songs':songs}
        print("session: ", session["playlist_name"], file=stderr)

        return jsonify({'message': msg})
    
    except Exception as e:
        print(e)
        print("script closed")
        return jsonify({'message': 'Something happened. Try again ' + e})
    

@app.route('/getauthurl', methods=['POST'])
def getauthurl():
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

    #playlist_name = "pretty"
    #playlist_desc = "weow it works"
    #songs = ["The longest goodbye rosie darling", "if i dont like you lily williams", "young love - ada leaan"]

    playlist_name = session["playlist_name"]
    playlist_desc = session["playlist_desc"]
    songs = session["songs"]

    status, youtubeurl = youtubepy.main(playlist_name, playlist_desc, songs, credentials)
    if status == 0:
        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})
    


if __name__ == '__main__':
    app.run(debug=True)