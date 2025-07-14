import { Component } from '@angular/core';
import { Navbar } from '../Navbar/navbar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-theatre-page',
  imports: [Navbar, CommonModule],
  templateUrl: './theatre-page.html',
  styleUrl: './theatre-page.css'
})
export class TheatrePageComponent {

  objectkeys=Object.keys;
  next7days: Date[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      this.next7days.push(d);
    }
  }

  movie: any = {};
  moviename: string = "";
  location: string = "";
  dateFromUrl: string = "";
  shows: { [key: string]: any[] } = {};
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.moviename = params.get('movie') || "";
      const dateStr = params.get('date');
      this.location = params.get('location') || "";
      this.dateFromUrl = dateStr
        ? moment(dateStr, 'YYYYMMDD', true).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD');


      this.http.get<any>(`http://localhost:8080/getshows/theatresview/${this.location}/${this.moviename}/${this.dateFromUrl}`).subscribe({
      next: (res) => {
        this.shows = res;
      }
    })
    });

    console.log(this.dateFromUrl)
    this.http.get<any>(`http://localhost:8080/getmovie/${this.moviename}`).subscribe({
      next: (res) => {
        console.log(res);
        this.movie = res;
      }
    })

    



  }

  changingthedate(datte: Date) {
    const segments = this.router.url.split('/');
    segments[segments.length - 1] = moment(datte).format('YYYYMMDD');
    const newurl = segments.join('/');
    this.router.navigateByUrl(newurl);
  }
  color(datte: Date) {
    const m1 = moment(datte);
    const m2 = moment(this.dateFromUrl);
    if (m1.isSame(m2, 'day')) { return 'red'; }
    return '';
  }


}
