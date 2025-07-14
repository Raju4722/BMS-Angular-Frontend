import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Navbar } from '../Navbar/navbar';

@Component({
  selector: 'app-movie-categories',
  imports: [Navbar, CommonModule],
  templateUrl: './movie-categories.html',
  styleUrl: './movie-categories.css'
})
export class MovieCategoriesComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }


  uniqmovieshows: any[] = [];
  location: string = ""
  uniqtype: string = ""
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uniqtype = params.get('uniq') || "";
      this.location = params.get('location') || "";
      if (this.router.url.includes('searchbygenre')) {
        this.http.get<any[]>(`http://localhost:8080/getshows/searchbygenre/${this.location}/${this.uniqtype}`).subscribe({
          next: (res) => {
            this.uniqmovieshows = res;
          }
        })
      }
      else if (this.router.url.includes('searchbylanguage')) {
        this.http.get<any[]>(`http://localhost:8080/getshows/searchbylanguage/${this.location}/${this.uniqtype}`).subscribe({
          next: (res) => {
            this.uniqmovieshows = res;
          }
        })
      }
      else {
        this.http.get<any[]>(`http://localhost:8080/getshows/searchbytype/${this.location}/${this.uniqtype}`).subscribe({
          next: (res) => {
            console.log(res)
            this.uniqmovieshows = res;
          }
        })
      }

    })
  }
}
