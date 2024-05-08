from flask import Flask, request, jsonify, session
from flask_session import Session
import logging
from flask_cors import CORS, cross_origin
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
SESSION_TYPE = 'filesystem'
app.config.from_object(__name__)
Session(app)

#CORS(app, resources={ r'/*': {'origins': ['http://localhost:3000', 'https://spotisync-frost.vercel.app']}}, supports_credentials=True)
CORS(app, resources={ r'/*': {'origins': 'http://localhost:3000'}}, supports_credentials=True)
'''
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response
'''


@app.route('/playlisturl', methods=['POST'])
@cross_origin(supports_credentials=True)
def playlisturl():
    data = request.json  # Assuming data is sent as JSON
    url = data.get('data')
    try:
        playlist_name, playlist_desc, songs, playlist_icon_url, info = spotifypy.main(url)
        session['playlist_name'] = playlist_name
        session['playlist_desc'] = playlist_desc
        session['songs'] = songs
        session['playlist_icon_url'] = playlist_icon_url
        session['info'] = info

        print("new items to session")
        print(session.keys(), session.values(), file=stderr)

        playlistinfo = {'playlist_name':playlist_name, 'playlist_desc':playlist_desc, 'songs':songs, 'playlist_icon_url': playlist_icon_url, 'info':info}
        print("session: ", session["playlist_name"], file=stderr)

        return jsonify({'message': playlistinfo})
    
    except Exception as e:
        print(e)
        print("script closed")
        return jsonify({'message': f'Something happened. Try again {e}'})
    

@app.route('/getauthurl', methods=['POST'])
@cross_origin(supports_credentials=True)
def getauthurl():
    authorization_url, state = flow.authorization_url()
    isLoggedin = False
    session['isLoggedin'] = isLoggedin
    return jsonify({"url":authorization_url})


@app.route('/getplaylistinfo', methods=['POST'])
@cross_origin(supports_credentials=True)
def getplaylistinfo():
    print("acessing session items")
    print(session.keys(), session.values(), file=stderr)
    
    playlistinfo = {'playlist_name':session['playlist_name'], "playlist_desc":session['playlist_desc'], 'playlist_icon_url': session['playlist_icon_url'], 'info':session['info'], "songs":session["songs"],}
    return jsonify({"playlistinfo":playlistinfo})


@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def callback():
    try:
        print(request.headers.get('host'))
        #redirect_url = request.headers.get('host')  # Replace 'your-route' with the actual route in your React app
        #redirect_url = 'https://spotisync-frost.vercel.app'
        redirect_url = 'http://localhost:3000'
        
        code = request.args.get('code')
        if(session['isLoggedin']):
            print("already logged in", file=stderr)
            return f'<script>window.location.href = "{redirect_url}/convert";</script>'
        
        print("got the code " + code, file=stderr)
        flow.fetch_token(code=code)
        credentials = flow.credentials
        print("Login successful!", file=stderr)
        session['isLoggedin'] = True
        session['credentials'] = credentials

        #playlist_name = "pretty"
        #playlist_desc = "weow it works"
        #songs = ["The longest goodbye rosie darling", "if i dont like you lily williams", "young love - ada leaan"]

        return f'<script>window.location.href = "{redirect_url}/convert";</script>'
    except Exception as e:
        print(f"error at credential: {e}")
        return f'<script>window.location.href = "{redirect_url}/";</script>'


@app.route('/convert', methods=['POST'])
@cross_origin(supports_credentials=True)
def convert():
    playlist_name = session["playlist_name"]
    playlist_desc = session["playlist_desc"]
    songs = session["songs"]
    credentials =  session['credentials']

    print("conversion songs")
    print(songs, file=stderr)

    status, youtubeurl = youtubepy.main(playlist_name, playlist_desc, songs, credentials)
    session['youtubeurl'] = youtubeurl

    if status == 0:
        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})


if __name__ == '__main__':
    app.run(debug=True)