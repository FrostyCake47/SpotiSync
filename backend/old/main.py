import spotifypy
import youtubepy

def main():
    try:
        playlist_name, playlist_desc, songs = spotifypy.main()
        print(f"Parsing successful. \nTotal songs: {len(songs)}")
        print()
        print(playlist_name, songs)

        youtubepy.main(playlist_name, playlist_desc, songs)
    except Exception as e:
        print(e)
        print("script closed")

if __name__ == "__main__":
    main()