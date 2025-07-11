import { Component } from '@angular/core';
import { Navbar } from '../Navbar/navbar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moviepage',
  imports: [Navbar, CommonModule],
  standalone: true,
  templateUrl: './moviepage.component.html',
  styleUrl: './moviepage.component.css'
})
export class MoviepageComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  

  movie: any = {};
  ngOnInit() {
    const movie = this.route.snapshot.paramMap.get('movie');
    this.http.get<any>(`http://localhost:8080/getmovie/${movie}`).subscribe({
      next: (res) => {
        this.movie = res
        console.log(this.movie)
      }
    })
  }
}
