import { Component, inject } from '@angular/core';
import { Navbar } from '../Navbar/navbar';
import { select, Store } from '@ngrx/store';
import { LocationState } from '../store/location.model';
import { Observable } from 'rxjs';
import { setLocation } from '../store/location.actions';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [Navbar, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  constructor(private http: HttpClient, private store: Store<{ location: LocationState }>) { }


  location$!: Observable<LocationState>;
  setCity(city: string) {
    this.store.dispatch(setLocation({ city: city }));
  }

  shows: any[] = [];
  setmovies(city: string) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // returns "YYYY-MM-DD"

    this.http.get<any[]>(`http://localhost:8080/getshows/home/${city}/${formattedDate}`).subscribe(res => {
      this.shows = res;
      // console.log(this.shows);
    })
  }
  ngOnInit() {
    this.location$ = this.store.pipe(select('location'));
    this.location$.subscribe(data => {
      this.setmovies(data.city);
    })
  }
}
