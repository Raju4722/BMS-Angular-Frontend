import { Component, inject } from '@angular/core';


import { select, Store } from '@ngrx/store';
import { LocationState } from './store/location.model';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'practice-app';
  private store = inject(Store<{ location: LocationState }>);
  location$: Observable<LocationState> = this.store.pipe(select('location'));
}
