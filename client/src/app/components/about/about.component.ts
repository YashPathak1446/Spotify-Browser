import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false
})
export class AboutComponent implements OnInit {
  name: string = null;
  profile_pic: string = "assets/unknown.jpg";
  profile_link: string = null;


  //TODO: inject the Spotify service
  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() { }

  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
 In that function, update the name, profile_pic, and profile_link fields */

  // Function: loadUserInfo, that is called upon clicking "Load Info" button.
  // It fetches the profile information from Spotify and updates the component's fields.
  loadUserInfo(): void {
    // Calling aboutMe function from spotifyService so that it loads the ProfileData on login.
    // This should include name, a url for an image, and a spotifyURL.
    this.spotifyService.aboutMe().then((profile) => {
      // Assume that profile contains properties like:
      // name, image URL, and spotifyUrl
      this.name = profile.name;
      this.profile_pic = profile.imageURL || "assets/unknown.jpeg";
      this.profile_link = profile.spotifyProfile;
    })
      .catch((error) => {
        console.error("Error loading user info:", error);
      });
  }
}
