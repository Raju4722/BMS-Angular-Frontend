import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  standalone:true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    data:string='hello';
    counter=0;
    increment(){
      this.counter++;
    }
    decrement(){
      this.counter--;
    }
}
