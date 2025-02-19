import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  expressBaseUrl: string = 'http://localhost:8888';

  constructor(private http: HttpClient) { }

  private sendRequestToExpress(endpoint: string): Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //Specifically, update the URI according to the base URL for express and the endpoint.
    // var uri:string = "";
    // Constructs a full URL using the base Express server URL (http://localhost:8888) and requested endpoint
    // This sends request to Express backend

    const uri: string = `${this.expressBaseUrl}${endpoint}`;


    //firstValueFrom generates a Promise for whatever is returned first from the GET request.
    //You shouldn't need to update this part.
    return firstValueFrom(this.http.get(uri)).then((response) => {
      return response;
    }, (err) => {
      return err;
    });
  }

  aboutMe(): Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
      /*
      Note, this is what the profile looks like:
      export class ProfileData {
        name:string;
        spotifyProfile:string;
        imageURL:string;

        constructor(objectModel:{}) {
          this.name = objectModel['display_name'];
          this.spotifyProfile = objectModel['external_urls']['spotify'];
          if(objectModel['images'].length > 0) {
            this.imageURL = objectModel['images'][0].url;
          } else {
            this.imageURL = '../../assets/unknown.jpg';
          }
        }
      */
    });
  }

  searchFor(category: string, resource: string): Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.

    // First encode the resource correctly to use safely in a URL
    const resourceEncoded = encodeURIComponent(resource);

    // Call the sendRequestToExpress function passing in /search/:category/:resource => ex: /search/artist/Eminem
    // using .map function from js: https://www.w3schools.com/jsref/jsref_map.asp
    return this.sendRequestToExpress(`/search/${category}/${resourceEncoded}`).then((data) => {
      // If data isn’t an array, adjust the code to extract the array from the response.
      if (!Array.isArray(data)) {
        // For example, if the API returns { results: [...] } then:
        console.log('Raw search data:', data);
      }
      // search for artist
      if (category === "artist") {
        return data.artists.items.map((artist: any) => new ArtistData(artist));
      }
      // search for album
      else if (category === "album") {
        return data.albums.items.map((album: any) => new AlbumData(album));
      }
      // search for track
      else if (category === "track") {
        console.log("Tracks response structure:", data.tracks); // Debugging track structure
        return data.tracks.items.map((track: any) => new TrackData(track));
      }
      return [];
    });
  }

  getArtist(artistId: string): Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    const artistIdEncoded = encodeURIComponent(artistId);
    // call sendRequestToExpress for artist based on encodedId, convert response to ArtistData object
    return this.sendRequestToExpress(`/artist/${artistIdEncoded}`).then((data) => new ArtistData(data));
  }

  getTopTracksForArtist(artistId: string): Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    const artistIdEncoded = encodeURIComponent(artistId);
    // Retrieve the top tracks of said artist, convert response to array TrackData
    return this.sendRequestToExpress(`/artist-top-tracks/${artistIdEncoded}`).then((data) => {
      if (data && data.tracks) {
        return data.tracks.map((track: any) => new TrackData(track));
      }
      console.log("data struct:", data);
      return [];
    });
  }

  getAlbumsForArtist(artistId: string): Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    const artistIdEncoded = encodeURIComponent(artistId);
    // Call sendRequestToExpress based on encoded id, then convert response to AlbumData array.
    return this.sendRequestToExpress(`/artist-albums/${artistIdEncoded}`).then((data) => {
      // Add proper data extraction
      if (data && data.items) {
        return data.items.map((album: any) => new AlbumData(album));
      }
      return [];
    });
  }

  getAlbum(albumId: string): Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    const albumIdEncoded = encodeURIComponent(albumId);
    // call sendRequestToExpress to get response for encoded album, 
    // then convert response to Album Data array to show albums
    return this.sendRequestToExpress(`album/${albumIdEncoded}`).then((data) => new AlbumData(data));
  }

  getTracksForAlbum(albumId: string): Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    const albumIdEncoded = encodeURIComponent(albumId);
    // call sendRequestToExpress to get response for encoded album
    // convert response to track data array to show top tracks in album
    return this.sendRequestToExpress(`album/${albumIdEncoded}/top-tracks`).then((data) =>
      data.map((track: any) => new TrackData(track))
    );
  }

  getTrack(trackId: string): Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    const trackIdEncoded = encodeURIComponent(trackId);
    // call sendRequestToExpress to get response for encoded trackId
    // convert response to array TrackData to show tracks
    return this.sendRequestToExpress(`tracks/${trackIdEncoded}`).then((data) => new TrackData(data));
  }
}