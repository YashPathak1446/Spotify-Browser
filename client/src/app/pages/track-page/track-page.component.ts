import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css'],
  standalone: false
})
export class TrackPageComponent implements OnInit {
  trackId: string;
  track: TrackData;
  // Include album as well as artists
  album: AlbumData;
  artists: ArtistData[];
  duration: number;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the track data
    // Fetch track details
    if (this.trackId) {
      this.spotifyService.getTrack(this.trackId).then(track => {
        this.track = track;
        // Fetch album, artists and duration from trackData.ts
        this.album = track.album;
        this.artists = track.artists;
        this.duration = track.duration_ms;
      });
    };
  }

  // Included a function to format the duration from milli seconds to Minute:seconds portrayal
  formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
