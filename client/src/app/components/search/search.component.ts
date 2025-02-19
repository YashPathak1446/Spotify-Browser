import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SpotifyService],
  standalone: false
})
export class SearchComponent implements OnInit {
  searchString: string;
  searchCategory: string = 'artist';
  searchCategories: string[] = ['artist', 'album', 'track'];
  resources: ResourceData[];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() { }

  search(): void {
    //TODO: call search function in spotifyService and parse response
    if (this.searchString) {
      this.spotifyService.searchFor(this.searchCategory, this.searchString)
        .then(searchResults => {
          this.resources = searchResults;
        })
        .catch(error => {
          console.error("Error during search:", error);
        })
    }
  }

  // Method to handle Enter Key Press:
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      // call search method upon enter key press
      this.search();
    }
  }
}
