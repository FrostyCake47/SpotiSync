from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
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
app.config.from_object(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///users.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


app.config['SESSION_TYPE'] = 'filesystem'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)
Session(app)
db = SQLAlchemy(app)



CORS(app, resources={ r'/*': {'origins': ['http://localhost:3000', 'https://spotisync-frost.vercel.app']}}, supports_credentials=True)
#CORS(app, resources={ r'/*': {'origins': 'http://localhost:3000'}}, supports_credentials=True)


'''
@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response
'''

class History(db.Model):
    _id = db.Column("id", db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    playlist_name = db.Column(db.String(100))
    playlist_author = db.Column(db.String(100))
    no_songs = db.Column(db.Integer)
    spotify_url = db.Column(db.String(100))
    youtube_url = db.Column(db.String(100))
    playlist_icon = db.Column(db.String(100))

    def __init__(self, email, playlist_name, playlist_author, no_songs, spotify_url, youtube_url, playlist_icon):
        self.email = email
        self.playlist_name = playlist_name
        self.playlist_author = playlist_author
        self.no_songs = no_songs
        self.spotify_url = spotify_url
        self.youtube_url = youtube_url
        self.playlist_icon = playlist_icon

    def printemail(self):
        print(self.email, file=stderr)



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
        session['url'] = url

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
    #if session.get('isLoggedin') == None:
    #   session['isLoggedin'] = False
    isLoggedin = False
    session['isLoggedin'] = isLoggedin
    return jsonify({"url":authorization_url, "status":session['isLoggedin']})


@app.route('/getplaylistinfo', methods=['POST'])
@cross_origin(supports_credentials=True)
def getplaylistinfo():
    print("acessing session items in /getplaylistinfo")
    print(session.keys(), session.values(), file=stderr)
    
    playlistinfo = {'playlist_name':session['playlist_name'], "playlist_desc":session['playlist_desc'], 'playlist_icon_url': session['playlist_icon_url'], 'info':session['info'], "songs":session["songs"],}
    return jsonify({"playlistinfo":playlistinfo})


@app.route('/', methods=['GET'])
@cross_origin(supports_credentials=True)
def callback():
    try:
        print("acessing session items in /")
        print(session.keys(), session.values(), file=stderr)
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
        session.modified = True

        return f'<script>window.location.href = "{redirect_url}/convert";</script>'
    except Exception as e:
        print(f"error at credential: {e}")
        session.modified = True
        return f'<script>window.location.href = "{redirect_url}/";</script>'


@app.route('/convert', methods=['POST'])
@cross_origin(supports_credentials=True)
def convert():
    data = request.json  # Assuming data is sent as JSON

    print("acessing session items in /convert")
    print(session.keys(), session.values(), file=stderr)

    playlist_name = session["playlist_name"]
    playlist_desc = session["playlist_desc"]
    oldsongs = session["songs"]
    credentials =  session['credentials']
    info = session['info']

    selectedSongs = data.get('selectedSongs')
    user = data.get('user')
    print("user", user, file=stderr)

    songs = []

    if(selectedSongs != None):
        for index, item in enumerate(selectedSongs):
            if item :
                songs.append(oldsongs[index])
    else:
        songs = oldsongs

    print("conversion songs")
    print(songs, file=stderr)

    

    status, youtubeurl = youtubepy.main(playlist_name, playlist_desc, songs, credentials)
    session['youtubeurl'] = youtubeurl

    if status == 0:
        usr = History(user['email'], playlist_name, info['user_name'], len(songs), session['url'], youtubeurl, session['playlist_icon_url'])
        db.session.add(usr)
        db.session.commit()
        print("added entry to db", file=stderr)

        return jsonify({'message': {'status':status, 'youtubeurl':youtubeurl}})
    else:
        return jsonify({'message': {'status':status, 'youtubeurl':""}})
    
    return jsonify({'message':user})

@app.route('/history', methods=['POST'])
@cross_origin(supports_credentials=True)
def history():
    try:
        data = request.json  # Assuming data is sent as JSON
        email = data.get('email')
        print(email, file=stderr)

        historyList = []
        result = History.query.filter_by(email=email).all()
        for i in result:
           historyList.append({'email': i.email, 'playlist_name': i.playlist_name, 'playlist_author': i.playlist_author, 'no_songs': i.no_songs, 'spotify_url': i.spotify_url, 'youtube_url': i.youtube_url, 'playlist_icon':i.playlist_icon})
        
        return jsonify({'message':True, 'historyList':historyList})
    
    except Exception:
        return jsonify({'message':False})


with app.app_context():
    db.create_all()
    

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    