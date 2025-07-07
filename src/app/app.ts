import { Component } from '@angular/core';

import { Navbar } from './Navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'practice-app';
  location:string='select location'
}
