export default interface Playlist{
  name:string;
  external_urls:{
    spotify:string;
  };
  href:string;
  images: [{
    height: number | null;
    url: string;
    width: number | null;
  }];
  owner: {
    display_name: string;
  };
  tracks: {
    total: number;
  };
}