import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css'],
  standalone: false
})
export class ArtistPageComponent implements OnInit {
  artistId: string;
  artist: ArtistData;
  relatedArtists: ArtistData[];
  topTracks: TrackData[];
  albums: AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    // load image
    this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, top tracks for the artist, and the artist's albums
    if (this.artistId) {
      // fetch artist details
      this.spotifyService.getArtist(this.artistId).then(artistData => {
        this.artist = artistData;
      });

      // Fetch top tracks
      this.spotifyService.getTopTracksForArtist(this.artistId).then(topTracks => {
        this.topTracks = topTracks;
      });

      // Fetch albums
      this.spotifyService.getAlbumsForArtist(this.artistId).then(albums => {
        this.albums = albums;
      });
    };
  }
}