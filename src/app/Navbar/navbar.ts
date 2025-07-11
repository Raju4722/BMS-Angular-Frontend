import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LocationState } from '../store/location.model';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { setLocation } from '../store/location.actions';
import { NavbarService } from '../services/navbar.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private store: Store<{ location: LocationState }>, private router: Router,private route:ActivatedRoute) { }

  location$!: Observable<LocationState>;


  setCity(city: string) {
    localStorage.setItem('location', city);
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

  boxstyles = {
    'border-bottom-width': '0.1rem',
    'border-style': 'solid',
    'border-color': '#ef4444',
    'color': '#ef4444'
  };
  Togglemoviestab: boolean = true;



  // location
  showLocationModal: boolean = false;

  ToggleLocation() {
    this.location$.pipe(take(1)).subscribe(val => {
      if (val.city !== "") {
        this.showLocationModal = !this.showLocationModal;
        if (!this.showLocationModal) {
          this.showAllCities = false;
        }
      }
    })
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
  moviestab: { [key: string]: string[] } = {};
  moviesbylocation: any[] = []
  ngOnInit(): void {
    this.location$ = this.store.pipe(select('location'));
    this.location$.subscribe(val => {
      if (val.city === "") {
        this.showLocationModal = true;
      }
      else if(val.city !== this.route.snapshot.paramMap.get('location')){
        this.setCity(this.route.snapshot.paramMap.get('location')?.toLowerCase() || val.city);
      }
    }) 
    this.navbarservice.getlocations().subscribe({
      next: (res) => {
        this.cities = res;
      }
    })
    this.navbarservice.getmoviesbylanguages().subscribe({
      next: (res) => {
        this.moviestab = res;
        console.log(this.moviestab)
      }
    })
    this.navbarservice.gettheatresbylocations().subscribe({
      next: (res) => {
        this.moviesbylocation = res;
        console.log(this.moviesbylocation);
      }
    })
  }

  navigatelocation(location: string) {
    const segments = this.router.url.split('/');
    const cityIndex = segments.findIndex(seg => seg.toLowerCase() === 'explore' || seg.toLowerCase()==='movie') + 2;
    if (cityIndex > 0 && segments.length > cityIndex) {
      segments[cityIndex] = location; // update the city part
    }
    const newUrl = segments.join('/');
    this.router.navigateByUrl(newUrl);
  }
}
