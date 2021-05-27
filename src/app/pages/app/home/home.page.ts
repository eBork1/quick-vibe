import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public access_token: string;

  constructor(
    public router: Router,
  ) { 
    let hash = window.location.hash;
    // Lazy, revise
    this.access_token = hash.substr(14, 204);
  }

  ngOnInit() {
    
  }

  async authorizeSpotifyUser() {

    // await fetch('https://accounts.spotify.com/authorize' + new URLSearchParams({
    //   client_id: '4c028c1ba1344499b4cf174f5ce4363b',
    //   response_type: 'token',
    //   redirect_uri: 'http://localhost:8100/app/home'
    // }))
    // let url = 'https://accounts.spotify.com/authorize'
    window.location.href = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
      client_id: '4c028c1ba1344499b4cf174f5ce4363b',
      response_type: 'token',
      redirect_uri: 'http://localhost:8100/app/home',
      scope: 'playlist-modify-public playlist-modify-private'
    });
    
  }

}
