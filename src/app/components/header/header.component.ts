import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {}

  toLogin() {
    this.router.navigate(['/auth/login']);
  }
  
  toRegister() {
    this.router.navigate(['/auth/register']);
  }

}
