import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LocationState } from '../store/location.model';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { setLocation } from '../store/location.actions';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private store: Store<{ location: LocationState }>) { }

  location$!: Observable<LocationState>;
  setCity(city: string) {
    this.store.dispatch(setLocation({ city: city }));
  }
  // searchpage
  showSearchPage: boolean = false;
  ToggleSearch() {
    this.showSearchPage = !this.showSearchPage;
  }
  @ViewChild('focus') input!: ElementRef;
  ngAfterViewChecked() {
    if (this.input) {
      this.input.nativeElement.focus();
    }
  }

  // location
  showLocationModal: boolean = false;
  ToggleLocation() {
    this.showLocationModal = !this.showLocationModal;
    if (!this.showLocationModal) {
      this.showAllCities = false;
    }
  }
  togglecity: string = 'Show';
  showAllCities: boolean = false;
  ToggleAllCities() {
    this.showAllCities = !this.showAllCities;
    if (this.showAllCities) { this.togglecity = 'Hide' }
    else { this.togglecity = 'Show' }
  }

  private navbarservice = inject(NavbarService);
  cities: any[] = [];
  ngOnInit(): void {
    this.location$ = this.store.pipe(select('location'));
    this.location$.subscribe(loc=>{
      
    })
    this.navbarservice.getlocations().subscribe({
      next: (res) => {
        this.cities = res;
      }
    })
  }
}
